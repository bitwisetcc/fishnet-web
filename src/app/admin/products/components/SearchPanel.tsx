import {
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";

interface SearchPanelProps {
  search: string;
  callback: ChangeEventHandler<HTMLInputElement>;
}

// TODO URGENT: add throttling
export default function SearchPanel({ search, callback }: SearchPanelProps) {
  return (
    <header className="relative mb-3 rounded-lg bg-white bg-opacity-85 p-5 shadow-sm">
      <div className={`${open ? "block" : "block"} `}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <span className="relative mb-2 flex flex-1 items-center gap-1 rounded-lg border p-2 text-slate-600 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Produto ou ID"
              maxLength={100}
              value={search}
              onChange={callback}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          <div className="flex gap-2">
            <label
              htmlFor="filter-sidebar"
              className="drawer-button flex cursor-pointer gap-2"
            >
              <FunnelIcon className="size-6" />
              Filtros
            </label>

            <button className="action" onClick={() => true}>
              <PlusCircleIcon className="size-5" />
              <span className="hidden md:inline">Adicionar</span>
            </button>

            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
