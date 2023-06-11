const mongoose = require("mongoose");

const connectMongo = async () => {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/imageDB');
    return db;
}

module.exports = connectMongo;
