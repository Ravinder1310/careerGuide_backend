// const { connect } = require("mongoose");
require("dotenv").config()
const mongoose = require("mongoose")

let connection = mongoose.connect(process.env.URL)

module.exports = {
    connection
}