import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { FaCheck, FaTruck, FaBoxOpen } from 'react-icons/fa';
import Navbar from './Navbar';
import './OrderStatus.css';

const OrderStatus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orderstatus');
      if (response.data && response.data.orderStatus) {
        const orderStatusData = response.data.orderStatus;
        if (Array.isArray(orderStatusData) && orderStatusData.length > 0) {
          const uniqueUserIds = [...new Set(orderStatusData.map(item => item.userid))];
          setData(orderStatusData); // Use the unfiltered orderStatusData
          setSelectedUserIds(uniqueUserIds);
          setCount(true);
        } else {
          console.error('orderStatus array is empty or not an array');
        }
      } else {
        console.error('Data is not in expected format:', response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleToggle = async (addressid, options) => {
    try {
      console.log('runnings')
      await axios.put(`http://localhost:5000/api/orderstatus/${addressid}`, options);
      fetchData();
    } catch (error) {
      console.error('Error accepting products:', error);
    }
  };

  return (
<div>
      <Navbar count={count} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Status</h1>
          {selectedUserIds.map(userId => {
            const userAddress = data.find(item => item.userid === userId);

            return userAddress ? (
              <div className='main' key={userId}>
                <div className="address">
                  <div className='frist'>
                    <div>User ID: {userAddress.userid}</div>
                    <div>Address: {userAddress.address}</div>
                    <div>Landmark: {userAddress.landmark}</div>
                    <div>Phone Number: {userAddress.phonenumber}</div>
                    <div>Alternative Number: {userAddress.alphonenumber}</div>
                    <div>Zip Code: {userAddress.zipcode}</div>
                    <div>Status ID: {userAddress.statusid}</div>
                  </div>
                  <div className='toggle-buttons'>
                    <button className={`btn ${userAddress.perstatus ? 'red' : ''}`} onClick={() => handleToggle(userAddress.statusid, { perstatus: true, sendstatus: false, copmpletstatus: false})}><i class="fa-solid fa-check"></i></button>
                    <button className={`btn ${userAddress.sendstatus ? 'red' : ''}`} onClick={() => handleToggle(userAddress.statusid, { perstatus: true, sendstatus: true, copmpletstatus: false })}><i class="fa-solid fa-truck"></i></button>
                    <button className={`btn ${userAddress.copmpletstatus ? 'red' : ''}`} onClick={() => handleToggle(userAddress.statusid, { perstatus: true, sendstatus: true, copmpletstatus: true })}><i class="fa-solid fa-box-open"></i></button>
                  </div>
                </div>
                <div className="items1">
                  <div className="item-container2">
                    {data.filter(dataItem => dataItem.userid === userId).map((item, idx) => (
                      <div key={idx} className="item">
                        <img src={item.img} alt={item.productname} />
                        <div className='forpadding'>
                          <div>User ID: {item.userid},</div>
                          <div> {item.oid},</div>
                          <div>{item.productname},</div>
                          <div>Quantity: {item.quantity},</div>
                          <div>Price: {item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};



export default OrderStatus;