const express = require('express'),    
      colors = require('colors'),
      server = express(),
      refugeeRouter = require('./routes/refugeeRoute');

const PORT = process.env.PORT || 8000;

server.use(express.static('public'));
server.use('/scripts', express.static(__dirname + '/node_modules/datamaps/dist/'));     // node modules are private

server.use('/all', refugeeRouter.getAllData());
server.use('/destinations', refugeeRouter.getDestinations());

server.get('/', (req,res)=>{
    res.send('Hi, guy.');
});

server.get('/map', (req, res)=>{
    res.sendFile('map.html', {root:'./public'});
});

server.listen(PORT,()=>{
    console.log(`Server is ALIVE on ${PORT}`.yellow);
});

