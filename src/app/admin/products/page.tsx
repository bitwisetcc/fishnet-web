"use client";

import { SideBarContext, TitleContext } from "@/app/lib/stores";
import { PlusCircleIcon, PrinterIcon } from "@heroicons/react/24/outline";
import throttle from "lodash.throttle";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import OrderingIcon from "../components/listing/OrderingIcon";
import PaginationController from "../components/listing/PaginationController";
import SearchHeader from "../components/listing/SearchHeader";
import ProductLine from "./components/ProductLine";
import {
  cycleNameOrdering,
  cyclePriceOrdering,
  getProducts,
  ProductFilters,
  ProductOrdering,
} from "./lib";
import InsightsModal from "./modals/InsightsModal";
import RegisterProductModal from "./modals/RegisterModal";

export default function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  useEffect(() => setTitle("Produtos"), [setTitle]);

  const [loading, setLoading] = useState(true);
  const [insightId, setInsightId] = useState<string>(null);

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
      getProducts(filters, ordering, search, pageIndex)
        .then(({ products, pageCount }) => {
          setProducts(products);
          setPageCount(pageCount);
        })
        .then(() => setLoading(false));
    }, 1500),
    [],
  );

  useEffect(() => {
    load(filters, ordering, search, pageIndex);
  }, [filters, ordering, search, pageIndex]);

  if (loading) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <>

      <SearchHeader
        search={search}
        tip="Título do produto"
        callback={(e) => setSearch(e.target.value)}
      >
        <button
          className="btn btn-secondary btn-sm md:btn-md"
          onClick={() =>
            (
              document.getElementById("md-register-prod") as HTMLDialogElement
            ).showModal()
          }
        >
          <PlusCircleIcon className="size-5" />
          <span className="hidden md:inline">Adicionar</span>
        </button>

        <button className="btn btn-secondary btn-sm md:btn-md">
          <PrinterIcon className="size-5" />
          <span className="hidden md:inline">Imprimir</span>
        </button>
      </SearchHeader>

      <PaginationController
        pageCount={pageCount}
        pageIndex={pageIndex}
        cursor={setPageIndex}
      />

      <article className="overflow-x-auto">
        <table className="table border-separate border-spacing-x-0 border-spacing-y-1">
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
          <tbody>
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

      <PaginationController
        pageCount={pageCount}
        pageIndex={pageIndex}
        cursor={setPageIndex}
      />

      <InsightsModal id={insightId} />

      <RegisterProductModal />
    </>
  );
}
