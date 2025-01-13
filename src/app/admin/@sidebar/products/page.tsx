"use client";

import { SideBarContext } from "@/app/lib/stores";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import ToggleButton from "../components/ToggleButton";
import MoneyInput from "../components/MoneyInput";

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
    <form className="flex h-full flex-col gap-4 overflow-y-auto rounded-lg border border-slate-500 bg-slate-200 p-6 text-stone-800 sm:max-w-md md:w-[45%] md:p-8 lg:w-[25vw]">
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
          checked={filters.feeding == "herbivore"}
          callback={() => setFilters({ ...filters, feeding: "herbivore" })}
        />
        <ToggleButton
          title="🥚 Onívoro"
          group="feeding"
          checked={filters.feeding == "omnivore"}
          callback={() => setFilters({ ...filters, feeding: "omnivore" })}
        />
        <ToggleButton
          title="🍖 Carnívoro"
          group="feeding"
          checked={filters.feeding == "carnivore"}
          callback={() => setFilters({ ...filters, feeding: "carnivore" })}
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
          checked={filters.behaviour == "pacific"}
          callback={() => setFilters({ ...filters, behaviour: "pacific" })}
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
          checked={filters.behaviour == "cluster"}
          callback={() => setFilters({ ...filters, behaviour: "cluster" })}
        />
      </section>

      <section className="grid grid-cols-2 gap-2">
        <button type="reset" className="btn btn-outline btn-error">
          Limpar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </section>
    </form>
  );
}
