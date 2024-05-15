import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AddProducts.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    img: '',
    productname: '',
    productdec: '',
    price: '',
    oldprice: '',
    catagorie: '', // New state for category
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prevData) => ({ ...prevData, img: reader.result }));
    };
    reader.onerror = () => {
      console.error('Error reading the file');
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/product/post', formData);
      alert('Product added successfully');
      setFormData({
        img: '',
        productname: '',
        productdec: '',
        price: '',
        oldprice: '',
        catagorie: '', // Reset category after submission
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.img && (
                  <img src={formData.img} alt="Product Preview" className="image-preview" />
                )}
              </div>
              <div className="form-group">
                <label>Product Name:</label>
                <input type="text" name="productname" value={formData.productname} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Product Description:</label>
                <textarea name="productdec" value={formData.productdec} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Old Price:</label> {/* Changed from Overprice */}
                <input type="text" name="oldprice" value={formData.oldprice} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select name="catagorie" value={formData.catagorie} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Veg">Veg</option>
                  <option value="Cake">Cake</option>
                  <option value="Much More">Much More</option>
                </select>
              </div>
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
