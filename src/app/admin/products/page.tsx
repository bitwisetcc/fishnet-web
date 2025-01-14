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
  useState,
} from "react";
import OrderingIcon from "./components/OrderingIcon";
import ProductLine from "./components/ProductLine";
import SearchPanel from "./components/SearchPanel";
import InsightsModal from "./components/InsightsModal";
import {
  cycleNameOrdering,
  cyclePriceOrdering,
  getProducts,
  ProductFilters,
  ProductOrdering,
} from "./lib";

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

  const [insightId, setInsightId] = useState<string>(null);

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
        },
      ).then(() => setLoading(false));
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
              <th
                onClick={() => setOrdering(cycleNameOrdering(ordering))}
                className="cursor-pointer transition-colors hover:text-stone-800"
              >
                <div className="flex items-center gap-2">
                  Identificação
                  <OrderingIcon
                    state={ordering.name}
                    variants={{
                      default: undefined,
                      ascending: "A-Z",
                      descending: "Z-A",
                    }}
                  />
                </div>
              </th>
              <th
                onClick={() => setOrdering(cyclePriceOrdering(ordering))}
                className="cursor-pointer transition-colors hover:text-stone-800"
              >
                <div className="flex items-center gap-2">
                  Preço
                  <OrderingIcon
                    state={ordering.price}
                    variants={{
                      default: undefined,
                      ascending: "crescente",
                      descending: "decrescente",
                    }}
                  />
                </div>
              </th>
              <th>Estoque</th>
              <th>Ações</th>
              <th className="rounded-r-xl border-r">Catálogo</th>
            </tr>
          </thead>
          <tbody className="before:block before:-indent-80 before:leading-3 before:content-['-']">
            {products.map((product) => (
              <ProductLine
                product={product}
                setId={setInsightId}
                key={product.id}
              />
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

      <InsightsModal id={insightId} />

      {/* <RegisterProductDialog open={registerOpen} setOpen={setRegisterOpen} /> */}
    </>
  );
}
