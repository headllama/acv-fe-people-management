import { Doughnut } from 'react-chartjs-2'

interface DoughnutChartProps {
  numberOfEmployeers: number
  numberOfInactiveEmployeers: number
}

export function DoughnutChart({
  numberOfEmployeers,
  numberOfInactiveEmployeers,
}: DoughnutChartProps) {
  const data = {
    labels: ['Inativos', 'Ativos'],
    datasets: [
      {
        data: [numberOfInactiveEmployeers, numberOfEmployeers],
        color: ['red', 'green'],
        backgroundColor: ['#E53E3E', '#38A169'],
        hoverOffset: 4,
      },
    ],
  }

  return <Doughnut data={data} />
}
