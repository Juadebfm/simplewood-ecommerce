import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { products: mockProducts } = await import(
          "../data/carpenter.data"
        );
        setProducts(mockProducts);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Helper functions for common operations
  const getProductById = (id) => {
    return products.find((product) => product._id === id || product.sku === id);
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const getProductsByCollection = (collection) => {
    return products.filter((product) => product.collections === collection);
  };

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getProductsByCollection,
    searchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
