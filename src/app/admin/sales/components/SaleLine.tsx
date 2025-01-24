import { price } from "@/app/lib/format";
import { Dispatch, SetStateAction } from "react";
import { Sale } from "../lib";

interface SaleLineProps {
  sale: Sale;
  setId: Dispatch<SetStateAction<string>>;
}

export default function SaleLine({ sale, setId }: SaleLineProps) {
  let statusLabel = ["Em rumo", "Finalizado", "Cancelado"][sale.status];
  let dateObj = new Date(Date.parse(sale.date));
  let formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

  return (
    <tr className="rounded-lg p-2 transition-colors duration-500 hover:bg-slate-50">
      <td>
        <span>{sale.customer.name}</span>
        <br />
        <span className="text-sm text-gray-500">{sale.customer.email}</span>
      </td>

      <td>
        <span>{price(sale.shipping)}</span>
        <br />
        <span className="text-sm text-gray-500">{sale.shippingProvider}</span>
      </td>

      <td>{price(sale.total)}</td>

      <td>
        <span className="badge badge-outline">{sale.paymentMethod}</span>
      </td>

      <td>
        <span
          className={`badge ${["badge-info", "badge-success", "badge-error"][sale.status]}`}
        >
          {statusLabel}
        </span>
      </td>

      <td>{formattedDate}</td>

      <td>
        <button>...</button>
      </td>
    </tr>
  );
}
