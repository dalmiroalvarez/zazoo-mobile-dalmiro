import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';

export default function HomeScreen() {
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