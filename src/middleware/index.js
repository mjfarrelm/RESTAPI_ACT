
// Access the bcrypt package from package.json
const bcrypt = require("bcrypt");

//Access the email validator package from Json file
const validator = require("email-validator");

//Access the json web token library from the Json file
const jwt = require("jsonwebtoken");

//Access the User model from users folder, model file.
const User = require("../users/model");



//Middleware function to hash passwords in POST requests (registers user)
async function hashThePassword(req,res,next){
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
  
}


//Middleware function to compare plain text and hashed passwords for a user before logging in.
async function comparePasswords (req, res ,next){
    try {
        console.log("PLAIN TEXT PASSWORD")
        console.log(req.body.password)
        req.userInfo = await User.findOne({username: req.body.username})
        console.log("!!!!!!!")
        console.log(req.userInfo.password)
        console.log(req.body.password)

        if(req.userInfo && await bcrypt.compare(req.body.password, req.userInfo.password)) {
            next()
        } else {
            throw new Error ("username or password incorrect")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    } 
}

async function validateEmail (req, res , next) {
    try {
        if(validator.validate(req.body.email)){
            console.log("Email is valid")
            next()
        } else {
            throw new Error ("invalied email supplied. Please try again")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}


async function tokenCheck (req, res, next) {
    try {
        if(!req.header("Authorization")) {
            throw new Error("Unauthorised")
        }
        const token = req.header("Authorization")
     
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
   
        const user = await User.findById(decodedToken.id)
    
        if (!user) {
            throw new Error("user is not authorised")
        }
        req.authUser = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = {hashThePassword, comparePasswords, validateEmail, tokenCheck};