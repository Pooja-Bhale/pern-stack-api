const { Client } = require('pg');
var connectionString = "postgres://postgres:Admin101@localhost:5432/pernapi";
const client = new Client({
    connectionString: connectionString
});
module.exports = client;