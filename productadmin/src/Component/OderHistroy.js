import axios from 'axios';
import './OrderHistory.css'
import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
const OderHistory = ({count}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/oder/get');
            if (response.data && response.data.products) {
                // Filter data based on item.status === 1
                const successData = response.data.products.filter(item => item.status === 1);
                setData(successData);
            } else {
                console.error('Data is not in expected format:', response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const uniqueUserIds = [...new Set(data.map(item => item.userid))];

    return (
        <div>
           <Navbar/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='historytable'>
                {uniqueUserIds.map(userId => {
                  const userOrders = data.filter(item => item.userid === userId);
                  const firstOrder = userOrders[0]; // Assuming there's at least one order per user
          
                  return (
                    <div key={userId} className='historycard'>
                      {/* Left side */}
                      <div className='leftSide'>
                        <div>User ID: {firstOrder.userid}</div>
                        <div>Name: {firstOrder.name}</div>
                        <div>Address: {firstOrder.address}</div>
                        <div>Landmark: {firstOrder.landmark}</div>
                        <div>Phone Number: {firstOrder.phonenumber}</div>
                        <div>Alternate Phone Number: {firstOrder.alphonenumber}</div>
                      </div>
                      {/* Right side */}
                      <div className='rightSide'>
                        <div className='orderSummary'>Order Summary</div>
                        {userOrders.map((order, index) => (
                          <div key={index}>
                            <div>Item Name: {order.productname}</div>
                            <div>Price: {order.price}</div>
                            <div>Quantity: {order.quantity}</div>
                            <div>Total: {order.price * order.quantity}</div>
                          </div>
                        ))}
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
          
            )}
        </div>
    );
};

export default OderHistory;
