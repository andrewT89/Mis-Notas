import Debug from 'debug';
import app from './app'
import mongoose from 'mongoose';
import { mongoDB, port } from './config'

const debug = new Debug('platzi-overflow:root')

mongoose.Promise = global.Promise

async function dbStart() {
    await mongoose.connection.openUri(mongoDB, { useNewUrlParser: true, useCreateIndex: true, });
    debug('Base de Datos: \x1b[32m%s\x1b[0m', ' onLine');

    app.listen(port, () => {
        debug(`Server is running at port ${port}`)
    })
}

dbStart()