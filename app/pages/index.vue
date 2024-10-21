<script setup lang="ts">
import { useFetchPopulations } from '~/composables/population';

const population = ref();
const { prefectures, status } = useFetchPrefectures();
const getPopulation = (prefCode: number, prefName: string) => {
  const { populations, status } = useFetchPopulations(prefCode);
  watch(status, (newStatus) => {
    population.value = [prefName, populations.value?.result?.data[0]];
    console.log('population', populations.value?.result.data[0].data, 'status', status);
  });
}
</script>

<template>
  <h1>都道府県を選択</h1>
  <p v-if="status === 'pending' || status === 'idle'">now loading...</p>
  <ul v-else-if="prefectures && prefectures.result">
    <li v-for="prefecture in prefectures.result" :key="prefecture.prefCode">
      <label>
      <input type="radio" name="prefecture" :value="prefecture.prefCode" @click="getPopulation(prefecture.prefCode, prefecture.prefName)"/>
      {{ prefecture.prefName }}
      </label>
    </li>
  </ul>
  <p>{{ population }}</p>
</template>