
import db from '../connect.js';

const UserModel = {};

UserModel.create = (email, password) => {
  return new Promise((resolve, reject) => {
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const values = [email, password];
    console.log(values)

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

UserModel.findOne = (email) => {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    db.query(selectQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.length === 0) {
        resolve(null);
        return;
      }
      resolve(result[0]);
    });
  });
};

export default UserModel;
