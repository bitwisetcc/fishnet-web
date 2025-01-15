import {
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { price } from "@/app/lib/format";

export default function ProductLine({ product, setId }) {
  return (
    <tr className="group rounded-lg p-2 transition-colors duration-500 hover:bg-slate-50">
      <td className="avatar rounded-l-xl">
        <div className="w-16 rounded-xl">
          <Image
            src={product.pictures[0]}
            width={100}
            height={100}
            alt={product.name}
          />
        </div>
      </td>

      <td className="truncate text-nowrap">
        <span>{product.name}</span>
        <br />
        <span className="text-sm text-gray-500">{product.id}</span>
      </td>

      <td className="font-semibold">{price(product.price)}</td>

      <td className="text-nowrap">{product.quantity}</td>

      <td className="gap-2">
        <button className="" onClick={() => setId(product.id)}>
          <ArrowTopRightOnSquareIcon className="size-5 cursor-pointer text-slate-800 transition-colors duration-200 hover:text-yellow-light" />
        </button>
        <button className="transition-colors duration-200 hover:text-yellow-light">
          <PencilSquareIcon className="size-5" />
        </button>
      </td>

      <td>
        <input
          type="checkbox"
          name="lock"
          id="ch-lock"
          className="toggle checked:toggle-error"
        />
      </td>
    </tr>
  );
}
