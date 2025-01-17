import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import { fetchProducts } from '../api/index';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductList({ category, sortOrder }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setPage(1);
    loadProducts(1);
  }, [category, sortOrder]);

  const loadProducts = async (currentPage) => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts({
        limit: 10,
        page: currentPage,
        category,
        sort: sortOrder
      });
      
      setProducts(prevProducts => 
        currentPage === 1 ? fetchedProducts : [...prevProducts, ...fetchedProducts]
      );
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productContainer}
      onPress={() => setSelectedProduct(item)}
    >
      <View style={styles.productCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage} 
          resizeMode="contain"
        />
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadProducts(nextPage);
  };

  const ProductDetailModal = () => {
    if (!selectedProduct) return null;

    return (
      <Modal
        visible={!!selectedProduct}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.backButtonContainer}
            onPress={() => setSelectedProduct(null)}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>

          <Image 
            source={{ uri: selectedProduct.image }} 
            style={styles.modalImage} 
            resizeMode="contain"
          />
          
          <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
          
          <Text style={styles.modalDescription}>
            {selectedProduct.description || 'No description available'}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.modalPrice}>
              ${selectedProduct.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading && products.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Unable to load products. Please try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        style={styles.listStyle}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
      <ProductDetailModal />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  listStyle: {
    backgroundColor: '#f8f9fa',
  },
  productContainer: {
    flex: 1,
    margin: 5,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  modalImage: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  // New Price Container Styles
  priceContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  priceLabel: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  }
});