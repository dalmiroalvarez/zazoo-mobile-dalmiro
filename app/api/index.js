const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts({ limit = 5, page = 1, category = '', sort = 'asc' }) {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  let endpoint = `${BASE_URL}/products`;
  if (category && category !== 'all') {
    endpoint += `/category/${category}`;
  }
  endpoint += `?sort=${sort}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }
    const data = await response.json();
    return data.slice(start, end);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

export default function ProductAPI() {
  return {
    fetchProducts,
  };
}