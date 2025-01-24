import { API_URL } from "@/app/lib/query";
import { Chart, LinearScale, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DashboardPanel from "./DashboardPanel";

export default function AnualGraph() {
  Chart.register(LinearScale);
  Chart.register(...registerables);

  const [annualData, setAnnualData] = useState({ labels: [], data: [] });

  useEffect(() => {
    fetch(`${API_URL}/dash/annual-sales`)
      .then((res) => {
        if (!res.ok) throw new Error(`(${res.status}) ${res.statusText}`);
        return res.json();
      })
      .then((analytics) => {
        const labels = Object.keys(analytics);
        const data = Object.values(analytics);
        setAnnualData({ labels, data });
      })
      .catch(console.error);
  }, []);

  const chartData = {
    labels: annualData.labels,
    datasets: [
      {
        label: "Total de Vendas",
        data: annualData.data,
        backgroundColor: "rgba(30, 144, 255, 0.6)",
        borderColor: "rgba(255, 215, 0, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(0, 0, 0, 1)",
        },
      },

      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "rgba(0, 0, 0, 1)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        callbacks: {
          label: (tooltipItem) => `R$ ${price(tooltipItem.raw)}`,
        },
      },
    },

    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "rgba(0, 0, 0, 0.5)" },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Vendas (R$)",
          color: "rgba(0, 0, 0, 1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  };

  return (
    <DashboardPanel title="Relatório Anual">
      <Bar data={chartData} options={chartOptions} />
    </DashboardPanel>
  );
}
