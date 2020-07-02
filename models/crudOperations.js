'use strict'

const pg = require("pg");
const config = require('../db/dbConfig.json');

const pool = new pg.Pool({
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
    insertRecord: async (payload) => {
        const queryString = `INSERT INTO ${config.dev.table_name}(long_url, short_url, hash, created_at) VALUES (${payload.url}, ${payload.short_url}, ${payload.hash}, ${process.hrtime()})`;
        const result = await pool.query(queryString);
        return result;   
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