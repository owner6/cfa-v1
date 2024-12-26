<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps<{
  priceHistory: number[];
}>();

const chartData = computed(() => ({
  labels: Array.from({ length: props.priceHistory.length }, (_, i) => i.toString()),
  datasets: [
    {
      label: 'Price',
      borderColor: '#42b883',
      data: props.priceHistory,
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" style="height: 400px" />
  </div>
</template>

<style scoped>
.chart-container {
  margin: 20px 0;
  height: 400px;
}
</style>