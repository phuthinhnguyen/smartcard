import mysql from "mysql2/promise"

// create the connection to database
console.log("Creating connection pool...")

const pool = mysql.createPool({
    host: '151.106.124.151',
    user: 'u670685794_phuthinhnguyen',
    database: 'u670685794_smartcard',
    password: 'Mainhi1407'
})

export default pool;