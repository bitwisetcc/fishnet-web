import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/app/lib/query";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function InsightsModal({ id }) {
  const [insights, setInsights] = useState({ total_sold: 0 });
  const dialogRef = useRef(null);

  useEffect(() => {
    if (id !== null) {
      dialogRef.current.showModal();
      fetch(`${API_URL}/prods/getotal?product_id=${id}`)
        .then((res) => res.json())
        .then(setInsights)
        .catch(console.error);
    }
  }, [id]);

  return (
    <dialog ref={dialogRef} className="modal" id="md-insights">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            <XMarkIcon className="size-5 text-slate-800" />
          </button>
        </form>

        <header>
          <h3 className="font-bold">Insights de Produto</h3>
          <p className="mt-1 font-mono text-sm italic">{id}</p>
        </header>

        <hr className="my-3" />

        <article>
          <p>Total de vendas: {insights.total_sold}</p>
        </article>
      </div>
    </dialog>
  );
}
