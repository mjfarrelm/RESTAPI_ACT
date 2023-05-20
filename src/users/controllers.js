//import User model schema from the model.js file
const User = require("./model")
const jwt = require ("jsonwebtoken")


//code to create a the operations for creating and updating table data in thunder client
async function registerUser(req, res){
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
    })
    res.status(201).send({message:"User succesfully registered", user: req.body.username})
    } catch (error) {
        console.log(error)
        res.status(501).send({message: error.message})
    }
}


async function login(req, res){
    try {
    console.log("User succesfully logged in", req.body.username)
    res.status(200).send({message:"User logged in",username:req.body.username})
    } catch (error) {
        console.log(error)
        res.status(501).send({message: error.message}) 
    }
}



async function readUsers (req, res){
    try {
        const users = await User.find({})
        res.status(200).send({users: users})
    } catch (error) {
    console.log(error)
    res.status(501).send({message: error.message}) 
    }
 }



 async function updateUser(req, res){
    try {
        console.log(req.body.updateKey)
        console.log(req.body.updateValue)
        await User.updateOne(
            
                {username: req.body.username},
                {[req.body.updateKey]: req.body.updateValue}

        )
            res.status(200).send({message: "Profile successfully updated"})
    } catch (error) {
    console.log(error)
    res.status(501).send({message: error.message}) 
     }
}


 async function deleteUser(req, res){
     try {
        await User.deleteOne({username: req.body.username})
            res.status(201).send({message: "User succesfully deleted"})
     } catch (error) {
    console.log(error)
    res.status(501).send({message: error.message}) 
     }
 }


module.exports={registerUser, login, readUsers, updateUser, deleteUser}