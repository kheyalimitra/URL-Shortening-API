'use strict'

const pg = require("pg");
const config = require('./dbConfig.json');

class ModelOperations {
    constructor() {
        this.pool = new pg.Pool({
            user: config.db_prod.user,
            host: config.db_prod.host,
            database: config.db_prod.database,
            password: config.db_prod.password,
            port: config.db_prod.port
          });
    }
    async findByHash(hash) {
        const client = await this.pool.connect();
        try {
            const queryString = `SELECT id, shortened_url, original_url FROM ${config.db_prod.table_name} WHERE hash=$1`;
            const response = await client.query(queryString, [hash]);
            return response.rows;
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release(true);
        }
    }
    async getLongUrl(hash) {
        const client = await this.pool.connect();
        try {
            const queryString = `SELECT original_url FROM ${config.db_prod.table_name} WHERE hash=$1`;
            const response = await client.query(queryString, [hash]);
            return response;
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release(true);
        }
    }
    async insertRecord(payload) {
        // note: no need for try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await this.pool.connect();
        const shortUrl = `${config.url_domain_dev}/${payload.hash}`;
        const queryString = `INSERT INTO ${config.db_prod.table_name} (original_url, shortened_url, hash) VALUES ($1, $2, $3)RETURNING id;`;
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
           
      }
}

module.exports = ModelOperations;