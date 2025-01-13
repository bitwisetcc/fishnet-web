"use client";

import { getProductByFilter } from "@/app/lib/query";
import { TitleContext } from "@/app/lib/stores";
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useContext, useEffect, useState } from "react";
import InsightsDialog from "./components/InsightsDialog";
import ListingProducts from "./components/ListingProducts";
import RegisterProductDialog from "./components/RegisterProductDialog";

export default function ListagemProduto() {
  const setTitle = useContext(TitleContext);

  useEffect(() => setTitle("Produtos"), [setTitle]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [filteringOpen, setFilteringOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");
  const [priceOrder, setPriceOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  const [insightsDialog, setInsightsDialog] = useState(false);
  const [insightsId, setInsightsId] = useState(null);

  const loadProducts = useCallback(async () => {
    const activeFilters = { ...filters, page: currentPage };

    if (priceOrder !== "none") {
      delete activeFilters.ordemAlfabetica;
      activeFilters.ordem = priceOrder === "asc" ? "crescente" : "decrescente";
    } else if (sortOrder !== "none") {
      activeFilters.ordem = sortOrder === "asc" ? "A-Z" : "Z-A";
    }

    try {
      const { products, pageCount } = await getProductByFilter(activeFilters);
      setFilteredProducts(products); // Atualiza a lista filtrada
      setTotalPages(pageCount); // Atualiza o número total de páginas
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setLoading(false);
    }
  }, [currentPage, filters, priceOrder, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, sortOrder, priceOrder, loadProducts]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Atualiza os filtros com o termo de pesquisa
    const updatedFilters = { ...filters, name: value };

    setFilters(updatedFilters);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortByName = () => {
    setPriceOrder("none");
    setCurrentPage(1);
    const newOrder =
      sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    setSortOrder(newOrder);
  };

  const handleSortByPrice = () => {
    setSortOrder("none");
    setCurrentPage(1);
    const newPriceOrder =
      priceOrder === "none" ? "asc" : priceOrder === "asc" ? "desc" : "none";
    setPriceOrder(newPriceOrder);
  };

  useEffect(() => {
    loadProducts(); // Carrega os produtos ao montar o componente ou atualizar filtros
  }, [filters, loadProducts]);

  const handleSaveFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <>
      <label htmlFor="filter-sidebar" className="drawer-button btn btn-primary">Open drawer</label>
      <ListingProducts onFilterChange={handleFilterChange}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          {/* Barra de pesquisa */}
          <span className="relative mb-2 flex flex-1 items-center gap-1 rounded-lg border p-2 text-slate-600 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Produto ou ID"
              maxLength={100}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <button
              className="group relative flex cursor-pointer items-center gap-2"
              onClick={() => setFilteringOpen(true)}
            >
              <FunnelIcon className="size-6" />
              <span className="hidden md:inline">Filtros</span>
            </button>

            <button className="action" onClick={() => setRegisterOpen(true)}>
              <PlusCircleIcon className="size-5" />
              <span className="hidden md:inline">Adicionar</span>
            </button>

            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </ListingProducts>

      <div className="overflow-x-scroll md:overflow-x-hidden">
        <article className="grid">
          <header className="listing col-span-7 flex items-center rounded-lg bg-slate-100 p-2 shadow-md">
            <span className="flex items-center justify-center font-semibold">
              Foto
            </span>
            <span
              className="cursor-pointer font-semibold"
              onClick={handleSortByName}
            >
              <span className="flex w-max items-center justify-start rounded bg-slate-400/30 p-1">
                Nome{" "}
                {sortOrder === "asc" ? (
                  <ArrowDownIcon className="ml-1 mt-1 size-4" />
                ) : sortOrder === "desc" ? (
                  <ArrowUpIcon className="ml-1 mt-1 size-4" />
                ) : (
                  <ArrowsUpDownIcon className="ml-1 mt-1 size-4" />
                )}
              </span>
            </span>
            <span
              className="flex cursor-pointer items-center justify-center font-semibold"
              onClick={handleSortByPrice}
            >
              <span className="flex w-max items-center justify-start rounded bg-slate-400/30 p-1">
                Preço{" "}
                {priceOrder === "asc" ? (
                  <ArrowDownIcon className="ml-1 mt-1 size-4" />
                ) : priceOrder === "desc" ? (
                  <ArrowUpIcon className="ml-1 mt-1 size-4" />
                ) : (
                  <ArrowsUpDownIcon className="ml-1 mt-1 size-4" />
                )}
              </span>
            </span>
            <span className="flex items-center justify-center font-semibold">
              Estoque
            </span>
            <span className="flex items-center justify-center font-semibold">
              Insights
            </span>
            <span className="flex items-center justify-center font-semibold">
              Ações
            </span>
            <span className="flex items-center justify-center font-semibold">
              Catálogo
            </span>
          </header>

          {filteredProducts.map((product) => (
            <section
              className="col-span-7 my-2 grid grid-cols-subgrid items-center rounded-lg p-2 transition-colors duration-200 hover:bg-slate-50"
              key={product.id}
            >
              <span className="flex items-center justify-center truncate">
                <img
                  src={product.pictures[0]}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
              </span>
              <span className="flex flex-col items-start truncate text-nowrap">
                <span>{product.name}</span>
                <span className="text-sm text-gray-500">{product.id}</span>
              </span>
              <span className="flex items-center justify-center font-semibold">
                R${product.price.toFixed(2)}
              </span>
              <span className="flex items-center justify-center text-nowrap">
                {product.quantity}
              </span>
              <button
                className="flex items-center justify-center"
                onClick={(e) => {
                  setInsightsId(product.id);
                  setInsightsDialog(true);
                }}
              >
                <ArrowTopRightOnSquareIcon className="size-5 cursor-pointer text-slate-800 transition-colors duration-200 hover:text-yellow-light" />
              </button>
              <span className="flex items-center justify-center gap-2">
                <button className="transition-colors duration-200 hover:text-yellow-light">
                  <LockClosedIcon className="size-5" />
                </button>
                <button className="transition-colors duration-200 hover:text-yellow-light">
                  <PencilSquareIcon className="size-5" />
                </button>
              </span>
              <span className="flex items-center justify-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-10 rounded-full bg-gray-200 transition duration-200 peer-checked:bg-green-600"></div>
                  <span className="absolute h-4 w-4 rounded-full bg-white shadow transition duration-200 peer-checked:translate-x-5 peer-checked:shadow-lg"></span>
                </label>
              </span>
            </section>
          ))}
        </article>
      </div>

      <footer className="my-8 flex items-center justify-between">
        <button
          className="action"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="size-5" />
          Anterior
        </button>
        <span>
          {currentPage} / {totalPages}{" "}
        </span>
        <button
          className="action"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>

      <RegisterProductDialog open={registerOpen} setOpen={setRegisterOpen} />
      <InsightsDialog
        open={insightsDialog}
        setOpen={setInsightsDialog}
        id={insightsId}
      />
    </>
  );
}
