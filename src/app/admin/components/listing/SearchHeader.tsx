import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, ReactNode } from "react";

interface SearchPanelProps {
  search: string;
  tip?: string;
  callback: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

export default function SearchHeader({
  search,
  tip,
  callback,
  children,
}: SearchPanelProps) {
  return (
    <header className="mb-4 grid grid-cols-3 gap-2 rounded-xl border border-slate-400 bg-base-200 p-4 shadow md:flex">
      <label className="input input-bordered input-ghost col-span-3 flex flex-1 items-center gap-2 transition-colors duration-300">
        <MagnifyingGlassIcon className="size-5" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder={tip}
          maxLength={100}
          value={search}
          onChange={callback}
          className="w-full grow placeholder:text-slate-500"
        />
      </label>

      <label
        htmlFor="sidebar-toggle"
        className="btn btn-outline drawer-button btn-sm md:btn-ghost md:btn-md"
      >
        <FunnelIcon className="size-5" />
        <span className="hidden md:inline">Filtros</span>
      </label>

      {children}
    </header>
  );
}
