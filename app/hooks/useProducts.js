import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/index';

export const useProducts = (page, category, sortOrder) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    setProducts([]);
    setHasMore(true);
  }, [category, sortOrder]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!hasMore) return;
      
      setLoading(true);
      try {
        const newProducts = await fetchProducts({
          limit,
          page,
          category: category === 'all' ? '' : category,
          sort: sortOrder,
        });
        
        if (newProducts.length < limit) {
          setHasMore(false);
        }

        if (page === 1) {
          setProducts(newProducts);
        } else {
          setProducts(prev => [...prev, ...newProducts]);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, category, sortOrder, hasMore]);

  return { products, loading, hasMore };
};