const SECRET = require('./secrets');   // my secrets ;)
const express = require('express');    
const promise = require('bluebird');   // promises package
const colors = require('colors');
const server = express();

const initOptions = {                  // promise init
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions); // pkg for postgresql

const cn = {                           // postgres config
    host     : SECRET.host,            // if running locally instantiate psql with host option 
    port     : SECRET.port,
    database : SECRET.db,
    user     : SECRET.un,
    password : SECRET.pw
};

const db = pgp(cn);

let fetchdb = db.any('SELECT * FROM refugees')
    .then(data => {
        //console.log('DATA: ', data);
        return data;
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    .finally(db.$pool.end);

// EXPRESS STUFF

const PORT = process.env.PORT || 8000;

server.get('/', (req, res)=>{
    res.send(fetchdb);
});

console.log(`Server is ALIVE on ${PORT}`.yellow);
server.listen(PORT);

