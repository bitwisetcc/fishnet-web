import { API_URL, parseProduct } from "@/app/lib/query";

export interface ProductFilters {
  environment: "fresh" | "salt";
  feeding: "herb" | "omni" | "carn";
  behaviour: "peaceful" | "aggressive" | "schooling";
  minPrice: number;
  maxPrice: number;
}

export interface ProductOrdering {
  name: "A-Z" | "Z-A";
  price: "crescente" | "decrescente";
}

interface QueryParameters extends Record<string, string> {
  name: string;

  tags: string;
  feeding: string;
  behaviour: string;
  minPrice: string;
  maxPrice: string;

  ordem: string;

  page: string;
}

export async function getProducts(
  filters: ProductFilters,
  ordering: ProductOrdering,
  name: string,
  page: number = 1,
) {
  const ordem = Object.entries(ordering)
    .filter((el) => el[1] != undefined)
    .map((el) => el[1])
    .join();

  const query: QueryParameters = {
    ...filters,
    minPrice: filters.minPrice?.toString(),
    maxPrice: filters.maxPrice?.toString(),
    tags: filters.environment,
    page: page.toString(),
    ordem,
    name,
  };

  for (const key in query) if (!query[key]) delete query[key];

  const queryString =  new URLSearchParams(query).toString();

  try {
    const res = await fetch(`${API_URL}/prods/filtros?${queryString}`);
    const data = await res.json();

    if (!data) return { products: [], pageCount: 0 };

    return {
      products: data.match.map(parseProduct),
      pageCount: data.page_count || 1,
    };
  } catch (error) {
    console.error(error.message);
    return { products: [], pageCount: 0 };
  }
}
