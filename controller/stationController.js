/**
 * Filename: incidentController.js
 * Description: This file is responsible for carrying out server logic
 * Developed By: Tajay Robertson
 * Date: 13/05/2024
 */

import { pool } from "../data/database.js";

const conn = pool;

export const getAllStations = async (req, res, next)=>{
    let sqlQuery = `SELECT * FROM police_dep`;
    const [results] = await conn.query(sqlQuery);

    res.status(200).json({
        status: 'success',
        results: results.length,
        data: {results}
    });
};

export const getSingleDepartment = async (req, res, next)=>{
    const id = req.params.id;
    let sqlQuery = `SELECT * FROM police_dep WHERE id = ?`;
    const [result] = await conn.query(sqlQuery, [id]);

    if(result.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not found.'
        })
    }else {
        res.status(200).json({
            status: 'success',
            result: result.length,
            data: {result: result[0]}
        })
    }
}

export const addDepartment = async (req, res, next)=>{
    const data = req.body;
    let sqlQuery = `
    INSERT INTO police_dep
    (department_name, parish)
    VALUES(?,?)
    `;

    const [department] = await conn.query(sqlQuery, [data.department_name, data.parish]);

    res.status(201).json({
        status: 'success',
        recordID: department.insertId
    });
};

export const updateDepartment = async (req, res, next)=>{
    const id = req.params.id;
    const data = req.body;
    let sqlQuery = `
    UPDATE police_dep
    SET department_name = ?, parish = ?
    WHERE id = ?
    `;
    const [department] = await conn.query(sqlQuery, [data.department_name, data.parish, id]);

    if(department.affectedRows <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Bad request, could not update'
        });
    }else {
        res.status(200).json({
            status: 'success',
            affectedRows: department.affectedRows
        });
    };

}

export const removeDepartment = async (req, res, next)=>{
    const id = req.params.id;
    let sqlQuery = `DELETE FROM police_dep WHERE id = ?`;
    const [department] = await conn.query(sqlQuery, [id]);

    res.status(200).json({
        status: 'success',
        affectedRows: department.affectedRows
    })
}