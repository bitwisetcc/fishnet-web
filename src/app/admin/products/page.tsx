"use client";

import { SideBarContext, TitleContext } from "@/app/lib/stores";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import throttle from "lodash.throttle";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductLine from "./components/ProductLine";
import SearchPanel from "./components/SearchPanel";
import { getProducts, ProductFilters, ProductOrdering } from "./lib";
import debounce from "lodash.debounce";

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

  const load = useCallback(
    throttle((filters, ordering, search, pageIndex) => {
      getProducts(filters, ordering, search, pageIndex).then(
        ({ products, pageCount }) => {
          setProducts(products);
          setPageCount(pageCount);
          console.log(search);
        },
      );

      setLoading(false);
    }, 1500),
    [],
  );

  useEffect(() => {
    load(filters, ordering, search, pageIndex);
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
      <SearchPanel
        search={search}
        callback={(e) => setSearch(e.target.value)}
      />

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
