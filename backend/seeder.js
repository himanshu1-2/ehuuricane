const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/user')
const products = require('./data/products')
const Order = require('./models/order')
const Product = require('./models/product')
const User = require('./models/user')
dotenv.config()
require('./config/db')

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('data imported')
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if (process.argv[2] === '-d') { destroyData() }
else {
    importData()
}