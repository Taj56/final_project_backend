/**
 * Filename: incidentController.js
 * Description: This file is responsible for carrying out server logic
 * Developed By: Tajay Robertson
 * Date: 13/05/2024
 */

import {pool} from '../data/database.js';

const conn = pool;

/**
 * @description Retrieves all the reports from the database
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next Continuation Middleware function
 */
export const getAllReports = async (req, res, next)=>{
    let sqlQuery = `SELECT * FROM incident_report`;
    const [reports] = await conn.query(sqlQuery);

    res.status(200).json({
        status: 'success',
        results: reports.length,
        data: {reports}
    });
};


/**
 * @description Retrieves a single report from the database
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next Continuation Middleware function
 */
export const getSingleReport = async (req, res, next)=>{
    const id = req.params.id;
    let sqlQuery = `SELECT * FROM incident_report WHERE id = ?`;
    const [report] = await conn.query(sqlQuery, [id]);

    if(report.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not found'
        });
    }else {
        res.status(200).json({
            status: 'success',
            results: report.length,
            data: {report: report[0]}
        });
    };
};

/**
 * @description Adds a new report to the system
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next Continuation Middleware function
 */
export const createReport = async (req, res, next)=>{
    const data = req.body;
    let sqlQuery = `
    INSERT INTO incident_report
    (reported_by, reportee_contact, reportee_address, incident_type, incident_date, location, incident_description, witnesses)
    VALUES(?,?,?,?,?,?,?,?)
    `;

    const [report] = await conn.query(sqlQuery, [data.reported_by, data.reportee_contact, data.reportee_address, data.incident_type, data.incident_date, data.location, data.incident_description, data.witnesses]);

    res.status(201).json({
        status: 'success',
        recordID: report.insertId
    });
};

/**
 * @description Updates an existing record
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next Continuation Middleware function
 */
export const updateReport = async (req, res, next)=>{
    const id = req.params.id;
    const data = req.body;
    let sqlQuery = `
    UPDATE incident_report
    SET reported_by = ?, reportee_contact = ?, reportee_address = ?, incident_type = ?, incident_date = ?, location = ?, incident_description = ?, witnesses = ?
    WHERE id = ?
    `;
    const [report] = await conn.query(sqlQuery, [data.reported_by, data.reportee_contact, data.reportee_address, data.incident_type, data.incident_date, data.location, data.incident_description, data.witnesses, id]);

    if(report.affectedRows <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Bad request, could not update'
        });
    }else {
        res.status(404).json({
            status: 'success',
            affectedRows: report.affectedRows
        });
    };
};

/**
 * @description Removes a report from the system
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next Continuation Middleware function
 */
export const removeRecord = async (req, res, next)=>{
    const id = req.params.id;
    let sqlQuery = `DELETE FROM incident_report WHERE id = ?`;
    const [report] = await conn.query(sqlQuery, [id]);

    res.status(200).json({
        status: 'success',
        affectedRows: report.affectedRows
    });
};