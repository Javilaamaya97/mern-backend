import mysql from "mysql2/promise"; // Usa promise para async/await

export const pool = mysql.createPool({
  host: "192.168.40.85", // IP de tu MariaDB
  user: "bloguser",
  password: "Collins10$",
  database: "blogdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

