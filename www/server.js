'use strict';

import * as http from 'http';

class Server
{
    constructor ()
    {
        this._server = http.createServer(function (request, result) {
            result.writeHead(200);
            result.end('<h1>Hello World!</h1>');
        });
    }

    start () {
        this._server.listen(5000);
    }
}

let server = new Server();
server.start();