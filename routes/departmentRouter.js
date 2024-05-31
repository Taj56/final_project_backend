import express from 'express';
import { addDepartment, getAllStations, getSingleDepartment, removeDepartment, updateDepartment } from '../controller/stationController.js';

export const departmentRouter = express.Router();

departmentRouter
.route('/')
.get(getAllStations)
.post(addDepartment)

departmentRouter
.route('/:id')
.get(getSingleDepartment)
.patch(updateDepartment)
.delete(removeDepartment)