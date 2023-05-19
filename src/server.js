//import express, dotenv packages to be used & set up an app to run the express package.

const express = require("express");
require("dotenv").config();
const app = express();

//Adds the port number that is currently stored in the dotenv file.
const port = process.env.PORT;

//import Routes file to be accessed
const userRouter = require("./users/routes")

//establish JSON as the method we will use for sending requests in the body of thunderclient requests
app.use(express.json());

//Makes use of the User Router file imported above.
app.use(userRouter);

//establish a health check for the database (via thunder client) to make sure we are connected to the API
app.get("/health", (req, res) => {
    res.status(200).send({message: "API is working"})
})

//establish connection to the connections file in the DB folder to be able to run the mongoose application
require("./db/connections");

//check whether the port  is being connected to.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
