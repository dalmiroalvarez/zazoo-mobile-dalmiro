import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <View style={styles.container}>
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortOrder={sortOrder}
        onChangeSortOrder={setSortOrder}
      />
      <ProductList 
        category={selectedCategory}
        sortOrder={sortOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});