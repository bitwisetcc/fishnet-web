import { price } from "@/app/lib/format";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SaleCard({ sale, status }) {
  return (
    <li
      className="col-span-7 grid flex-1 grid-cols-subgrid content-center items-center gap-x-3 rounded-lg border border-slate-400 bg-branco-perolado px-4 py-2 pr-8 shadow"
      key={sale._id}
    >
      <div className="avatar mr-5">
        <div className="flex aspect-square w-14 rounded-full border border-slate-300">
          {sale.customer.picture ? (
            <img
              src={sale.customer.picture}
              alt={`Avatar de ${sale.customer.name}`}
            />
          ) : (
            <span className="ml-[19px] mt-2 block font-mono text-3xl">
              {sale.customer.name[0]}
            </span>
          )}
        </div>
      </div>
      <span>{sale.customer.email}</span>
      <span>{sale.customer.name}</span>
      <span>{price(sale.total)}</span>
      <span>{new Date(sale.date).toLocaleDateString("pt-BR")}</span>
      <span
        className={`badge badge-lg ${["badge-info", "badge-success", "badge-error"][sale.status]}`}
      >
        {status}
      </span>
      <span className="justify-self-end">
        <Link href="/vendas">
          <ArrowTopRightOnSquareIcon className="size-6 text-black hover:text-yellow-light" />
        </Link>
      </span>
    </li>
  );
}