import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import './Navbar.css'
const Navbar = ({count}) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const userId = localStorage.getItem('userId');
    const savedUsername = localStorage.getItem('username');

    const fetchData = async () => {
        try {
         
            const response = await axios.get('http://localhost:5000/api/oder/get');
            if (response.data && response.data.products) {
                const filteredData = response.data.products.filter(item => item.status === 0);
                setNotificationCount(filteredData.length);
            } else {
                console.error('Data is not in expected format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [count]);

    const [showDropdown, setShowDropdown] = useState(false);
    const categories = ['Veg', 'Non Veg', 'Cake']
    const [notificationContent, setNotificationContent] = useState('');

    return (

        <>
        <div className="navbar">
            
        <p> <Link to="/home">Products <i class="fa-solid fa-bowl-food"></i></Link></p>  
        <p>  <Link to="/OverViewUser">OverViewUser<i class="fa-solid fa-clock-rotate-left"></i></Link></p>
        <p>  <Link to="/OrderOverview">OrderStatus<i class="fa-solid fa-clock-rotate-left"></i></Link></p>

         <p className='dropdownmenu'>       
    <span onClick={() => setShowDropdown(!showDropdown)}>Category <i className="fa-solid fa-arrow-right"></i></span>
    {showDropdown && (
        <ul className="dropdown">
                <p >
                    <li><Link to="/Veg">Veg</Link></li></p>
                 <p>  <li><Link to ="/NonVeg"> Non-veg</Link></li></p> 
                 <p> <li><Link to ="/Cake">cake</Link></li></p>
        </ul>
    )}
</p>  
 <p>  <Link to="/history">Order History<i class="fa-solid fa-clock-rotate-left"></i></Link></p>

        
        </div>
        <div className='navbar-top'>
            Admin Panel
            <div className='admin'>
            <Link to="/notify" className="notify-link">
    <i className="fa-regular fa-bell">({notificationCount})</i>
    <div className="notification-box">Notification content</div>


  </Link>    
  <div className='admin2'> Hi,{savedUsername} <i class="fa-solid fa-user"></i>
    </div>   
    </div>
  </div>
        </>
    );
};

export default Navbar;
