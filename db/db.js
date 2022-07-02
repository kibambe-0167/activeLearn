// const mysql_ = require("mysql2/promise");
import mysql from "mysql2/promise";
import connect from "./config.js";

// get all rows from database
async function getAll() {
    try {
        const conn = await connect();
        let q = 'SELECT * FROM aldata limit 20';
        const connection = await mysql.createConnection(conn);
        const [result, ] = await connection.execute(q);
        return result;
    } catch (err) {
        return err
    }
}
// add data to table
export async function addData(data) {
    let q = `INSERT INTO aldata(name) VALUES('${data}')`;
    const connection = await mysql_.createConnection(config.db);
    const result = await connection.execute(q);
    // console.log(result[0].affectedRows);
    if (result[0].affectedRows) {
        return "1";
    } else {
        return "Error Adding Data";
    }
}
// delete data from table.
export async function deleteData(id) {
    let q = `DELETE FROM aldata WHERE id='${id}'`;
    const connection = await mysql_.createConnection(config.db);
    const result = await connection.execute(q);
    // console.log(result);
    if (result[0].affectedRows) {
        return "1";
    } else {
        return "Error Deleting Data";
    }
}
// update data in the table.
export async function updateData(id, data) {
    let q = `UPDATE aldata SET name='${data}' WHERE id='${id}'`;
    const connection = await mysql_.createConnection(config.db);
    const result = await connection.execute(q);
    // console.log(result);
    if (result[0].affectedRows) {
        return "1";
    } else {
        return "Error Updating Data";
    }
}

export default getAll;


// module.exports = {
//     getAll,
//     addData,
//     deleteData,
//     updateData,
// }