import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notifiy from './Component/Notifiy';
import Login from './Component/Login';
import Home from './Component/Home';
import { useEffect, useState } from 'react';
import OderHistory from './Component/OderHistroy';
import Veg from './Component/Veg';
import NonVeg from './Component/NonVeg';
import OverViewUser from './Component/OverViewUser';
import OrderOverview from './Component/OrderOverview';
import Cake from './Component/Cake';
// import Navbar from './Component/Navbar';
function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    
    // Load user data from local storage when component mounts
    const userData = localStorage.getItem('userId');
    setUser(userData);
  }, []); // Run only once when component mounts

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        </Routes>
 
        <Routes>
        {user && <Route path="/home" element={<Home  />} />}
        {user && <Route path="/notify" element={<Notifiy   />} />}
        {user && <Route path="/history" element={<OderHistory   />} />}
        {user && <Route path="/Veg" element={<Veg/>} />}
        {user && <Route path="/NonVeg" element={<NonVeg/>} />}
        {user && <Route path="/OverViewUser" element={<OverViewUser/>} />}
        {user && <Route path="/OrderOverview" element={<OrderOverview/>} />}
        {user && <Route path="/Cake" element={<Cake/>} />}

        </Routes>
    </div>
  </Router>
  );
}

export default App;
