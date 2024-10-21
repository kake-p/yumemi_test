<script setup lang="ts">
import { useFetchPopulations } from '~/composables/population';
import type { PopuLavels, Population } from '~/types/population';

const selectedPrefecture = ref<string>('');
const populationValue = ref<PopuLavels>();
const populationList = ref<Population>();
const populationTypes = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
const activePopulationTypeIndex = ref<number>(0);

const { prefectures, status } = useFetchPrefectures();

const onSetPopulationType = (index: number) => {
  activePopulationTypeIndex.value = index;
  populationValue.value = populationList.value?.data[activePopulationTypeIndex.value];
  // console.log('activePopulationType', activePopulationTypeIndex.value);
}

const getPopulation = async (prefCode: number, prefName: string) => {
  selectedPrefecture.value = prefName;
  const populations = await useFetchPopulations(prefCode);
  populationValue.value = populations.result.data[activePopulationTypeIndex.value];
  // console.log('population', populations.result.data[activePopulationTypeIndex.value].data);
  populationList.value = populations.result;
  // console.log('populationList', populationList.value);
}
</script>

<template>
  <h1>都道府県を選択</h1>
  <p v-if="status === 'pending' || status === 'idle'">loading prefectures...</p>
  <ul v-else-if="prefectures && prefectures.result">
    <li v-for="prefecture in prefectures.result" :key="prefecture.prefCode">
      <label>
      <input type="radio" name="prefecture" :value="prefecture.prefCode" @click="getPopulation(prefecture.prefCode, prefecture.prefName)"/>
      {{ prefecture.prefName }}
      </label>
    </li>
  </ul>
  <div v-for="(populationType, index) in populationTypes" :key="index">
    <button @click="onSetPopulationType(index)">{{ populationType }}</button>
  </div> 
  <p>{{ selectedPrefecture }}</p> 
  <p>{{ populationValue }}</p>
</template>