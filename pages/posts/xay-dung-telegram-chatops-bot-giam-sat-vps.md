---
title: 'Xây dựng Telegram ChatOps Bot & Giám sát hạ tầng VPS tự động hóa với Node.js và GrammY'
date: 2026-10-03T12:30:00Z
lang: vi
duration: 6min
type: blog
description: 'Hành trình kiến tạo trợ lý DevOps cá nhân @FlowupAI_bot: Điều khiển CI/CD GitHub Actions, giám sát tài nguyên VPS và tự động hóa thông báo Release thời gian thực qua Telegram.'
---

Đối với một kỹ sư phần mềm hay Tech Lead quản trị nhiều dự án song song, việc liên tục phải mở laptop, bật Terminal gõ lệnh SSH vào máy chủ hoặc truy cập GitHub web để kiểm tra trạng thái CI/CD là một tác vụ gây phân mảnh sự tập trung.

Tại sao không biến ứng dụng nhắn tin quen thuộc trên chiếc điện thoại trong túi quần thành một **Control Room** di động?

Trong bài viết này, tôi muốn chia sẻ kiến trúc và kinh nghiệm thực chiến khi xây dựng **Flowup Bot** (`@FlowupAI_bot`) — trợ lý ChatOps chạy ngầm 24/7 trên Linux VPS, tích hợp liền mạch với GitHub Actions và hệ thống phân phối Release tự động.

---

## 1. Kiến trúc tổng thể: Lightweight & Zero-Open-Port

Thay vì dựng một web service nặng nề phải mở cổng mạng công khai (cần public IP, SSL cert và Reverse Proxy), chúng tôi lựa chọn kiến trúc hướng sự kiện tinh gọn:

```text
[Telegram Client] (iOS / Android / Desktop)
       │
       ▼ (Telegram Bot API - HTTPS Long Polling)
┌────────────────────────────────────────────────────────┐
│  Flowup Bot Daemon (Node.js + GrammY)                  │
│                                                        │
│  ├── 🛡️ Whitelist & RBAC Middleware                    │
│  ├── 💻 System Monitor (CPU, RAM, Disk, SSL)          │
│  ├── 🐙 GitHub Service (gh CLI Actions Dispatch)       │
│  ├── 📡 Releases Syndication (RSS / Netlify API)       │
│  └── ⏰ Multi-Repo CI Background Watcher               │
└────────────────────────────────────────────────────────┘
       │                                     │
       ▼                                     ▼
[Host Linux VPS / systemd]          [GitHub Ecosystem (10+ Repos)]
```

### Tại sao chọn GrammY?
* **Type-safe & Middleware-first:** Kiến trúc pipeline tương tự Koa/Express, cực kỳ dễ viết các lớp kiểm duyệt bảo mật.
* **Long Polling ổn định:** Bot chủ động kéo cập nhật (pull) từ máy chủ Telegram qua HTTPS outbound. Máy chủ VPS có thể nằm sau NAT, Firewall nghiêm ngặt mà không cần mở bất kỳ inbound port nào.
* **Tài nguyên siêu nhẹ:** Daemon chỉ tiêu thụ xấp xỉ **25MB RAM**, hoàn hảo để chạy nền mà không ảnh hưởng tới các tiến trình chính của máy chủ.

---

## 2. Bảo mật đa tầng & Phân quyền Admin (RBAC)

Bot nằm trong nhóm chat trao đổi kỹ thuật, do đó bảo mật là ưu tiên hàng đầu:

1. **Whitelist Chat ID:** Bất kỳ tin nhắn hoặc sự kiện nào đến từ chat ID không nằm trong danh sách trắng (`ALLOWED_CHAT_IDS`) đều bị âm thầm từ chối (drop) và ghi log kiểm toán.
2. **Admin-Only Commands:** Các lệnh có khả năng can thiệp hệ thống như `/deploy`, `/server`, `/services` được bọc qua middleware xác thực User ID của Admin (`ADMIN_USER_IDS`). Các thành viên thông thường chỉ có thể tra cứu thông tin công khai (`/ci`, `/releases`, `/site`, `/repos`).
3. **Tự thích ứng Supergroup (`migrate_to_chat_id`):** Khi một nhóm Telegram được chuyển đổi thành Supergroup, ID nhóm sẽ tự động thay đổi tiền tố. Bot lắng nghe sự kiện di trú này để cập nhật danh sách cấp quyền trong bộ nhớ runtime mà không làm gián đoạn liên lạc.

---

## 3. Điều khiển CI/CD & Giám sát Multi-Repo

Thay vì phải tạo Webhook riêng lẻ trên hàng chục kho mã nguồn, bot tận dụng sức mạnh của **GitHub CLI (`gh`)** đã được xác thực trên máy chủ:

* **Điều khiển linh hoạt:**
  * `/ci` — Kiểm tra nhanh trạng thái build của website chính.
  * `/ci all` — Quét song song và tổng hợp bảng trạng thái CI của toàn bộ 10+ repository trong hệ sinh thái (`tuquet.github.io`, `releases`, `cloud`, `runner`, `lib`, `cli`, v.v.).
  * `/ci <repo>` — Tra cứu chi tiết một repo cụ thể.
* **Trích xuất thông minh lỗi build (`/logs`):** Khi một workflow bị thất bại, bot tự động kéo 35 dòng log lỗi gần nhất (`gh run view --log-failed`) và định dạng vào thẻ `<pre>` để người quản trị đọc được nguyên nhân ngay trên màn hình điện thoại mà không cần mở trình duyệt.
* **Tránh gây hiểu nhầm lịch sử:** Nếu lần build mới nhất đã Xanh (Thành công), bot ghi chú rõ ràng rằng lỗi hiển thị bên dưới chỉ là log tham khảo của lần chạy cũ trước đó đã được khắc phục hoàn tất.

---

## 4. Tự động hóa thông báo Release qua RSS Feed

Một trong những tính năng thú vị nhất là kết nối với cổng [Releases Portal](https://tuquet.netlify.app/) và nguồn cấp dữ liệu `feed.xml`:

```text
[GitHub Release on any Repo]
            │
            ▼ (Netlify Serverless Discovery)
[tuquet.netlify.app/api/releases] (feed.xml)
            │
            ▼ (Background Poll 5min/time)
    [Flowup Bot Daemon]
            │
            ▼ (Broadcast Notification)
[Telegram Group: "Bot Notification"]
"🎉 PHÁT HÀNH MỚI: tuquet/flowup-bot v1.0.0"
```

Cứ mỗi 5 phút, daemon chạy ngầm đối chiếu bản phát hành mới nhất với tệp trạng thái `data/last_release.json`. Khi có package hoặc công cụ mới được release, thông báo định dạng đẹp kèm link phát hành sẽ được tự động bắn thẳng vào nhóm Telegram.

---

## 5. Kết luận

Một hệ thống DevOps hiệu quả không nhất thiết phải cồng kềnh hay đắt đỏ. Chỉ với Node.js, GrammY và một daemon systemd được cấu trúc chỉn chu, chúng ta đã có một **trợ lý trực ban 24/7**, giúp việc giám sát hạ tầng và điều phối phần mềm trở nên nhẹ nhàng, tức thì và đầy tin cậy.
