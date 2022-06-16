const Sequelize = require("sequelize");

// creating the auth url
const url = `postgres://${process.env.SAMPLEDB_USER}:${process.env.SAMPLEDB_PASSWORD}@
${process.env.SAMPLEDB_ADDRESS}:${process.env.SAMPLEDB_PORT}/${process.env.SAMPLEDB_NAME}`;
// creating the db instance
const sampledb = new Sequelize(url, {
    logging: false,
    dialect: 'postgres',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    },
});

// import the models and append them to the db instance
var db = {}
const sampledbModels = require("./sampledb")(sampledb, Sequelize)
db = { ...sampledbModels }
db.sampledb = sampledb;

module.exports = db;
