require('dotenv/config');

module.exports = {
    auth_password: process.env.APP_SECRET,
    auth_expiresIn: '5d'
}