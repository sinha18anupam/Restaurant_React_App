import express from 'express';
import { postProduct, getProduct, deleteProduct, updateProduct } from '../Contex/ProductContex.js';

const router = express.Router();

router.post('/post', postProduct);
router.get('/get', getProduct);
router.delete('/del/:productid', deleteProduct); 
router.put('/up/:productid', updateProduct); 

export default router;
