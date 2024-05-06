import db from '../connect.js';

export const postProduct = (req, res) => {
  const { img, productname, productdec, price, oldprice, catagorie } = req.body; // Fixed typo catagorie -> category

  const insertQuery = 'INSERT INTO product (img, productname, productdec, price, oldprice, catagorie) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [img, productname, productdec, price, oldprice, catagorie]; // Fixed typo catagorie -> category

  db.query(insertQuery, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Product created successfully', product: req.body });
    }
  });
};

export const getProduct = (req, res) => {
  const selectQuery = 'SELECT * FROM product';

  db.query(selectQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ products: results });
    }
  });
};

export const deleteProduct = (req, res) => {
  const { productid } = req.params;

  const deleteQuery = 'DELETE FROM product WHERE productid = ?';

  db.query(deleteQuery, [productid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Product deleted successfully' });
    }
  });
};

export const updateProduct = (req, res) => {
  const { productid } = req.params;

  const { img, productname, productdec, price, oldprice, catagorie } = req.body; // Fixed typo catagorie -> category

  const updateQuery = 'UPDATE product SET img=?, productname=?, productdec=?, price=?, oldprice=?, catagorie=? WHERE productid=?'; // Added missing ? for productid
  const values = [img, productname, productdec, price, oldprice, catagorie, productid]; // Fixed typo catagorie -> category

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Product updated successfully' });
    }
  });
};
