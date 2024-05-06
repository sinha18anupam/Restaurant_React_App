import mysql from 'mysql';
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deadpool6@',
    database: 'product'
  });

  export default db