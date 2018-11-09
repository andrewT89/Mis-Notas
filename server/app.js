import path from 'path';
import express from 'express'
import bodyParser from 'body-parser'
import { question, auth } from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Request-With, Content-Type, Accept')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT, OPTIONS')
        next()
    })
}

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(process.cwd(), 'dist/platzi-overflow')));
}

app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app