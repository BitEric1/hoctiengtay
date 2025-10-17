require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))
const translateRouter = require('./routes/router.translate.js')
const courseRouter = require('./routes/route.course.js')

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173/', 'http://localhost:3001/'],
    credential: true,
}

app.get('/', (req, res) => res.send('Home page'))
app.get('/api/v1/health', cors(corsOptions), (_, res) => res.send({ ok: true }))
app.use('/api/v1', translateRouter)
app.use('/api/v1/courses', courseRouter)

// Global Error Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    console.error('ERROR:', err)
    const status = err.status || err.statusCode || 500
    res.status(status).json({
        ok: false,
        message: err.message || 'Internal Server Error',
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
