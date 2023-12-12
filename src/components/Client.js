const mysql = require("mysql2/promise");
export default function Client(){
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jeketi'
    });
}