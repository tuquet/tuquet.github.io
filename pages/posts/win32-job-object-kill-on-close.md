---
title: Win32 Job Object Kill-On-Job-Close for Child Process Containment
date: 2026-09-28T10:00:00Z
lang: en
duration: 1min
type: note
---

Calling `child.kill()` in standard library runtimes only terminates the direct root process. Any child processes spawned by Chromium or external tools silently detach into orphan background zombies.

Assigning the parent process to a Win32 **Job Object** with `JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE` forces the Windows kernel to terminate the entire process tree automatically as soon as the supervisor's handle closes—even across hard crashes, panics, or sudden power termination.
