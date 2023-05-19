// Import mongoose and create class to use as a new instance.

const mongoose = require("mongoose");


//function to establish a connection to the mongoose package
async function connection(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successsfully connected to Mongoose DB")
    } catch (error) {
        console.log(error);
    }
}

//checks connection to ensure we can access the database
connection();

// //export connection to the database outside this file so it can be imported elsewhere
// module.exports = connection();