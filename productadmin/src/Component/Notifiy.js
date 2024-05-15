import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Notify.css'
const Notifiy = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);
  // State to store loading state
  const [loading, setLoading] = useState(true);
  const [count,setcount] = useState(false)
  const fetchData = async () => {
    try {
      // Fetch data from the local server
      const response = await axios.get('http://localhost:5000/api/oder/get');
      // Check if response data contains a 'products' property
      if (response.data && response.data.products) {
        // Filter data based on the status property
        const filteredData = response.data.products.filter(item => item.status === 0);
        // Set the fetched and filtered data to state
        setData(filteredData);
        setcount(true)
      } else {
        console.error('Data is not in expected format:', response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    // Function to fetch data using Axios
   

    // Call the fetchData function when the component mounts
    fetchData();

    return () => {
      // Cancel ongoing requests (if any) when the component unmounts
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to handle accepting a product
  const handleAccept = async (oid) => {
    setcount(false)
    try {
      const status =true
      // Send a request to accept the product with the given productId
      await axios.put(`http://localhost:5000/api/oder/up/${oid}`,{status});
      // Refetch the data to update the UI
      fetchData();

    } catch (error) {
      console.error('Error accepting product:', error);
    }
  };

  return (
    <div>
   <Navbar count={count}/>
      {loading ? (
        <p>Loading...</p>
      ) : (-
        <div className='Notifytable'>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.reduce((acc, item) => {
              const existingIndex = acc.findIndex(row => row.userid === item.userid);
              if (existingIndex !== -1) {
                acc[existingIndex].orders.push(item);
              } else {
                acc.push({ userid: item.userid, orders: [item], addressShown: false });
              }
              return acc;
            }, []).map((group, index) => (
              <tr key={index}>
                <td>{group.userid}</td>
                <td>
                  <div className='orderCard'>
                    <div className='card1'>
                      {group.orders.map((order, orderIndex) => (
                        <div key={orderIndex} className='orderItem'>  
                          <div className='leftSection'>
                            <div>
                              <img src={order.img} alt={order.productname} style={{ width: '50px' }} />
                            </div>
                            <div>{order.productname}</div>
                            <div>Quantity: {order.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='middleSection'>
                      {(!group.addressShown) && (
                        <div className='orderaddress'>
                          <div>Address: {group.orders[0].address}</div>
                          <div>Landmark: {group.orders[0].landmark}</div>
                          <div>Phone Number: {group.orders[0].phonenumber}</div>
                          <div>Alternative Number: {group.orders[0].alphonenumber}</div>
                          <div>Zip Code: {group.orders[0].zipcode}</div>
                        </div>
                      )}
                    </div>
                    <button className='actionButton' onClick={() => handleAccept(group.orders[0].userid)}>Accept Order</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}
    </div>
      // <button onClick={() => handleAccept(group.orders[0].userid)}>Accept</button>
  );
};

export default Notifiy;
