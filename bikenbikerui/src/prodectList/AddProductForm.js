import React, { useState } from 'react';

const AddProductForm = ({ onSubmit }) => {
  const initialFormData = {
    product_name: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Field validation
    const nameValidation = !formData.product_name.trim();
    const descriptionValidation = !formData.description.trim();
  
    setNameError(nameValidation ? 'Name cannot be empty' : '');
    setDescriptionError(descriptionValidation ? 'Description cannot be empty' : '');
  
    if (nameValidation || descriptionValidation) {
      return;
    }
  
    onSubmit(formData);
  
    setFormData(initialFormData);
    setNameError('');
    setDescriptionError('');
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'product_name') {
      setNameError('');
    } else if (name === 'description') {
      setDescriptionError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2>Add New Product</h2>
      <div style={formFieldStyles}>
        <label>Name:</label>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleInputChange}
          style={inputStyles}
        />
        {nameError && <p style={errorStyles}>{nameError}</p>}
      </div>
      <div style={formFieldStyles}>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={inputStyles}
        />
        {descriptionError && <p style={errorStyles}>{descriptionError}</p>}
      </div>
      <button type="submit" style={submitButtonStyles}>
        Add Product
      </button>
    </form>
  );
};

const formStyles = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f0f8ff',
  border: '1px solid #3498db',
  borderRadius: '5px',
};

const formFieldStyles = {
  marginBottom: '15px',
};

const inputStyles = {
  width: '93%',
  padding: '10px',
  border: '1px solid #3498db',
  borderRadius: '3px',
};

const submitButtonStyles = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const errorStyles = {
  color: 'red',
  fontSize: '12px',
  marginTop: '5px',
};

export default AddProductForm;
