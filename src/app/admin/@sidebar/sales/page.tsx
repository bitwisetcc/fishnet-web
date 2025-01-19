"use client";

import { SideBarContext } from "@/app/lib/stores";
import { Dispatch, SetStateAction, useContext } from "react";
import MoneyInput from "../components/MoneyInput";
import ToggleButton from "../components/ToggleButton";
import { SaleFilters } from "../../sales/lib";
import DateInput from "../components/DateInput";

const nullFilters: SaleFilters = {
  maxDate: undefined,
  maxPrice: undefined,
  minDate: undefined,
  minPrice: undefined,
  payment: undefined,
  status: undefined,
};

export default function SalesSideBar() {
  let [filters, setFilters]: [
    SaleFilters,
    Dispatch<SetStateAction<SaleFilters>>,
  ] = useContext(SideBarContext);

  return (
    <form className="flex h-full w-[75vw] flex-col gap-4 overflow-y-auto rounded-lg border border-slate-500 bg-base-200 p-6 text-stone-800 sm:w-[45vw] md:p-8 lg:w-[25vw]">
      <h2 className="mb-5 text-2xl font-semibold">Filtros</h2>

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
        <h3 className="text-lg">Pagamento</h3>

        <ToggleButton
          title="💠 PIX"
          group="payment"
          checked={filters.payment == "pix"}
          callback={() => setFilters({ ...filters, payment: "pix" })}
        />
        <ToggleButton
          title="💳 Crédito"
          group="payment"
          checked={filters.payment == "credit"}
          callback={() => setFilters({ ...filters, payment: "credit" })}
        />
        <ToggleButton
          title="💳 Débito"
          group="payment"
          checked={filters.payment == "debit"}
          callback={() => setFilters({ ...filters, payment: "debit" })}
        />
      </section>

      <section>
        <h3 className="text-lg">Status</h3>

        <ToggleButton
          title="Finalizado"
          group="status"
          checked={filters.status == 1}
          callback={() => setFilters({ ...filters, status: 1 })}
        />
        <ToggleButton
          title="Pendente"
          group="status"
          checked={filters.status == 0}
          callback={() => setFilters({ ...filters, status: 0 })}
        />
        <ToggleButton
          title="Cancelado"
          group="status"
          checked={filters.status == 2}
          callback={() => setFilters({ ...filters, status: 2 })}
        />
      </section>

      <section>
        <h3 className="text-lg">Data</h3>

        <DateInput
          label="Início do intervalo"
          callback={(e) =>
            setFilters({ ...filters, minDate: new Date(e.target.value) })
          }
        />
        <DateInput
          label="Fim do intervalo"
          callback={(e) =>
            setFilters({ ...filters, maxDate: new Date(e.target.value) })
          }
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
