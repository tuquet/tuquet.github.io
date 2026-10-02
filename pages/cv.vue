<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.replace('/en/cv')
})
</script>

<template>
  <div class="prose m-auto text-center py-20">
    <p>
      Redirecting to <RouterLink to="/en/cv" class="font-semibold underline">/en/cv</RouterLink>...
    </p>
  </div>
</template>
