const bcrypt = require('bcryptjs')
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Kai',
        email: 'kai@dranzer.com',
        password: bcrypt.hashSync('123456', 10),

    }, {
        name: 'Saskuke',
        email: 'saskuke@sharigan.com',
        password: bcrypt.hashSync('123456', 10),

    },
]
module.exports = users
