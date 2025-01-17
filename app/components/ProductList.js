import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';  // Asegúrese de que la ruta sea correcta

export default function ProductList({ category, sortOrder }) {
  const [page, setPage] = useState(1);
  const { products, loading, hasMore } = useProducts(page, category, sortOrder);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    padding: 10,
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});