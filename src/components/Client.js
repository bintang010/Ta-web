const mysql = require("mysql2/promise");
export default function Client(){
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'adp050107',
        database: 'jeketi'
    });
}