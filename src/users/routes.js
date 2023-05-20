//import Router emthod from the express package library
const { Router } = require("express"); 

//renames router for use elsewhere
const userRouter = Router();

//imports the routes and content from the controllers file to be able to access in thunderclient when inputting records
const {registerUser, login, readUsers,updateUser, deleteUser} = require("./controllers");

//imports the hash password function from the middleware folder
const {hashThePassword, comparePasswords, validateEmail} = require("../middleware/index")

//creates file paths for the pages we want to access in thunder client
userRouter.post("/users/register", validateEmail, hashThePassword, registerUser)

userRouter.post("/users/login", comparePasswords, login)

userRouter.get("/users/readUsers", readUsers)

userRouter.put("users/updateUser", updateUser)

userRouter.delete("/users/deleteUser", deleteUser)


//exports all the work above from our userrouter for connecting to other files.
module.exports = userRouter;