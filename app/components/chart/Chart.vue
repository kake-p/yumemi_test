<script setup lang="ts">
import type { ChartProps } from '~/types/view';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{ data: ChartProps }>();

const colors = [
  '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043', '#26A69A', '#FFCA28', '#5C6BC0', '#EC407A', '#8D6E63'
];

const chartData = computed(() => {
  const labels = props.data[0]?.population.map((data) => data.year) || [];
  const datasets = props.data.map((pref, index) => ({
    label: pref.prefecture,
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
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