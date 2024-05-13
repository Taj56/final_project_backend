import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}).promise();