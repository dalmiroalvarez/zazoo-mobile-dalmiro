import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </TouchableOpacity>
      
      <Animated.View style={[styles.details, { maxHeight }]}>
        <Text style={styles.category}>Categoría: {product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={toggleExpand}
        >
          <Text style={styles.closeButtonText}>−</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  titleContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  details: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  category: {
    fontSize: 14,
    color: '#666',
    padding: 15,
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
});