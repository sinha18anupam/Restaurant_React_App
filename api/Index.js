// Server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Products from './Routs/ProductRouts.js';
import Card from './Routs/CardRouts.js'
import authRoute from './Routs/userRouts.js'
import Address from './Routs/AddressRouts.js'
import Oder from './Routs/OderRoute.js'
import Log from './Routs/LoginRouts.js'; // Import the login routes
import Status from './Routs/OderstatusRoute.js'

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], 
    credentials: true // Enable CORS credentials
}));

app.use(express.json({ limit: '50mb' }));

app.use('/api/product', Products);
app.use('/api/card', Card);
app.use('/api/adderss', Address);
app.use('/api/oder', Oder);
app.use('/api/admin', Log); 
app.use('/api', Status);// Use the login routes
app.use(bodyParser.json());

app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
