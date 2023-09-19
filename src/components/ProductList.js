// import React, { useState, useEffect } from 'react';
// import './ProductList.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import mobileImage from '../components/mobile-image.jpg';
// import { useNavigate } from 'react-router-dom';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch products from the API when the component mounts
//     getProducts();
//   }, []);

//   const getProducts = () => {
//     fetch('http://localhost:3500/products')
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   };

//   const handleEdit = (product) => {
//     // Implement your edit logic here
//     navigate('/add-products', { state: { product } });
//   };

//   const handleDelete = async (productId) => {
//     // Implement your delete logic here
//     let res = await fetch(`http://localhost:3500/delete-product/${productId}`, {
//       method: 'DELETE',
//     });
//     let result = await res.json();
//     console.log(result);
//     // After deleting, fetch products again to update the list
//     getProducts();
//   };

//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <div className="card" key={product._id}>
//           <div className="card-body custom-card-layout">
//             <img src={product.image || mobileImage} className="card-img-top" alt={product.name} />
//             <div>
//               <h5 className="card-title">{product.brand}</h5>
//               <p className="card-text">{product.country}</p>
//             </div>
//           </div>
//           <div className="card-footer">
//             <button className="btn btn-primary" onClick={() => handleEdit(product)}>
//               <FontAwesomeIcon icon={faEdit} /> Edit
//             </button>
//             <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
//               <FontAwesomeIcon icon={faTrash} /> Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;





import React, { useEffect } from 'react';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import mobileImage from '../components/mobile-image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setSearchTerm, deleteProduct } from '../Store/store'; // Import the actions
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch products from the API when the component mounts
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://e-com-app-rose.vercel.app/products')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setProducts(data)); // Dispatch the action to set products in the Redux store
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const handleEdit = (product) => {
    navigate('/add-products', { state: { product } });
  };

//   const handleDelete = async (productId) => {
//     // Implement your delete logic here
//     // ...
//   };

  const handleDelete = async (productId) => {
        try {
      // Dispatch the deleteProduct action with the productId
      const resultAction = await dispatch(deleteProduct(productId));
      // You can access the result of the action using resultAction.payload if needed
      console.log(resultAction.payload);

      // After deleting, fetch products again to update the list
      getProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }}

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value)); // Dispatch the action to set the search term in the Redux store
  };

  const filteredProducts = products.filter((product) =>
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='main'>
      <div className='serach-product'>
      <input
        type="text"
        placeholder="Search products..."
        
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
      <div className="product-list">
      {filteredProducts.map((product) => (
        <div className="card" key={product._id}>
          <div className="card-body custom-card-layout">
            <img
              src={product.image || mobileImage}
              className="card-img-top"
              alt={product.name}
            />
            <div>
              <h5 className="card-title">{product.brand}</h5>
              <p className="card-text">{product.country}</p>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => handleEdit(product)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProductList;

