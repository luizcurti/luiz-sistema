const mysql = require('mysql2');

const configs = {
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
  connectionLimit: 10,
};

const pool = mysql.createPool(configs);

const DBClient = {
  getConnection: async () => {
    const conn = await pool.promise().getConnection();
    conn.release();
    return conn;
  },
};

module.exports = {
  DBClient,
};
