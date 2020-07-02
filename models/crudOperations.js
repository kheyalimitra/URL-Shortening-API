'use strict'

const pg = require("pg");
const config = require('../db/dbConfig.json');

const pool = new pg.Pool({
    user: config.db_dev.user,
    host: config.db_dev.host,
    database: config.db_dev.database,
    password: config.db_dev.password,
    port: config.db_dev.port
  });

module.exports = {
    // createTable:function(payload){
    //      data="Form data was inserted";
    //      return data;
    // },
    findByHash: async (hash) => {
        const client = await pool.connect();
        try {
            const queryString = `SELECT id, shortened_url, original_url FROM ${config.db_dev.table_name} WHERE hash=$1`;
            const response = await client.query(queryString, [hash]);
            return response.rows;
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release(true);
        }
    },

    getLongUrl: async (hash, short_url) => {
        const client = await pool.connect();
        try {
            const queryString = `SELECT original_url FROM ${config.db_dev.table_name} WHERE hash=$1`;
            const response = await client.query(queryString, [hash]);
            return response;
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release(true);
        }
    },

    // fetchrecords: () => {
    //     pool
    //     .connect()
    //     .then(client => {
    //         return client
    //             .query(`SELECT * FROM ${config.db_dev.table_name}`)
    //             .then(res => {
    //                 client.release();
    //                 console.log(res.rows[0]);
    //             })
    //             .catch(err => {
    //                 client.release(true);
    //                 console.log(err.stack);
    //             })
    //     })
    // },
    insertRecord: async (payload) => {
        // note: no need for try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect();
        const shortUrl = `${config.url_domain_dev}/${payload.hash}`;
        const queryString = `INSERT INTO ${config.db_dev.table_name} (original_url, shortened_url, hash) VALUES ($1, $2, $3)RETURNING id;`;
        try{
            await client.query('BEGIN');
            const response = await client.query(queryString, [payload.url, shortUrl, payload.hash]);
            await client.query('COMMIT');
            return {
                id: Number(response.rows[0].id),
                shortened_url: shortUrl,
                original_url: payload.url
            };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e
        } finally {
            client.release(true);
        }
           
      },
    deleteRecord:function(deleteId){
        const data= "Data was deleted by id: "+deleteId;
      return data; 
    }
  }