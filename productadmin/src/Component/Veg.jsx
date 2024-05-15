import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ConfirmationModal from './ConfirmationModal';
import Navbar from './Navbar';


const Veg = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const modalRef = useRef();
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/product/get');
          const allProducts = response.data.products;
          const vegProducts = allProducts.filter(product => product.catagorie === 'Veg');
          setProducts(vegProducts);
          setFilteredProducts(vegProducts);
          console.log(vegProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

    const handleFilterChange = (e) => {
      setFilterValue(e.target.value);
      const filtered = products.filter((product) =>
        product.productname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    const handleEdit = (product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
    };
  
    const handleDelete = (productId) => {
      const productToDelete = products.find(product => product.productid === productId);
      if (productToDelete) {
        setSelectedProduct(productToDelete);
        setIsConfirmationModalOpen(true);
      } else {
        console.error('Product not found');
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      if (files && files[0]) {
        // If the input is a file input and a file is selected
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: reader.result // Set the image data as base64 string
          }));
        };
        reader.readAsDataURL(files[0]); // Read the selected file as a data URL
      } else {
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value
        }));
      }
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        let updatedProduct = selectedProduct;
        if (selectedProduct.img instanceof File) {
          // If a new image file is selected
          const base64Img = await getBase64(selectedProduct.img);
          updatedProduct = { ...selectedProduct, img: base64Img };
        }
        await axios.put(`http://localhost:5000/api/product/up/${selectedProduct.productid}`, updatedProduct);
        setIsModalOpen(false);
        fetchData(); 
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  
    const handleDeleteConfirm = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/product/del/${selectedProduct.productid}`); 
        setIsConfirmationModalOpen(false);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      fetchData(); 
    };
  
    const stopPropagation = (e) => {
      e.stopPropagation();
    };
  
    // Function to convert image to base64 string
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    };
  
    return (
        <>
        <div className='nav'>
<Navbar/>
        </div>
      <div className="form-group1">
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message=""
        />
      
        <input className='filter'
          type="text"
          placeholder="Filter by product name"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Price</th>
              <th>Oldprice</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td><img src={product.img} alt={product.productname} /></td>
                <td>{product.productname}</td>
                <td>{product.productdec}</td>
                <td>{product.price}</td>
                <td>{product.oldprice}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button className='del' onClick={() => handleDelete(product.productid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" ref={modalRef} onClick={stopPropagation}>
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Edit Product</h2>
        <form onSubmit={handleUpdate}>
        {selectedProduct.img && (
              <img src={selectedProduct.img} alt="Product Preview" className="image-preview" />
            )}
          <div className="form-group">
            <label>Image File:</label>
            <input type="file" name="img" onChange={handleInputChange} />
          
         
           
            {selectedProduct.img instanceof File && (
              <span>{selectedProduct.img.name}</span>
            )}
          </div>
          <div className="form-group">
            <label>Product Name:</label>
            <input type="text" name="productname" value={selectedProduct.productname} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Product Description:</label>
            <textarea name="productdec" value={selectedProduct.productdec} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="text" name="price" value={selectedProduct.price} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Old Price:</label>
            <input type="text" name="oldprice" value={selectedProduct.oldprice} onChange={handleInputChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )}
  
      </div>
      </>
    );
  };
  

export default Veg