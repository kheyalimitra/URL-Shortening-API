'use strict'

const Pool = require("pg");
const config = require('../db/dbConfig.json');

const pool = new Pool({
    user: config.dev.user,
    host: config.dev.host,
    database: config.dev.database,
    password: config.dev.password,
    port: config.dev.port
  });

module.exports = {
    // createTable:function(payload){
    //      data="Form data was inserted";
    //      return data;
    // },
    fetchrecords: () => {
        pool
        .connect()
        .then(client => {
            return client
                .query(`SELECT * FROM ${config.dev.table_name}`)
                .then(res => {
                    client.release()
                    console.log(res.rows[0])
                })
                .catch(err => {
                    client.release()
                    console.log(err.stack)
                })
        })
    },
    insertRecord:function(payload){
        const data="data was fetched";
        return data;   
      },
    fetchByHash:function(query){
        const data="data was fetched";
      return data;   
    },
    deleteRecord:function(deleteId){
        const data= "Data was deleted by id: "+deleteId;
      return data; 
    }
  }