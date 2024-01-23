// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product_name: '', description: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:4000/api/product/add', newProduct);
      setNewProduct({ product_name: '', description: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/product/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {Array.isArray(products) ? (
          products.map((product) => (
            <li key={product._id}>
              {product.product_name} - {product.description}
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>

      <h2>Add New Product</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="product_name" value={newProduct.product_name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductList;
