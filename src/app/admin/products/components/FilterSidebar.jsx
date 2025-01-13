import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FilterSidebar({ open, setOpen, onSaveFilters }) {
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const clearFilters = () => {
    setSelectedEnvironment(null);
    setSelectedDiet(null);
    setSelectedBehavior(null);
    setMinPrice("");
    setMaxPrice("");
  };

  const [filters, setFilters] = useState({
    feeding: "",
    tankSize: "",
    // Add other filters as needed
  });

  const handleSave = () => {
    const selectedFilters = {
      ...filters,
      tags: selectedEnvironment,
      feeding: selectedDiet,
      behavior: selectedBehavior,
      minPrice: minPrice ? Number(minPrice) : undefined, // Convert to number or undefined if empty
      maxPrice: maxPrice ? Number(maxPrice) : undefined, // Convert to number or undefined if empty
    };
    onSaveFilters(selectedFilters); // Sends the filters to `ListagemProduto`
    setOpen(false); // Closes the modal
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-[#11223a]/80 p-4 md:justify-end">
        <DialogPanel className="mx-0 h-full w-full space-y-6 overflow-y-auto rounded-lg border border-[#cbd5e1] bg-[#f7f9fb] p-6 text-[#11223a] shadow-xl sm:max-w-md md:w-[45%] md:p-8 lg:w-[25%]">
          <header className="relative mb-6 flex items-center justify-between">
            <DialogTitle className="text-lg font-bold sm:text-xl md:text-2xl">
              Filtros
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="text-[#11223a] hover:text-[#c7ae5d]"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </header>

          {/* Seção de Filtros */}
          <section className="space-y-6">
            {/* Filtro de Ambiente */}
            <div>
              <h3 className="text-md font-semibold text-[#c7ae5d] sm:text-lg">
                Ambiente
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedEnvironment === "fresh"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedEnvironment(
                      selectedEnvironment === "fresh" ? null : "fresh",
                    )
                  }
                >
                  🌿 Água doce
                </button>
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedEnvironment === "salt"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedEnvironment(
                      selectedEnvironment === "salt" ? null : "salt",
                    )
                  }
                >
                  🌊 Água salgada
                </button>
              </div>
            </div>

            {/* Filtro de Alimentação */}
            <div>
              <h3 className="text-md font-semibold text-[#c7ae5d] sm:text-lg">
                Alimentação
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedDiet === "herb"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "herb" ? null : "herb")
                  }
                >
                  🌱 Herbívoro
                </button>
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedDiet === "omni"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "omni" ? null : "omni")
                  }
                >
                  🍽️ Onívoro
                </button>
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedDiet === "carn"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "carn" ? null : "carn")
                  }
                >
                  🍖 Carnívoro
                </button>
              </div>
            </div>

            {/* Filtro de Valores */}
            <div>
              <h3 className="text-md font-semibold text-[#c7ae5d] sm:text-lg">
                Valores
              </h3>
              <label htmlFor="min-price" className="mb-1 block text-[#11223a]">
                Preço mínimo: R$
              </label>
              <input
                type="number"
                id="min-price"
                min={0}
                step={10}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border border-[#cbd5e1] bg-[#f7f9fb] p-2 text-[#11223a] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="max-price"
                className="mb-1 mt-4 block text-[#11223a]"
              >
                Preço máximo: R$
              </label>
              <input
                type="number"
                id="max-price"
                min={0}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border border-[#cbd5e1] bg-[#f7f9fb] p-2 text-[#11223a] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro de Comportamento Social */}
            <div>
              <h3 className="text-md font-semibold text-[#c7ae5d] sm:text-lg">
                Comportamento Social
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedBehavior === "peaceful"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "peaceful" ? null : "peaceful",
                    )
                  }
                >
                  🕊️ Pacífico
                </button>
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedBehavior === "aggressive"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "aggressive" ? null : "aggressive",
                    )
                  }
                >
                  🦈 Agressivo
                </button>
                <button
                  className={`w-full rounded-md border p-2 ${
                    selectedBehavior === "schooling"
                      ? "border-blue-500 bg-blue-100"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "schooling" ? null : "schooling",
                    )
                  }
                >
                  🐟 Em cardume
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 rounded bg-[#c7ae5d] px-4 py-2 text-white hover:bg-[#11223a]"
                onClick={handleSave}
              >
                Salvar
              </button>
              <button
                className="flex-1 rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={clearFilters}
              >
                Limpar
              </button>
            </div>
          </section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
