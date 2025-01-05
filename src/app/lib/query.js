export const API_URL = "https://fishnet-api-py.onrender.com";

function parseProduct(prod) {
  return {
    ...prod,
    id: prod._id,
    image: prod.image || "/static/placeholder.png",
    quantity: 5,
    feeding: String(prod.feeding),
    tankSize: String(prod.tank_size),
    sizes: prod.size.match(/(\d*\scm)+/g) || ["Tamanho não informado"],
  };
}

export async function listAllProducts(page = 1, limit = 10) {
  try {
    const data = await fetch(`${API_URL}/prods`);
    const prods = await data.json();
    
    //console.log(prods);

    if (!Array.isArray(prods)) {
      return [];
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return prods.slice(start, end).map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getProductById(id) {
  const data = await fetch(`${API_URL}/prods/${id}`);
  const prod = await data.json();
  return parseProduct(prod);
}

export async function listProductNames(query = "", page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_URL}/prods`);
    const prods = await response.json();
    console.log("Resposta da API:", prods);

    // Filtra os produtos com base na query
    const filteredProds = prods.filter((prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase()),
    );

    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredProds.slice(start, end).map((prod) => ({
      id: prod._id || "ID não disponível",
      name: prod.name || "Nome não disponível",
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
}

export async function getProductByFilter(filters) {
  try {
    // Filtra os valores nulos, indefinidos ou vazios
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    const query = new URLSearchParams(filteredFilters).toString();
    const data = await fetch(`${API_URL}/prods/filtros?${query}`);
    const prods = await data.json();

    // Verifica se o resultado é válido e se 'match' é um array
    if (!prods || !Array.isArray(prods.match)) {
      return { products: [], pageCount: 0 };
    }

    // Retorna os produtos mapeados e o pageCount, se disponível
    return {
      products: prods.match.map(parseProduct),
      pageCount: prods.page_count || 1,  // Atribui 1 como valor padrão para pageCount
    };
  } catch (error) {
    console.error(error.message);
    return { products: [], pageCount: 0 };
  }
}

