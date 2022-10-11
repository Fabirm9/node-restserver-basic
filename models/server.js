const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoute = '/api/users'


        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    middlewares() {
        //CORs
        this.app.use(cors());

        // read parse body
        this.app.use(express.json());

        //folder public
        this.app.use(express.static('public'));


    }

    routes() {

        this.app.use(this.usersRoute, require('../routes/users'))
    }

    listening() {
        this.app.listen(this.port, () => {
            console.log('running on port', this.port);
        })
    }

}

module.exports = Server;