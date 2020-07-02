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
        // note: no need for try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect();
        const queryString = `INSERT INTO ${config.dev.table_name} (long_url, short_url, hash) VALUES ($1, $2, $3)RETURNING id;`;
        try{
            await client.query('BEGIN');
            const response = await client.query(queryString, [payload.url, payload.shortUrl, payload.hash]);
            await client.query('COMMIT');
            return {
                id: Number(response.rows[0].id),
                shortened_url : payload.shortUrl,
                original_url: payload.url
            };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e
        } finally {
            client.release()
        }
           
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