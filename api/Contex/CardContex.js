import db from '../connect.js';

export const postCard = (req, res) => {
  const { product, iduser, quantity } = req.body;

  const insertQuery = 'INSERT INTO card (product, iduser, quantity) VALUES (?, ?, ?)';
  const values = [product, iduser, quantity];

  db.query(insertQuery, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Card created successfully', card: req.body });
    }
  });
};


export const getCards = (req, res) => {
    const { iduser } = req.params;
  
    const selectQuery = `
    SELECT card.*, product.*
    FROM card
    JOIN product ON card.product = product.productid
    WHERE card.iduser = ?
`    
  
    db.query(selectQuery, [iduser], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        return res.status(200).json({ products: results });
      }
    });
  };
  
  export const updateCardQuantity = (req, res) => {
    const { cardid } = req.params;
    const { quantity } = req.body;
  
    const updateQuery = 'UPDATE card SET quantity = ? WHERE cardid = ?';
    const values = [quantity, cardid];
  
    db.query(updateQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        return res.status(200).json({ message: 'Card quantity updated successfully' });
      }
    });
  };
  
  
export const deleteCard = (req, res) => {
  const { cardid } = req.params;

  const deleteQuery = 'DELETE FROM card WHERE cardid = ?';

  db.query(deleteQuery, [cardid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Card deleted successfully' });
    }
  });
};


