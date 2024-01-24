
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductForm from './AddProductForm';
import UpdateProductForm from './UpdateProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post('http://localhost:4000/api/product/add', newProduct);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const openUpdatePopup = (product) => {
    setSelectedProduct(product);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setSelectedProduct(null);
    setShowUpdatePopup(false);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.patch(`http://localhost:4000/api/product/update/${selectedProduct._id}`, updatedProduct);
      fetchProducts();
      closeUpdatePopup();
    } catch (error) {
      console.error('Error updating product:', error.message);
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

  const handleActiveProduct = async (productId) => {
    try {
      await axios.patch(`http://localhost:4000/api/product/active/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error activating product:', error.message);
    }
  };

  return (
    <div>
        {!showUpdatePopup && (
        <AddProductForm onSubmit={handleAddProduct} />
      )}
      {showUpdatePopup && (
        <UpdateProductForm
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
          onCancel={closeUpdatePopup}
        />
      )}
      <h2>Product List</h2>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Description</th>
            <th style={thStyles}>Status</th>
            <th style={thStyles}>Created At</th>
            <th style={thStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} style={{ ...trStyles, ...(product.status === 'deleted' ? deletedRowStyles : {}) }}>
              <td style={tdStyles}>{product.product_name}</td>
              <td style={tdStyles}>{product.description}</td>
              <td style={tdStyles}>{product.status}</td>
              <td style={tdStyles}>{new Date(product.created_at).toLocaleString()}</td>
              <td style={tdStyles}>
                <button style={updateButtonStyles} onClick={() => openUpdatePopup(product)}>Update</button>
                {product.status === 'active' && (
                  <button style={deleteButtonStyles} onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                )}
                {product.status === 'deleted' && (
                  <button style={activateButtonStyles} onClick={() => handleActiveProduct(product._id)}>Activate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    
    </div>
  );
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const trStyles = {
  transition: 'background-color 0.3s',
};

const deletedRowStyles = {
  background: '#ffcccc', // Light red for deleted rows
};

const updateButtonStyles = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px',
};

const deleteButtonStyles = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px',
};

const activateButtonStyles = {
  backgroundColor: '#2ecc71',
  color: '#fff',
  padding: '8px 12px',
  border: 'none'
}
 
export default ProductList;
