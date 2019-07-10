const express = require('express'),    
      colors = require('colors'),
      server = express(),
      refugeeRouter = require('./routes/refugeeRoute');

const PORT = process.env.PORT || 8000;

//server.use(express.static('public'));
server.use('/scripts', express.static(__dirname + '/node_modules/datamaps/dist/'));     // node modules are private
server.set('views', './views');
server.set('view engine', 'ejs');

server.use('/all', refugeeRouter.getAllData());
//server.use('/countries', refugeeRouter.getDestinations());

server.get('/', (req,res)=>{
    res.send(`
        <a href='/map'>map</a>
        <br/>
        <a href='/bar'>bar over time</a>
        <br/>
        <a href='/d3test'>d3 testing env</a>
        <br/>
        <a href='/countriesbar'>agg countrie total</a>
        <br/>
        `);
});

server.get('/map', (req, res)=>{
    //res.sendFile('map.html', {root:'./public'});
    res.render('map', {
        title: 'World Map'
    });
});

server.get('/bar', function (req,res){
    res.render('bar', {
        title: 'Bar Graph'
    });
});

server.get('/d3test', function (req,res){
    res.render('d3test', {
        title: 'd3 test env'
    });
});

server.get('/countriesbar', function (req,res){
    res.render('country-bar', {
        title: 'Bar Graph'
    });
});

server.listen(PORT,()=>{
    console.log(`Server is ALIVE on ${PORT}`.yellow);
});

