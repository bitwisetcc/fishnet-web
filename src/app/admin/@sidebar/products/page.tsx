"use client";

import { SideBarContext } from "@/app/lib/stores";
import { Dispatch, SetStateAction, useContext } from "react";
import { ProductFilters } from "../../products/lib";
import MoneyInput from "../components/MoneyInput";
import ToggleButton from "../components/ToggleButton";

const nullFilters: ProductFilters = {
  environment: undefined,
  feeding: undefined,
  behaviour: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

export default function ProductsSideBar() {
  let [filters, setFilters]: [
    ProductFilters,
    Dispatch<SetStateAction<ProductFilters>>,
  ] = useContext(SideBarContext);

  return (
    <form className="flex h-full w-[75vw] flex-col gap-4 overflow-y-auto rounded-lg border border-slate-500 bg-base-200 p-6 text-stone-800 sm:w-[45vw] md:p-8 lg:w-[25vw]">
      <h2 className="mb-5 text-2xl font-semibold">Filtros</h2>

      <section>
        <h3 className="text-lg">Ambiente</h3>

        <ToggleButton
          title="🌿 Água doce"
          group="environment"
          checked={filters.environment == "fresh"}
          callback={() => setFilters({ ...filters, environment: "fresh" })}
        />
        <ToggleButton
          title="🌊 Água salgada"
          group="environment"
          checked={filters.environment == "salt"}
          callback={() => setFilters({ ...filters, environment: "salt" })}
        />
      </section>

      <section>
        <h3 className="text-lg">Alimentação</h3>

        <ToggleButton
          title="🌱 Herbívoro"
          group="feeding"
          checked={filters.feeding == "herb"}
          callback={() => setFilters({ ...filters, feeding: "herb" })}
        />
        <ToggleButton
          title="🥚 Onívoro"
          group="feeding"
          checked={filters.feeding == "omni"}
          callback={() => setFilters({ ...filters, feeding: "omni" })}
        />
        <ToggleButton
          title="🍖 Carnívoro"
          group="feeding"
          checked={filters.feeding == "carn"}
          callback={() => setFilters({ ...filters, feeding: "carn" })}
        />
      </section>

      <section>
        <h3 className="text-lg">Valores</h3>

        <MoneyInput
          label="Preço mínimo"
          value={filters.minPrice}
          callback={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
        />
        <MoneyInput
          label="Preço máximo"
          value={filters.maxPrice}
          callback={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
        />
      </section>

      <section>
        <h3 className="text-lg">Comportamento</h3>

        <ToggleButton
          title="🕊️ Pacífico"
          group="behaviour"
          checked={filters.behaviour == "peaceful"}
          callback={() => setFilters({ ...filters, behaviour: "peaceful" })}
        />
        <ToggleButton
          title="🦈 Agressivo"
          group="behaviour"
          checked={filters.behaviour == "aggressive"}
          callback={() => setFilters({ ...filters, behaviour: "aggressive" })}
        />
        <ToggleButton
          title="🎏 Cardume"
          group="behaviour"
          checked={filters.behaviour == "schooling"}
          callback={() => setFilters({ ...filters, behaviour: "schooling" })}
        />
      </section>

      <button
        type="reset"
        className="btn btn-outline btn-error btn-wide"
        onClick={() => setFilters(nullFilters)}
      >
        Limpar
      </button>
    </form>
  );
}
