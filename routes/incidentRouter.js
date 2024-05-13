import express from 'express';
import { createReport, getAllReports, getSingleReport, removeRecord, updateReport } from '../controller/incidentController.js';

export const incidentRouter = express.Router();

incidentRouter
.route('/')
.get(getAllReports)
.post(createReport)

incidentRouter
.route('/:id')
.get(getSingleReport)
.patch(updateReport)
.delete(removeRecord)