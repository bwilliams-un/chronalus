/**
 * Module B
 * This assumes you're not using pure modules and instead are using a service module style
 */

const lifecycle = require('../lib/index');
const http = require('http');

class ModuleB {
    start() {
        lifecycle.on('startup', 'ModuleB', this.init.bind(this));
        lifecycle.on('shutdown', this.shutdown.bind(this));
    }

    init() {
        console.log('Module B initialization...');

        this.server = http.createServer((req, res) => {
            const data = 'OK';
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Length': Buffer.byteLength(data)
            });
            res.end(data);
        });

        this.server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });

        this.server.listen(8080, () => {
            console.log('Module B listening on port 8080');
            lifecycle.done('startup', 'ModuleB');
        });
    }

    shutdown() {
        if (this.server) {
            console.log('Module B is closing server...');
            this.server.close(() => {
                console.log('Module B server closed.');
            });
        }
    }
}

module.exports = new ModuleB;