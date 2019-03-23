const SECRET        = require('../secrets'),
      express       = require('express'),
      cors          = require('cors'),
      refugeeRouter = express.Router(),
      pgp           = require('pg-promise')();

const cn = {
    host     : SECRET.host,
    port     : SECRET.port,
    database : SECRET.db,
    user     : SECRET.un,
    password : SECRET.pw
}

const db = pgp(cn);

refugeeRouter.all('*', cors());

const getAllData = function() {
    refugeeRouter.route('/')
        .get(function (req,res){
            db.any("SELECT * FROM refugees")
                .then(function(data) {
                    res.send(data);
                })
                .catch(function(error){
                    console.log(error)
                });
        });
    return refugeeRouter;
};

const getDestinations = function() {
    refugeeRouter.route('/')
        .get(function (req,res){
            db.any("SELECT DISTINCT destination FROM refugees ORDER BY ASC")
                .then(function(data) {
                    res.send('data');
                })
                .catch(function(error){
                    console.log(error)
                });
        });
    return refugeeRouter;
};

module.exports = {
    getAllData      : getAllData,
    getDestinations : getDestinations
};

    
