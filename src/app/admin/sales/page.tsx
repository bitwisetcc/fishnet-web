"use client";

import { SideBarContext, TitleContext } from "@/app/lib/stores";
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
import InsightsModal from "../products/modals/InsightsModal";
import RegisterProductModal from "../products/modals/RegisterModal";
import SaleLine from "./components/SaleLine";
import {
  cycleClientOrdering,
  cycleDateOrdering,
  cycleTotalOrdering,
  getSales,
  SaleFilters,
  SaleOrdering,
} from "./lib";

export default function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  useEffect(() => setTitle("Vendas"), [setTitle]);

  const [loading, setLoading] = useState(true);
  const [insightId, setInsightId] = useState<string>(null);

  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [ordering, setOrdering] = useState<SaleOrdering>({
    client: undefined,
    date: undefined,
    total: undefined,
  });

  const [filters, setFilters]: [
    SaleFilters,
    Dispatch<SetStateAction<SaleFilters>>,
  ] = useContext(SideBarContext);

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setFilters({
      maxDate: undefined,
      minDate: undefined,
      payment: undefined,
      status: undefined,
      maxPrice: undefined,
      minPrice: undefined,
    });
  }, []);

  const load = useCallback(
    throttle((filters, ordering, search, pageIndex) => {
      getSales(filters, ordering, search, pageIndex)
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
        tip="Nome do cliente"
        callback={(e) => setSearch(e.target.value)}
      />

      <PaginationController
        pageCount={pageCount}
        pageIndex={pageIndex}
        cursor={setPageIndex}
      />

      <article className="overflow-x-auto">
        <table className="table border-separate border-spacing-x-0 border-spacing-y-1">
          <thead>
            <tr className="border-y bg-transparent text-lg text-stone-600 *:border-y *:border-slate-400 *:font-medium">
              <th
                onClick={() => setOrdering(cycleClientOrdering(ordering))}
                className="cursor-pointer transition-colors hover:text-stone-800 rounded-l-xl border-l"
              >
                <div className="flex items-center gap-2">
                  Cliente
                  <OrderingIcon
                    state={ordering.client}
                    variants={{
                      default: undefined,
                      ascending: "A-Z",
                      descending: "Z-A",
                    }}
                  />
                </div>
              </th>
              <th>Frete</th>
              <th
                onClick={() => setOrdering(cycleTotalOrdering(ordering))}
                className="cursor-pointer transition-colors hover:text-stone-800"
              >
                <div className="flex items-center gap-2">
                  Total
                  <OrderingIcon
                    state={ordering.total}
                    variants={{
                      default: undefined,
                      ascending: "crescente",
                      descending: "decrescente",
                    }}
                  />
                </div>
              </th>
              <th>Pagamento</th>
              <th>Status</th>
              <th
                onClick={() => setOrdering(cycleDateOrdering(ordering))}
                className="cursor-pointer transition-colors hover:text-stone-800"
              >
                <div className="flex items-center gap-2">
                  Data
                  <OrderingIcon
                    state={ordering.date}
                    variants={{
                      default: undefined,
                      ascending: "crescente",
                      descending: "decrescente",
                    }}
                  />
                </div>
              </th>
              <th className="rounded-r-xl border-r">Mais</th>
            </tr>
          </thead>
          <tbody>
            {products.map((sale) => (
              <SaleLine
                sale={sale}
                setId={setInsightId}
                key={sale._id}
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
