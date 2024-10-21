<script setup lang="ts">
const { prefectures, status } = useFetchPrefectures();
</script>

<template>
  <h1>都道府県を選択</h1>
  <p v-if="status === 'pending' || status === 'idle'">now loading...</p>
  <ul v-else-if="prefectures && prefectures.result">
    <li v-for="prefecture in prefectures.result" :key="prefecture.prefCode">
      <label>
      <input type="radio" name="prefecture" :value="prefecture.prefCode" />
      {{ prefecture.prefName }}
      </label>
    </li>
  </ul>
</template>