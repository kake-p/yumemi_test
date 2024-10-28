<script setup lang="ts">
import Chart from '~/components/chart/Chart.vue'
import { useFetchPopulations } from '~/composables/population';
import type { SelectedPref, ChartProps, PopuList } from '~/types/view';

const checked = ref<boolean[]>([]);
const selectedPrefecture = ref<SelectedPref>({});
const chartCache = ref<ChartProps>([]);
const populationList = ref<PopuList>({});
const populationTypes = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
const activePopulationTypeIndex = ref<number>(0);

const { prefectures, status } = useFetchPrefectures();

const onSetPopulationType = (index: number) => {
  activePopulationTypeIndex.value = index;
}
const getPopulation = async (prefCode: number, prefName: string) => {
  if (!selectedPrefecture.value[prefCode]) {
    selectedPrefecture.value[prefCode] = { prefName: prefName, isChecked: true };
    console.log(selectedPrefecture.value[prefCode], selectedPrefecture.value[prefCode].isChecked)
    const populations = await useFetchPopulations(prefCode);
    populationList.value[prefCode] = populations.result;
  } else {
    console.log(selectedPrefecture.value[prefCode].isChecked)
    selectedPrefecture.value[prefCode].isChecked = !selectedPrefecture.value[prefCode].isChecked;
    console.log('switched')
  }
};
const submitProps = () => {
  chartCache.value = Object.keys(selectedPrefecture.value)
    .filter(prefCode => selectedPrefecture.value[Number(prefCode)].isChecked)
    .map(prefCode => ({
      prefecture: selectedPrefecture.value[Number(prefCode)].prefName,
      population: populationList.value[Number(prefCode)].data[activePopulationTypeIndex.value].data
    }));
};
onMounted(async() => {
  checked.value[13] = true;
  await getPopulation(13, '東京都');
  submitProps();
})
</script>

<template>
  <h2 class="title">人口区分を選択</h2>
  <ul id="typeList">
    <li v-for="(populationType, index) in populationTypes" :key="index">
      <label>
        <input type="radio" :value="index" v-model="activePopulationTypeIndex" @click="onSetPopulationType(index)"/>
        {{ populationType }}
      </label>
    </li>
  </ul>

  <h2 class="title">都道府県を選択</h2>
  <p v-if="status === 'pending' || status === 'idle'">loading prefectures...</p>
  <ul v-else-if="prefectures && prefectures.result" id="prefList">
    <li v-for="prefecture in prefectures.result" :key="prefecture.prefCode">
      <label>
      <input type="checkbox" :value="prefecture.prefCode" v-model="checked[prefecture.prefCode]" @change="getPopulation(prefecture.prefCode, prefecture.prefName)"/>
      {{ prefecture.prefName }}
      </label>
    </li>
  </ul>

  <div id="buttonWrap">
    <button id="submitButton" @click="submitProps">決定</button>
  </div>

  <Chart :data="chartCache"/>
</template>

<style scoped>
.title{
  margin-top: 40px;
}
  #typeList{
    display: flex;
    gap: 10px;
  }
#prefList{
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
  #prefList li{
    width: 100px;
}
  #buttonWrap{
    margin: 10px 0 40px;
    display: flex;
    justify-content: end;
    padding-right: 50px;
  }
  #submitButton{
    all: unset;
    color: #333;
    padding: 4px 30px;
    background-color: #fcfcfc;
    border: 1px solid #ccc;
    border-radius: 30px;
    cursor: pointer;
  }
  #submitButton:hover{
    box-shadow: 0 1px 2px #ccc;
  }
  #submitButton:active{
    transform: translateY(2px);
  }
</style>