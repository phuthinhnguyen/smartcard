import mysql from "mysql2/promise"

// create the connection to database
console.log("Creating connection pool...")

const pool = mysql.createPool({
    host: '151.106.124.151',
    user: 'u670685794_phuthinhnguyen',
    database: 'u670685794_smartcard',
    password: 'Mainhi1407'
})

// // simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     let rows= results.map((row) => {return row});
//     console.log(rows);
//   }
// );

export default pool;