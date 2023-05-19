//import Router emthod from the express package library
const { Router } = require("express"); 

//renames router for use elsewhere
const userRouter = Router();

//imports the routes and content from the controllers file to be able to access in thunderclient when inputting records
const {registerUser, login} = require("./controllers");

//imports the hash password function from the middleware folder
const {hashThePassword, comparePasswords} = require("../middleware/index")

//creates file paths for the pages we want to access in thunder client
userRouter.post("/users/register",hashThePassword, registerUser)

userRouter.post("/users/login", comparePasswords, login)


//exports all the work above from our userrouter for connecting to other files.
module.exports = userRouter;