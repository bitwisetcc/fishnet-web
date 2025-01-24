import { API_URL } from "@/app/lib/query";
import { useEffect, useState } from "react";
import DashboardPanel from "./DashboardPanel";
import { ArrowTopRightOnSquareIcon as LinkIcon } from "@heroicons/react/24/outline";

export default function QuickAccess() {
  const [relatorio, setRelatorio] = useState({
    total_vendas: 0,
    aumento_em_porcentagem: 0,
    clientes_atingidos: 0,
    total_compras_realizadas: 0,
  });

  useEffect(() => {
    fetch(`${API_URL}/dash/order`)
      .then((res) => {
        if (!res.ok) throw new Error(`(${res.status}) ${res.statusText}`);
        return res.json();
      })
      .then(setRelatorio)
      .catch(console.error);
  }, []);

  return (
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
