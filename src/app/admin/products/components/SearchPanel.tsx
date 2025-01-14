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

export default function SearchPanel({ search, callback }: SearchPanelProps) {
  return (
    <header className="mb-4 rounded-xl border border-slate-400 bg-base-200 p-4 shadow flex gap-2">
      <label className="input input-bordered input-ghost flex items-center gap-2 transition-colors duration-300 flex-1">
        <MagnifyingGlassIcon className="size-5" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Título do produto"
          maxLength={100}
          value={search}
          onChange={callback}
          className="w-full grow placeholder:text-slate-500"
        />
      </label>

      <label htmlFor="sidebar-toggle" className="btn btn-ghost drawer-button">
        <FunnelIcon className="size-5" />
        Filtros
      </label>

      <button className="btn btn-secondary">
        <PlusCircleIcon className="size-5" />
        <span className="hidden md:inline">Adicionar</span>
      </button>

      <button className="btn btn-secondary">
        <PrinterIcon className="size-5" />
        <span className="hidden md:inline">Imprimir</span>
      </button>
    </header>
  );
}
