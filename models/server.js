const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //paths
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
            users: '/api/users'
        }

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

        //load files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listening() {
        this.app.listen(this.port, () => {
            console.log('running on port', this.port);
        })
    }

}

module.exports = Server;