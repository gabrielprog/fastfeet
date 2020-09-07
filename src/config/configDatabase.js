require('dotenv/config');

module.exports = {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
};
