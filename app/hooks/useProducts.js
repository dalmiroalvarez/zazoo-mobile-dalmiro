import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/index';

export const useProducts = (category = '', sortOrder = 'default') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const loadProducts = useCallback(async (currentPage) => {
    if (!hasMoreProducts && currentPage > 1) return;

    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts({
        limit: 5,
        page: currentPage,
        category,
        sort: sortOrder
      });
      
      // If no products are returned, we've reached the end
      if (fetchedProducts.length === 0) {
        setHasMoreProducts(false);
      }

      setProducts(prevProducts => 
        currentPage === 1 ? fetchedProducts : [...prevProducts, ...fetchedProducts]
      );
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      setHasMoreProducts(false);
    }
  }, [category, sortOrder, hasMoreProducts]);

  useEffect(() => {
    setPage(1);
    setHasMoreProducts(true);
    loadProducts(1);
  }, [category, sortOrder, loadProducts]);

  const loadMore = () => {
    if (!loading && hasMoreProducts) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage);
    }
  };

  // Required default export
  const UseProducts = () => {
    return {
      products,
      loading,
      error,
      hasMoreProducts,
      loadMore
    };
  };

  return UseProducts;
};

export default function ProductsHook() {
  return null;
}