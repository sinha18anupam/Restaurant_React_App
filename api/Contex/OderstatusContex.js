import db from '../connect.js';

export const postOrderStatus = (req, res) => {
    const { perstatus, sendstatus, completstatus, idoid } = req.body; // Fixed typo catagorie -> category
  
    const insertQuery = 'INSERT INTO oderstatus (perstatus, sendstatus, completstatus, idoid) VALUES (?, ?, ?, ?)';
    const values = [perstatus, sendstatus, completstatus,idoid]; // Fixed typo catagorie -> category
  
    db.query(insertQuery, values, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        return res.status(200).json({ message: 'Order status created successfully', orderStatus: req.body });
      }
    });
};

export const getOrderStatus = (req, res) => {
  
    const selectQuery = `
    SELECT oderstatus.*, oderlist.*
    FROM oderstatus
    JOIN oderlist ON oderstatus.idoid = oderlist.oid
  ;`

    db.query(selectQuery,  (err, results) => { // Pass oid as parameter
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json({ orderStatus: results });
        }
    });
};

export const updateOrderStatus = (req, res) => {
    const { statusid } = req.params;
    const { perstatus, sendstatus, copmpletstatus } = req.body;

    const updateQuery = 'UPDATE oderstatus SET perstatus=?, sendstatus=?, copmpletstatus=? WHERE statusid=?'; // Fix query to use statusid
    const values = [perstatus, sendstatus, copmpletstatus, statusid]; // Use statusid from parameters

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json({ message: 'Order status updated successfully' });
        }
    });
};
