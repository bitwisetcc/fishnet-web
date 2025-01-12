"use client";

import { price } from "@/app/lib/format";
import { API_URL } from "@/app/lib/query";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon as LinkIcon } from "@heroicons/react/24/solid";
import { Chart, LinearScale, registerables } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { TitleContext } from "@/app/lib/stores";
import Link from "next/link";

export default function Dashboard() {
  const setTitle = useContext(TitleContext);

  Chart.register(LinearScale);
  Chart.register(...registerables);

  const [relatorio, setRelatorio] = useState({
    total_vendas: 0,
    aumento_em_porcentagem: 0,
    clientes_atingidos: 0,
    total_compras_realizadas: 0,
  });

  const [topSales, setTopSales] = useState([]);
  const [timeFilter, setTimeFilter] = useState("Mês");
  const [annualData, setAnnualData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const [minDate, maxDate] = parseDatePerspective(timeFilter);

    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${url}:`, error);
      }
    };

    fetchData(`${API_URL}/dash/order`, setRelatorio);

    fetch(
      `${API_URL}/sales/filter?count=3&ordering=-total&min_date=${minDate.getTime()}&max_date=${maxDate.getTime()}`,
    )
      .then((res) => res.json())
      .then((data) => setTopSales(data.match))
      .catch(console.error);

    fetch(`${API_URL}/dash/annual-sales`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const labels = Object.keys(data);
        const salesData = Object.values(data);
        setAnnualData({ labels, data: salesData });
      })
      .catch((error) => console.error("Erro ao buscar dados anuais:", error));
  }, [timeFilter]);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

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
    <div className="p-5">
      <section className="mb-5 grid gap-4 md:grid-cols-3">
        <DashboardPanel
          title="Relatório Mensal"
          content={`R$ ${relatorio.total_vendas}`}
          description={`Variação de ${relatorio.aumento_em_porcentagem.toFixed(
            2,
          )}% em relação ao último mês`}
        />
        <DashboardPanel title="Clientes Atingidos">
          <ClientStats
            count={relatorio.clientes_atingidos}
            label="Clientes Atingidos"
          />
          <ClientStats
            count={relatorio.total_compras_realizadas}
            label="Total de Compras"
          />
        </DashboardPanel>
        <DashboardPanel title="Atalhos">
          <Shortcut
            label="Backup de Dados"
            download={`http://${API_URL}/dash/backup`}
            fileName="backup.bson"
          />
          <Shortcut
            label="Exportar dados"
            download={`http://${API_URL}/dash/export`}
            fileName="relatório_vendas.pdf"
          />
        </DashboardPanel>
      </section>
      <section className="my-9">
        <header className="mb-3 flex justify-between">
          <h2 className="text-lg">Melhores vendas</h2>
          <FilterDropdown
            selectedFilter={timeFilter}
            onFilterChange={setTimeFilter}
            filters={[
              "Hoje",
              "Ontem",
              "Semana",
              "Mês",
              "Mês passado",
              "Este ano",
              "Ano passado",
            ]}
          />
        </header>
        <TopOrders
          clients={topSales}
          avatarApi="https://api.dicebear.com/9.x/adventurer/svg?seed=$flip=true&radius=50&earringsProbability=25&glassesProbability=25&backgroundColor=d1d4f9,b6e3f4,c0aede,ffd5dc"
          statusMessages={["Pendente", "Finalizado", "Cancelado"]}
        />
      </section>
      <section>
        <DashboardPanel title="Relatório Anual">
          <Bar data={chartData} options={chartOptions} />
        </DashboardPanel>
      </section>
      <section>
        <br></br>
      </section>
    </div>
  );
}

function DashboardPanel({ title, content, description, children }) {
  return (
    <div className="dashboard-panel rounded-lg bg-slate-100 p-4 shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {content && <span className="text-2xl md:text-3xl">{content}</span>}
      {description && <p className="text-sm">{description}</p>}
      {children}
    </div>
  );
}

function ClientStats({ count, label }) {
  return (
    <p className="mb-2 flex items-center justify-between text-sm">
      <span className="text-lg md:text-3xl">{count}</span> {label}
    </p>
  );
}

function Shortcut({ label, download, fileName }) {
  return (
    <a
      className="mb-5 flex items-center justify-between text-lg"
      href={download}
      download={fileName}
    >
      {label}
      <LinkIcon className="inline size-4 cursor-pointer text-black transition-colors duration-300 hover:text-yellow-light" />
    </a>
  );
}

function FilterDropdown({ selectedFilter, onFilterChange, filters }) {
  return (
    <button className="group relative rounded-lg border border-slate-100 bg-slate-200 p-1 px-3 shadow-sm">
      Filtrar por: {selectedFilter}
      <div className="panel right-0 top-10 px-10 text-left">
        <ul className="flex flex-col gap-1">
          {filters.map((filter) => (
            <li
              key={filter}
              className="cursor-pointer hover:text-slate-800"
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

function TopOrders({ clients: orders, avatarApi, statusMessages }) {
  return (
    <ul className="grid gap-4">
      {orders.map((order) => (
        <li
          className="col-span-7 grid flex-1 grid-cols-subgrid content-center items-center gap-x-3 rounded-lg border border-slate-400 bg-branco-perolado px-4 py-2 pr-8 shadow"
          key={order._id}
        >
          <img
            src={avatarApi.replace("$", order.customer.name)}
            alt={`Avatar de ${order.customer.name}`}
            className="mr-5 h-14 w-14 rounded-full border border-slate-100"
          />
          <span>{order.customer.email}</span>
          <span>{order.customer.name}</span>
          <span>{price(order.total)}</span>
          <span>{new Date(order.date).toLocaleDateString("pt-BR")}</span>
          <span className={`badge badge-lg ${["badge-info", "badge-success", "badge-error"][order.status]}`}>{statusMessages[order.status]}</span>
          <span className="justify-self-end">
            <Link href="/vendas">
              <ArrowTopRightOnSquareIcon className="size-6 text-black hover:text-yellow-light" />
            </Link>
          </span>
        </li>
      ))}
    </ul>
  );
}

function parseDatePerspective(timeString) {
  let minDate = new Date(0); // December 31, 1969
  let maxDate = new Date(); // Right now
  let temp = new Date();

  switch (timeString) {
    case "Hoje": {
      temp.setHours(0, 0, 0, 0);
      minDate = temp;
      break;
    }
    case "Ontem": {
      temp.setHours(0, 0, 0, 0);
      maxDate = temp;
      temp.setDate(temp.getDate() - 1);
      minDate = temp;
      break;
    }
    case "Semana": {
      temp.setDate(temp.getDate() - 7);
      minDate = temp;
      break;
    }
    case "Mês": {
      temp.setMonth(temp.getMonth() - 1);
      minDate = temp;
      break;
    }
    case "Mês Passado": {
      temp.setHours(0, 0, 0, 0);
      temp.setDate(1);
      maxDate = temp;
      temp.setMonth(temp.getMonth() - 1);
      minDate = temp;
      break;
    }
    case "Ano": {
      minDate = new Date(temp.getFullYear(), 0, 0);
      break;
    }
    case "Ano passado": {
      minDate = new Date(temp.getFullYear() - 1, 0, 0);
      maxDate = new Date(temp.getFullYear(), 0, 0);
      break;
    }
    default: {
      break;
    }
  }

  return [minDate, maxDate];
}
