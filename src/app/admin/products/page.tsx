"use client";

import { SideBarContext, TitleContext } from "@/app/lib/stores";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import InsightsDialog from "./components/InsightsDialog";
import ListingProducts from "./components/ListingProducts";
import ProductLine from "./components/ProductLine";
import RegisterProductDialog from "./components/RegisterProductDialog";
import { getProducts, ProductFilters, ProductOrdering } from "./lib";

export default function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  useEffect(() => setTitle("Produtos"), [setTitle]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [ordering, setOrdering] = useState<ProductOrdering>({
    name: undefined,
    price: undefined,
  });

  const [filters, setFilters]: [
    ProductFilters,
    Dispatch<SetStateAction<ProductFilters>>,
  ] = useContext(SideBarContext);

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setFilters({
      environment: undefined,
      feeding: undefined,
      behaviour: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  }, []);

  useEffect(() => {
    getProducts(filters, ordering, search, pageIndex).then(
      ({ products, pageCount }) => {
        setProducts(products);
        setPageCount(pageCount);
      },
    );

    setLoading(false);
  }, [filters, ordering, search, pageIndex]);

  const handleNextPage = () => {
    setPageIndex((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) setPageIndex((prev) => prev - 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPageIndex(1);
  };

  const handleSortByName = () => {
    // setPriceOrder("none");
    // setCurrentPage(1);
    // const newOrder =
    //   sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    // setSortOrder(newOrder);
  };

  const handleSortByPrice = () => {
    // setSortOrder("none");
    // setCurrentPage(1);
    // const newPriceOrder =
    //   priceOrder === "none" ? "asc" : priceOrder === "asc" ? "desc" : "none";
    // setPriceOrder(newPriceOrder);
  };

  if (loading) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <>
      <ListingProducts>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <label
              htmlFor="filter-sidebar"
              className="drawer-button flex cursor-pointer gap-2"
            >
              <FunnelIcon className="size-6" />
              Filtros
            </label>

            <button className="action" onClick={() => true}>
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

      <article className="overflow-x-auto">
        <table className="table border-separate border-spacing-x-0">
          <thead>
            <tr className="border-y bg-transparent text-lg text-stone-600 *:border-y *:border-slate-400 *:font-medium">
              <th className="rounded-l-xl border-l">Foto</th>
              <th onClick={handleSortByName}>Identificação</th>
              <th onClick={handleSortByPrice}>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
              <th className="rounded-r-xl border-r">Catálogo</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductLine product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </article>

      <footer className="my-8 flex items-center justify-between">
        <button
          className="action"
          onClick={handlePreviousPage}
          disabled={pageIndex === 1}
        >
          <ChevronLeftIcon className="size-5" />
          Anterior
        </button>
        <span>
          {pageIndex} / {pageCount}{" "}
        </span>
        <button
          className="action"
          onClick={handleNextPage}
          disabled={pageIndex === pageCount}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>

      {/* <RegisterProductDialog open={registerOpen} setOpen={setRegisterOpen} />
      <InsightsDialog
        open={insightsDialog}
        setOpen={setInsightsDialog}
        id={insightsId}
      /> */}
    </>
  );
}
