
// Access the bcrypt package from package.json
const bcrypt = require("bcrypt");

//Access the User model from users folder, model file.
const User = require("../users/model");

//Access the email validator package from Json file
const validator = require("validator");

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
        let userInfo = await User.findOne({username: req.body.username})
    

        if(userInfo && await bcrypt.compare(req.body.password, userInfo.password)) {
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
        if (validator.validate(req.body.email)){
            consolelog("Emai is valid")
            next()
        } else {
            throw new Error ("invalied email supplied. Please try again")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = {hashThePassword, comparePasswords, validateEmail};