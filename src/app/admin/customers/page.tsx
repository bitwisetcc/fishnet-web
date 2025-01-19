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
import UserLine from "./components/UserLine";
import {
  cycleUsernameOrdering,
  getUsers,
  UserFilters,
  UserOrdering,
} from "./lib";

export default function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  useEffect(() => setTitle("Clientes"), [setTitle]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [ordering, setOrdering] = useState<UserOrdering>({
    username: undefined,
  });

  const [filters, setFilters]: [
    UserFilters,
    Dispatch<SetStateAction<UserFilters>>,
  ] = useContext(SideBarContext);

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setFilters({
      cnpj: undefined,
      cpf: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      uf: undefined,
      username: undefined,
    });
  }, []);

  const load = useCallback(
    throttle((filters, ordering, search, pageIndex) => {
      getUsers(filters, ordering, search, pageIndex)
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
              <th
                onClick={() => setOrdering(cycleUsernameOrdering(ordering))}
                className="cursor-pointer rounded-l-xl border-l transition-colors hover:text-stone-800"
              >
                <div className="flex items-center gap-2">
                  Nome
                  <OrderingIcon
                    state={ordering.username}
                    variants={{
                      default: undefined,
                      ascending: "+user.name",
                      descending: "-user.name",
                    }}
                  />
                </div>
              </th>
              <th>Telefone</th>
              <th>E-mail (clipboard)</th>
              <th>Documento</th>
              <th>UF</th>
              <th className="rounded-r-xl border-r">
                Opções
                {/* copiar ID, mostrar compras (link para sales com filtros) */}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <UserLine user={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </article>

      <PaginationController
        pageCount={pageCount}
        pageIndex={pageIndex}
        cursor={setPageIndex}
      />
    </>
  );
}
