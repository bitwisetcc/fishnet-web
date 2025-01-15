import { API_URL, parseProduct } from "@/app/lib/query";

export interface SaleFilters {
  minPrice: number;
  maxPrice: number;
  payment: "pix" | "debit" | "credit";
  status: 0 | 1 | 2;
  minDate: Date;
  maxDate: Date;
}

export interface SaleOrdering {
  client: "+customer.name" | "-customer.name";
  total: "+total" | "-total";
  date: "+date" | "-date";
}

interface QueryParameters extends Record<string, string> {
  username: string;

  min_price: string;
  max_price: string;
  min_date: string;
  max_date: string;

  payment_method: string;
  status: string;

  ordering: string;
  page: string;
}

interface SaleItem {
  _id: string;
  price: number;
  quantity: number;
}

interface Customer {
  _id: string;
  email: string;
  name: string;
}

export interface Sale {
  _id: string;
  customer: Customer;
  items: Array<SaleItem>;
  paymentMethod: string;
  paymentProvider: string;
  shipping: number;
  shippingProvider: string;
  status: number;
  tax: number;
  total: number;
  date: string;
}

function parseSale(obj: any): Sale {
  console.debug(obj)
  return {
    ...obj,
    paymentMethod: obj.payment_method,
    paymentProvider: obj.payment_provider,
    shippingProvider: obj.shipping_provider,
    // date: new Date(Date.parse(obj.date)).toLocaleDateString(),
  };
}

export async function getSales(
  filters: SaleFilters,
  ordering: SaleOrdering,
  name: string,
  page: number = 1,
) {
  const ordem = Object.entries(ordering)
    .filter((el) => el[1] != undefined)
    .map((el) => el[1])
    .join();

  const query: QueryParameters = {
    username: name,

    min_price: filters.minPrice?.toString(),
    max_price: filters.maxPrice?.toString(),
    min_date: filters.minDate?.getTime().toString(),
    max_date: filters.maxDate?.getTime().toString(),

    payment_method: filters.payment,
    status: filters.status?.toString(),

    page: page.toString(),
    ordering: ordem,
  };

  for (const key in query) if (!query[key]) delete query[key];

  const queryString = new URLSearchParams(query).toString();

  try {
    const res = await fetch(`${API_URL}/sales/filter?${queryString}`);
    const data = await res.json();

    if (!data) return { sales: [], pageCount: 0 };

    return {
      products: data.match.map(parseSale),
      pageCount: data.page_count || 1,
    };
  } catch (error) {
    console.error(error.message);
    return { products: [], pageCount: 0 };
  }
}

export function cycleClientOrdering(ordering: SaleOrdering): SaleOrdering {
  let updated: SaleOrdering = {
    client: "+customer.name",
    date: undefined,
    total: undefined,
  };

  switch (ordering.client) {
    case "+customer.name":
      updated.client = "-customer.name";
      break;
    case "-customer.name":
      updated.client = undefined;
      break;
  }

  return updated;
}

export function cycleTotalOrdering(ordering: SaleOrdering): SaleOrdering {
  let updated: SaleOrdering = {
    total: "+total",
    client: undefined,
    date: undefined,
  };

  switch (ordering.total) {
    case "+total":
      updated.total = "-total";
      break;
    case "-total":
      updated.total = undefined;
      break;
  }

  return updated;
}

export function cycleDateOrdering(ordering: SaleOrdering): SaleOrdering {
  let updated: SaleOrdering = {
    date: "+date",
    total: undefined,
    client: undefined,
  };

  switch (ordering.date) {
    case "+date":
      updated.date = "-date";
      break;
    case "-date":
      updated.date = undefined;
      break;
  }

  return updated;
}
