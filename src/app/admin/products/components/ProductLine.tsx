import {
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ProductLine({ product }) {
  return (
    <li className="col-span-7 my-2 grid grid-cols-subgrid items-center rounded-lg p-2 transition-colors duration-200 hover:bg-slate-50">
      <div className="avatar">
        <div className="w-20 rounded-xl">
          <Image
            src={product.pictures[0]}
            width={100}
            height={100}
            alt={product.name}
          />
        </div>
      </div>

      <div className="flex flex-col items-start truncate text-nowrap gap-1">
        <span>{product.name}</span>
        <span className="text-sm text-gray-500">{product.id}</span>
      </div>
      
      <span className="flex items-center justify-center font-semibold">
        R${product.price.toFixed(2)}
      </span>
      <span className="flex items-center justify-center text-nowrap">
        {product.quantity}
      </span>
      <button
        className="flex items-center justify-center"
        onClick={(e) => {
          setInsightsId(product.id);
          setInsightsDialog(true);
        }}
      >
        <ArrowTopRightOnSquareIcon className="size-5 cursor-pointer text-slate-800 transition-colors duration-200 hover:text-yellow-light" />
      </button>
      <span className="flex items-center justify-center gap-2">
        <button className="transition-colors duration-200 hover:text-yellow-light">
          <LockClosedIcon className="size-5" />
        </button>
        <button className="transition-colors duration-200 hover:text-yellow-light">
          <PencilSquareIcon className="size-5" />
        </button>
      </span>
      <span className="flex items-center justify-center">
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" />
          <div className="peer h-6 w-10 rounded-full bg-gray-200 transition duration-200 peer-checked:bg-green-600"></div>
          <span className="absolute h-4 w-4 rounded-full bg-white shadow transition duration-200 peer-checked:translate-x-5 peer-checked:shadow-lg"></span>
        </label>
      </span>
    </li>
  );
}
