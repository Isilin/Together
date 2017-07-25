import express from 'express';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import index from './routes/index';
import facebook from './routes/facebook';
import twitter from './routes/twitter';

import template from './views/pages/index.ejs';
import error from './views/pages/error.ejs';

const server = express();

server.use(morgan('common'));
server.use(helmet());

server.set('views', path.join(__dirname, '../dist', 'www', 'views'));
server.set('view engine', 'ejs');
server.engine('.ejs', ejs.renderFile);

server.use(bodyParser.json());
server.use(bodyParser.json({type: 'application/vnd.api+json'}));
server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static(path.join(__dirname, '..', 'public')));
//server.use('/plugins', express.static(path.join(__dirname, '..', '..', 'node_modules')));

server.use('/', index);
server.use('/api/facebook', facebook);
server.use('/api/twitter', twitter);

server.get('*', function readFile(req, res) {
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), function (err, html) {
        if(err) {
                throw err;
        } else {
            res.status(200).send(template({'body': html}));
        }
    });
})

server.use(function (req, res, next) {
        var err = new Error('Not found');
        err.status = 404;
        err.content = "The cosmic object you are looking for has disappeared beyond the event horizon. ";
        next(err); 
});

server.use(function (err, req, res, next) {
        res.status(err.status || 500);
        err.stack = (err.content || err.stack);
        res.send(error({message: "An error occurred!", error: err}));
});

server.listen(5000, function () {
        console.log('Server listening on port 5000!');
});