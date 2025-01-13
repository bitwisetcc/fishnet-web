"use client";

import { SideBarContext } from "@/app/lib/stores";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

interface ProductFilters {
  environment: "fresh" | "salt";
  feeding: "herbivore" | "omnivore" | "carnivore";
  behaviour: "pacific" | "aggressive" | "cluster";
  minPrice: number;
  maxPrice: number;
}

export default function ProductsSideBar() {
  let [filters, setFilters]: [
    ProductFilters,
    Dispatch<SetStateAction<ProductFilters>>,
  ] = useContext(SideBarContext);

  function update(e: ChangeEvent<HTMLInputElement>) {
    filters[e.target.name] = e.target.value;
    setFilters(filters);
  }

  return (
    <div className="mx-0 flex h-full w-full flex-col overflow-y-auto rounded-lg border p-6 sm:max-w-md md:w-[45%] md:p-8 lg:w-[25%]">
      <h2>Filtros</h2>
      <section>
        <input
          type="radio"
          name="environment"
          id="env-fresh"
          value="fresh"
          onChange={update}
        />
        <input
          type="radio"
          name="environment"
          id="env-fresh"
          value="salt"
          onChange={update}
        />
      </section>

      <section>{filters.environment}</section>
    </div>
  );
}
