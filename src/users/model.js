//import mongoose package
const mongoose = require ("mongoose");

//set up the content of the table using mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

//set up User model to represent table layout from above
const User = mongoose.model("user", userSchema);

//export User model for us in other files
module.exports = User;