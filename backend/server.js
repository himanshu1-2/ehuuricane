const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')
const { notFound, errorHandler } = require('./middleware/error')
const productRoutes = require('./routes/product')
const uploadRoutes = require('./routes/uploadRoutes.js')
const path = require('path')
dotenv.config()
require('./config/db')
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
