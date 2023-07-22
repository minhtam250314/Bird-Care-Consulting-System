import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart  as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function GigaChart({chartData, chartOptions}){
    return <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />;
}