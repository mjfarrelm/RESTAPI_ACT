//import User model schema from the model.js file
const User = require("./model")


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
    console.log("User succesfully logged in")
    } catch (error) {
        console.log(error)
        res.status(501).send({message: error.message}) 
    }
}



// // async function NEWFUNCHERE(req, res){
// //     try {

// //     } catch (error) {
//     console.log(error)
//     res.status(501).send({message: error.message}) 
// //     }
// // }



// // async function NEWFUNCHERE(req, res){
// //     try {

// //     } catch (error) {
//     console.log(error)
//     res.status(501).send({message: error.message}) 
// //     }
// // }


// // async function NEWFUNCHERE(req, res){
// //     try {

// //     } catch (error) {
//     console.log(error)
//     res.status(501).send({message: error.message}) 
// //     }
// // }

module.exports={registerUser, login}