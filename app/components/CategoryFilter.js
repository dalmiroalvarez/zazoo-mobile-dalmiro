import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';

const categories = [
 { id: 'all', label: 'All Products' },
 { id: 'electronics', label: 'Electronics' },
 { id: 'jewelery', label: 'Jewelry' },
 { id: "men's clothing", label: "Men's Clothing" },
 { id: "women's clothing", label: "Women's Clothing" }
];

export default function CategoryFilter({ 
 selectedCategory, 
 onSelectCategory, 
 sortOrder, 
 onChangeSortOrder,
 animatedValue = new Animated.Value(0)
}) {
 const headerHeight = 150;
 
 const translateY = animatedValue?.interpolate({
   inputRange: [0, headerHeight],
   outputRange: [0, -headerHeight],
   extrapolate: 'clamp'
 });

 return (
   <Animated.View 
     style={[
       styles.container,
       { transform: [{ translateY: translateY || 0 }] }
     ]}
   >
     <ScrollView 
       horizontal 
       showsHorizontalScrollIndicator={false} 
       style={styles.scrollView}
       contentContainerStyle={styles.scrollViewContent}
     >
       {categories.map((category) => (
         <TouchableOpacity
           key={category.id}
           style={[
             styles.categoryButton,
             selectedCategory === category.id && styles.selectedButton
           ]}
           activeOpacity={0.7}
           onPress={() => onSelectCategory(category.id)}
         >
           <Text style={[
             styles.categoryText,
             selectedCategory === category.id && styles.selectedText
           ]}>
             {category.label}
           </Text>
         </TouchableOpacity>
       ))}
     </ScrollView>
     
     <TouchableOpacity
       style={styles.sortButton}
       activeOpacity={0.8}
       onPress={() => onChangeSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
     >
       <Text style={styles.sortText}>
         {sortOrder === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
       </Text>
       <Text style={styles.sortIcon}>
         {sortOrder === 'asc' ? '↑' : '↓'}
       </Text>
     </TouchableOpacity>
   </Animated.View>
 );
}

const styles = StyleSheet.create({
 container: {
   paddingVertical: 15,
   backgroundColor: '#ffffff',
   borderBottomWidth: 1,
   borderBottomColor: '#e1e4e8',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.05,
   shadowRadius: 3,
   elevation: 3,
   top: 0,
   left: 0,
   right: 0,
   zIndex: 1000,
 },
 scrollView: {
   marginBottom: 8,
 },
 scrollViewContent: {
   paddingHorizontal: 16,
   paddingVertical: 4,
 },
 categoryButton: {
   marginRight: 12,
   borderRadius: 25,
   paddingHorizontal: 20,
   paddingVertical: 12,
   backgroundColor: '#ffffff',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.1,
   shadowRadius: 2,
   elevation: 2,
 },
 selectedButton: {
   backgroundColor: '#282c34',
   shadowOpacity: 0.15,
   shadowRadius: 4,
   elevation: 4,
 },
 categoryText: {
   fontSize: 15,
   color: '#282c34',
   textAlign: 'center',
   fontWeight: '500',
 },
 selectedText: {
   color: '#ffffff',
   fontWeight: '600',
 },
 sortButton: {
   marginTop: 8,
   marginHorizontal: 16,
   padding: 12,
   borderRadius: 12,
   backgroundColor: '#f8f9fa',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   borderWidth: 1,
   borderColor: '#e1e4e8',
 },
 sortText: {
   fontSize: 14,
   color: '#282c34',
   marginRight: 8,
   fontWeight: '500',
 },
 sortIcon: {
   fontSize: 18,
   color: '#282c34',
 },
});