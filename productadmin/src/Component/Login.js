import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Import your CSS file for styling

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginerror,setloginerror]= useState(false)
 
  const navigate = useNavigate();
  // Load user ID and username from local storage when component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const savedUsername = localStorage.getItem('username');
    if (userId) {
      // Do something with the user ID, such as navigating to a dashboard
      console.log('User ID found:', userId);
    }
    if (savedUsername) {
      // Do something with the saved username
      console.log('Username found:', savedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
        // Login
        const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
        localStorage.setItem('userId', true);
    
   
        const userData = localStorage.getItem('userId');
        if(userData){
        navigate('/home')
        }
      
    } catch (error) {
      console.error(error.response.data); // Handle error
      setloginerror(true)
    }
  };

  return (
    <>
     <div className='login'>
     
      <div className="auth-form-container">
        <h2>Admin Login</h2>
        {loginerror ? <p>Email and Password worng</p> : ''}
        <form onSubmit={handleSubmit} className="auth-form">
         
         
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
  
      </div>
      </div>
    </>
  );
};

export default Login;
