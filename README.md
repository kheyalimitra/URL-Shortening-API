# URL-Shortening-API

### Functional Requirements
 - This API takes a URL, validate the URL, and return a JSON object containing the id of the shortened URL as well as the shortened URL 
 - Expose an endpoint that will redirect a user from a shortened URL to the real URL 
 - Expose an endpoint that can use the hash of the URL to look up and return information about the URL including its id, the shortened URL and the original URL.

### Shorten URL Endpoint 
 - Takes a URL as input e.g. http://somewebsite.com , stores the full and shortened URL in the DB, and returns a JSON payload.
 - Sample Output
`{
"id" : 1234,
"shortened_url" : "http://3.128.179.103/sY4",
"original_url" : "http://somewebsite.com" }`

### Redirect Endpoint
The shortened URL will redirect to the real URL, e.g. http://3.128.179.103/sY4 redirects to http://somewebsite.com

### Retrieve URL Info Endpoint
Querying the hash of the URL will return it’s details. e.g. http:3.128.179.103/sY4 returns:
`{
"id" : 1234,
"shortened_url" : "http:3.128.179.103/sY4",
"original_url" : "http://somewebsite.com" }`

### Try out in swagger UI : 
 - http://ec2-3-128-179-103.us-east-2.compute.amazonaws.com/api-docs/

## Implementation Details:
 - The service is implemented in node.js
 - The service is backed by a Postgres database
 - The service is hosted in AWS and accessible online
 ### Project Structure
    ├── src/
    │   ├── db/
    |   |.   |-- scripts/createTable
    |   |    |-- dbConfig.json
    |.  |.   |-- ModelOperations.js
    │   ├── services
    |   |  |-- urlShorteningService.js 
    |   |-- utils/ hashGenerator.js
    │   └── api/routes
    │       ├── index.js
    │ 
    │      
    ├── public/api-docs
    |__ test
    |.  |-- unit/ 
    |.  |-- api/
    └── app.js
    |__ package.json
  
 
## Dependencies:
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "crypto-js": "^4.0.0",
    "express": "^4.17.1",
    "pg": "^8.2.1",
    "swagger-jsdoc": "^1.3.0",
    "swagger-ui-express": "4.1.4",
    "validator": "^13.1.1"

- Details: 
   - <b>body-parser</b> to help parse jsn request object by express server
   - <b>cors</b> to allow Cross-Origin Resource Sharing (CORS) 
   - <b>crypto-js</b> to generate MD5 Hash of given url 
   - <b>express</b> as server
   - <b>pg</b> as postgres client
   - <b>swagger-jsdoc</b> to write swagger api docs 
   - <b>swagger-ui-express</b> to implement swagger ui
   - <b> validator </b> to help validate given url 
   
   ### Dev Dependencies:
      "chai": "^4.2.0",
      "jest": "^26.1.0",
      "chai-http": "^4.3.0",
      "mocha": "^8.0.1"

   - Details: 
     - <b>chai, chai-http, jest, mocha</b> to help write unit test and integration test
     
  ## AWS Infrastructure: 
  - EC2 
  - AWS RDS (postgresql)
  
  ## Config setup 
  The main config is related to database connection. There is a file called `dbConfig.json` which looks like below: 
  
   "user": "",
   
    "host": "XXXXX",
    
    "database": "",
    
    "password": "",
    
    "port": "5432",
    
    "table_name": ""
    
  In order to run from EC2 instance or in local. These values need to be filled and saved. 
  
  ## Run and Test
  -  To run from local 
  `npm start`
  -  To run test 
  `npm test`
  
  
