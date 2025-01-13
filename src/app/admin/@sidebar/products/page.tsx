"use client";

import { SideBarContext } from "@/app/lib/stores";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect
} from "react";
import ToggleButton from "../components/ToggleButton";

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

  useEffect(() => {
    setFilters({
      environment: null,
      feeding: null,
      behaviour: null,
      minPrice: null,
      maxPrice: null,
    });
  }, []);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-lg border border-slate-500 bg-slate-300 p-6 text-stone-800 sm:max-w-md md:w-[45%] md:p-8 lg:w-[25vw]">
      <h2 className="mb-5 text-2xl font-semibold">Filtros</h2>

      <section>
        <h3 className="text-lg">Ambiente</h3>

        <ToggleButton
          title="🌿 Água doce"
          checked={filters.environment == "fresh"}
          callback={() => setFilters({ ...filters, environment: "fresh" })}
        />
        <ToggleButton
          title="🌊 Água salgada"
          checked={filters.environment == "salt"}
          callback={() => setFilters({ ...filters, environment: "salt" })}
        />
      </section>

      <section>{filters.environment}</section>
    </div>
  );
}
