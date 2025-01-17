import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

export default function CategoryFilter({ selectedCategory, onSelectCategory, sortOrder, onChangeSortOrder }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedButton
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => onChangeSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        <Text style={styles.sortText}>
          Ordenar: {sortOrder === 'asc' ? '↑' : '↓'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  sortButton: {
    marginTop: 10,
    marginHorizontal: 15,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#666',
  },
});