<template>
  <div>
    <Header/>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/base/Header.vue'
</script>
