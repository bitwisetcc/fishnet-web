import { API_URL } from "@/app/lib/query";

export interface UserFilters extends Record<string, string> {
  role: string;
  username: string;
  phone: string;
  email: string;
  cpf: string;
  cnpj: string;
  uf: string;
}

export interface UserOrdering {
  username: "+user.name" | "-user.name";
}

interface QueryParameters extends UserFilters {
  ordering: string;
  page: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
  addr: string;
  uf: string;
}

function parseUser(obj: any): User {
  delete obj.password;
  return { ...obj, phone: obj.tel };
}

export async function getUsers(
  filters: UserFilters,
  ordering: UserOrdering,
  name: string,
  page: number = 1,
) {
  const ordem = Object.entries(ordering)
    .filter((el) => el[1] != undefined)
    .map((el) => el[1])
    .join();

  const query: QueryParameters = {
    ...filters,
    page: page.toString(),
    ordering: ordem,
  };

  for (const key in query) if (!query[key]) delete query[key];

  const queryString = new URLSearchParams(query).toString();

  try {
    const res = await fetch(`${API_URL}/users/filter?${queryString}`);
    const data = await res.json();

    if (!data) return { sales: [], pageCount: 0 };

    return {
      products: data.match.map(parseUser),
      pageCount: data.page_count || 1,
    };
  } catch (error) {
    console.error(error.message);
    return { products: [], pageCount: 0 };
  }
}

export function cycleUsernameOrdering(ordering: UserOrdering): UserOrdering {
  let updated: UserOrdering = { username: "+user.name" };

  switch (ordering.username) {
    case "+user.name":
      updated.username = "-user.name";
      break;
    case "-user.name":
      updated.username = undefined;
      break;
  }

  return updated;
}
