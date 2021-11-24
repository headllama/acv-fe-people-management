import { Doughnut } from 'react-chartjs-2'

const data = {
  labels: ['Inativos', 'Ativos'],
  datasets: [
    {
      data: [20, 180],
      color: ['red', 'green'],
      backgroundColor: ['#E53E3E', '#38A169'],
      hoverOffset: 4,
    },
  ],
}

export function DoughnutChart() {
  return <Doughnut data={data} />
}
