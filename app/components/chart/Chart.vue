<script setup lang="ts">
import type { ChartProps } from '~/types/view';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<ChartProps>();

const chartData = computed(() => {
  const labels = props[0]?.population.map((data) => data.year) || [];
  const datasets = props.map((pref) => ({
    label: pref.prefecture,
    backgroundColor: '#42A5F5',
    borderColor: '#1E88E5',
    data: pref.population.map((data) => data.value),
  }));

  return {
    labels,
    datasets,
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      ticks: {
        callback: (value: number|string, index: number) => `${chartData.value.labels[index]}年`,
      },
    },
    y: {
      ticks: {
        callback: (value: number|string) => `${value}人`,
      },
    },
  },
};
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>