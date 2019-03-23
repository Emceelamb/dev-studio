const SECRET        = require('../secrets'),
      express       = require('express'),
      cors          = require('cors'),
      refugeeRouter = express.router(),
      pgp           = require('pg-promise')();

const cn = {
    host     : SECRET.host,
    port     : SECRET.port,
    database : SECRET.db,
    user     : SECRET.un,
    password : SECRET.pw
}

refugeeRouter.all('*', cors());

const getRefugees = function() {
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

module.exports = {
    getRefugees: getRefugees
};

    

