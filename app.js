/**
 * Filename: app.js
 * Description:
 * Developed By: Tajay Robertson
 * Date: 13/05/2024
 */

// IMPORT SECTION
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import { incidentRouter } from './routes/incidentRouter.js'
import { authRouter } from './routes/authRouter.js';
import { departmentRouter } from './routes/departmentRouter.js'

dotenv.config({path: 'config.env'})

const app = express();



app.options('*', cors(['http://localhost:4200']));
app.use(cors(['http://localhost:4200']));


// BODY PARCER
app.use(express.json({limit: '5kb'}));
app.use(express.urlencoded({extended: true, limit: '5kb'}));

if(process.env.NODE_ENV != 'production') app.use(morgan('dev'));

// ROUTE 
app.use('/api/v1/report', incidentRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/department', departmentRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`)
});