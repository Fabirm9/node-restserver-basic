const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //paths
        this.usersRoute = '/api/users';
        this.authRoute = '/api/auth';


        //connection Db
        this.connectDb();

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    async connectDb() {
        await dbConnection();
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
        this.app.use(this.authRoute, require('../routes/auth'));
        this.app.use(this.usersRoute, require('../routes/users'));
    }

    listening() {
        this.app.listen(this.port, () => {
            console.log('running on port', this.port);
        })
    }

}

module.exports = Server;