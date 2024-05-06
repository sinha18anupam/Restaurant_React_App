import express from 'express';
import { postCard, getCards, updateCardQuantity, deleteCard,  } from '../Contex/CardContex.js';

const router = express.Router();

router.post('/post', postCard);
router.get('/get/:iduser', getCards);
router.put('/up/:cardid', updateCardQuantity);
router.delete('/del/:cardid', deleteCard);


export default router;
