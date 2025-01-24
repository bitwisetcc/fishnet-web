import { API_URL } from "@/app/lib/query";

import { useEffect, useState } from "react";
import SaleCard from "./SaleCard";

export default function TopSales() {
  const [sales, setSales] = useState([]);
  const [timeFilter, setTimeFilter] = useState("Mês");

  useEffect(() => {
    const [minDate, maxDate] = parseDatePerspective(timeFilter);

    const filterParams = new URLSearchParams({
      count: 3,
      ordering: "-total",
      min_date: minDate.getTime(),
      max_date: maxDate.getTime(),
    });

    fetch(`${API_URL}/sales/filter?${filterParams.toString()}`)
      .then((res) => res.json())
      .then((data) => setSales(data.match))
      .catch(console.error);
  }, [timeFilter]);

  const statusMessages = ["Pendente", "Finalizado", "Cancelado"];

  return (
    <section className="my-9">
      <header className="mb-3 flex justify-between">
        <h2 className="text-lg">Melhores vendas</h2>
        <div className="h-max rounded-lg border border-slate-100 bg-slate-200 p-1 px-3 shadow-sm">
          <span>Filtrar por:</span>
          <select
            name="timeFilter"
            id="slTimeFilter"
            className="ml-2 bg-transparent"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>Hoje</option>
            <option>Ontem</option>
            <option>Semana</option>
            <option>Mês</option>
            <option>Mês passado</option>
            <option>Este ano</option>
            <option>Ano passado</option>
          </select>
        </div>
      </header>
      <ul className="grid gap-4">
        {sales.map((sale, i) => (
          <SaleCard sale={sale} key={i} status={statusMessages[sale.status]} />
        ))}
      </ul>
    </section>
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
