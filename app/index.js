import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ProductList from '../app/components/ProductList';
import CategoryFilter from '../app/components/CategoryFilter';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});