"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductPreview from "@/app/components/ProductPreview";
import {getProductByFilter } from "@/app/lib/query";

export default function ProductPage() {
  const [prods, setProds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [noResults, setNoResults] = useState(false);
  const params = useParams();

  const loadProducts = useCallback(
    async (page) => {
      setLoading(true);
      const { products, pageCount}  = await getProductByFilter({ ...filters, page });
      setProds(products);
      setTotalPages(pageCount);
      setNoResults(products.length === 0);
      setLoading(false);
    },
    [filters]
  );

  useEffect(() => {
    loadProducts(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para uma rolagem suave
    });
  }, [page, filters, loadProducts]);  

  useEffect(() => {
    // Sort products based on params
    if (params.sort) {
      const sortedProds = [...prods].sort((a, b) => {
        if (params.sort === "az") return a.name.localeCompare(b.name);
        if (params.sort === "za") return b.name.localeCompare(a.name);
      });
      setProds(sortedProds);
    }
  }, [params.sort, prods]);

  const handlePreviousPage = () => {
    if (page > 1) {
      handleFilterChange({ page: page - 1 });
    }
  };
  
  const handleNextPage = () => {
    handleFilterChange({ page: page + 1 });
  };
  
  const handleFilterChange = (newFilter) => {
    const updatedPage = newFilter.page || 1; // Verifica se o filtro contém a página
    setPage(updatedPage);
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  };

  const clearFilters = async () => {
    setFilters({});
    setNoResults(false);
    await loadProducts(1); 
    setProds([]); 
    setPage(1); 
    document.getElementById("order-select").value = ""; 
    document.getElementById("min-price").value = ""; 
    document.getElementById("max-price").value = ""; 
  };

  return (
    <div className="h-full bg-slate-50 p-7 md:flex md:p-12 lg:p-16">
      <SideBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />
      <hr className="my-5 border-stone-200 md:hidden" />
      <div className="md:pl-10">
        <h1 className="mb-5 text-3xl font-semibold text-stone-800">Produtos</h1>

        {noResults ? (
          <div className="text-red-500">
            Nenhum produto encontrado ou existente
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {prods.map((prod, index) => (
              <ProductPreview product={prod} key={`${prod.id}-${index}`} />
            ))}
          </section>
        )}

        {loading && (
          <div>
            <img
              src="/static/loading.gif"
              width={40}
              height={40}
              className="mt-5"
              alt="Loading..."
            />
          </div>
        )}

        {!loading && (
          <footer className="flex justify-between my-8 items-center">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#11223a] bg-[#11223a] text-white hover:bg-[#11223a] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 ease-in-out"
              onClick={handlePreviousPage}
              disabled={page === 1} // Desabilitar botão anterior na primeira página
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Anterior
            </button>
            <span> {page} / {totalPages} </span> {/* Exibir a página atual */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#11223a] bg-[#11223a] text-white hover:bg-[#11223a] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 ease-in-out"
              onClick={handleNextPage}
              disabled={page === totalPages} // Desabilitar botão próxima na última página
            >
              Próxima
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </footer>
        )}


      </div>
    </div>
  );
}

function SideBar({ filters, onFilterChange, onClearFilters }) {
  const handleFilterClick = (filter) => {
    onFilterChange(filter);
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    handleFilterClick({ [type]: value });
  };

  const [open, setOpen] = useState(false);

  return (
    <aside className="w-full border-stone-200 text-stone-600 md:w-64 md:min-w-[16rem] md:max-w-[16rem] md:border-b-0 md:border-r md:pr-12">
      <button
        className="mb-3 flex w-full items-center gap-1 rounded-lg border border-slate-500 bg-slate-100 p-3 py-2 shadow-sm md:hidden"
        onClick={() => setOpen(!open)}
      >
        Filtros <FunnelIcon className="size-5" />{" "}
      </button>
      <ul
        className={`flex origin-top flex-col gap-3 text-sm transition-transform duration-150 ${!open && "h-0 scale-y-0 md:h-full md:scale-y-100"}`}
      >
        <Category
          title="Ordenar"
          items={[
            <select
              id="order-select" // Adicionando o id para resetar o select
              onChange={(e) => handleFilterClick({ ordem: e.target.value })}
              value={filters.ordem || ""} // Seleciona o valor baseado no filtro
              className={`w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                filters.ordem ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              <option value="">Selecione</option> {/* Opção padrão */}
              <option value="A-Z">Ordem alfabética A-Z</option>
              <option value="Z-A">Ordem alfabética Z-A</option>
              <option value="crescente">Menor preço</option>
              <option value="decrescente">Maior preço</option>
            </select>,
          ]}
        />

        <Category
          title="Ambiente"
          items={[
            <button
              onClick={() => handleFilterClick({ tags: "fresh" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.tags === "fresh" ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              🌿 Água doce
            </button>,
            <button
              onClick={() => handleFilterClick({ tags: "salt" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.tags === "salt" ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              🌊 Água salgada
            </button>,
          ]}
        />

        <Category
          title="Alimentação"
          items={[
            <button
              onClick={() => handleFilterClick({ feeding: "Herb" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.feeding === "Herb" ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              🌱 Herbívoro
            </button>,
            <button
              onClick={() => handleFilterClick({ feeding: "Omni" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.feeding === "Omni" ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              🍽️ Onívoro
            </button>,
            <button
              onClick={() => handleFilterClick({ feeding: "Carn" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.feeding === "Carn" ? "border-blue-500 bg-blue-100" : ""
              }`} // Destaque se filtro estiver ativo
            >
              🍖 Carnívoro
            </button>,
          ]}
        />

        <Category
          title="Valores"
          items={[
            <>
              <label htmlFor="min-price" className="mb-1 block">
                Preço mínimo: R$
              </label>
              <input
                type="number"
                id="min-price" // Adicionando o id para resetar o campo
                min={0}
                step={10}
                value={filters.minPrice || ""} // Preenche com o valor do filtro ou vazio
                className={`w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.minPrice ? "border-blue-500 bg-blue-100" : ""
                }`} // Destaque se filtro estiver ativo
                onChange={(e) => handlePriceChange(e, "minPrice")} // Atualiza o estado ao mudar o valor
              />

              <label htmlFor="max-price" className="mb-1 block">
                Preço máximo: R$
              </label>
              <input
                type="number"
                id="max-price" // Adicionando o id para resetar o campo
                min={0}
                step={10}
                value={filters.maxPrice || ""} // Preenche com o valor do filtro ou vazio
                className={`w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filters.maxPrice ? "border-blue-500 bg-blue-100" : ""
                }`} // Destaque se filtro estiver ativo
                onChange={(e) => handlePriceChange(e, "maxPrice")} // Atualiza o estado ao mudar o valor
              />
            </>,
          ]}
        />

        <Category
          title="Comportamento Social"
          items={[
            <button
              onClick={() => handleFilterClick({ behavior: "peaceful" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.behavior === "peaceful"
                  ? "border-blue-500 bg-blue-100"
                  : ""
              }`} // Destaque se filtro estiver ativo
            >
              🕊️ Pacífico
            </button>,
            <button
              onClick={() => handleFilterClick({ behavior: "aggressive" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.behavior === "aggressive"
                  ? "border-blue-500 bg-blue-100"
                  : ""
              }`} // Destaque se filtro estiver ativo
            >
              🦈 Agressivo
            </button>,
            <button
              onClick={() => handleFilterClick({ behavior: "schooling" })}
              className={`w-full rounded-md border p-2 hover:bg-blue-100 ${
                filters.behavior === "schooling"
                  ? "border-blue-500 bg-blue-100"
                  : ""
              }`} // Destaque se filtro estiver ativo
            >
              🐟 Em cardume
            </button>,
          ]}
        />

        {/* Botão Limpar Filtros */}
        <button
          onClick={onClearFilters}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Limpar Filtros
        </button>
      </ul>
    </aside>
  );
}

function Category({ title, items }) {
  return (
    <li className="rounded-lg bg-stone-100 p-4">
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </li>
  );
}
