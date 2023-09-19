import React, { useEffect, useState } from 'react';
import './AddProducts.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Retrieve the product data from state
    const navigate  = useNavigate()
    const [formData, setFormData] = useState({
      brand: product?.brand || '',
      country: product?.country || '',
      founded: product?.founded || '',
      // ... other form fields
    });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const { product } = location.state || {};
    if (product) {
      setIsEditing(true);
      // Pre-fill the form fields with the product data
      setFormData({
        brand: product?.brand || '',
        country: product?.country || '',
        founded: product?.founded || '',
        image: product?.image || ''
        // ... other form fields
      });
    }
  }, [location.state]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      readImageFile(imageFile);
    } else {
      // Clear the image if no file is selected
      setFormData({ ...formData, image: '' });
    }
  };

  const readImageFile = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setFormData({ ...formData, image: imageDataUrl });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    e.preventDefault();
    try {
        if(isEditing){

            const updatedProduct = {...formData, userId };

            let res = await fetch(` http://localhost:3500/update-product/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      let result = await res.json();

      if (res.ok) {
        console.log('Product updated successfully.', result);
        // Clear the form fields
        setFormData({
          brand: '',
          country: '',
          founded: '',
          image: '', // Clear the image as well
        });
        navigate('/')
      } else {
        console.log('Error:', res.statusText);
      }

        }else{

            const newdata  = { ...formData, userId }

      let res = await fetch('http://localhost:3500/add-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newdata),
      });
      let result = await res.json();

      if (res.ok) {
        console.log('Product added successfully.', result);
        // Clear the form fields
        setFormData({
          brand: '',
          country: '',
          founded: '',
          image: '', // Clear the image as well
        }); 
        navigate('/')
      } else {
        console.log('Error:', res.statusText);
      }
    }
    } catch (error) {
      console.log('Error:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="founded">Founded:</label>
          <input
            type="number"
            id="founded"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image" className="upload-label">
            <FontAwesomeIcon icon={faUpload} /> Upload Image
          </label>
        </div>
        <div className="form-group">
          <button type="submit">{ product ? "Update Product" : "add product"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
