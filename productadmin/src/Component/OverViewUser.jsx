import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import './OverViewUser.css'

const OverViewUser = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/adderss/get/${user}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>    <div className='main-page'>
      <Navbar />
      </div>
      <div className="user-details-card">
        <h2>User Details</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">UserName:{userData.usname}</h5>
            <p className="card-text">Address: {userData.address}</p>
            <p className="card-text">Landmark: {userData.landmark}</p>
            <p className="card-text">Phone Number: {userData.phonenumber}</p>
            <p className="card-text">Alternate Phone Number: {userData.alphonenumber}</p>
            <p className="card-text">Zip Code: {userData.zipcode}</p>
         
        </div>
      </div>
    </div>
    </>

  );
};

export default OverViewUser