
import GetProduct from './GetProduct'
import AddProduct from './AddProduct'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Navbar from './Navbar';
const Home = ()=>{
    return(
        <div className="App">
       <Navbar/>
        <GetProduct/>
        </div>

    )

}

export default Home 