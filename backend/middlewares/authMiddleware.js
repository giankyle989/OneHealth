const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const Admin = require('../models/adminModel')


const protect = (model) => asyncHandler(async (req,res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await model.findById(decoded.id)
            next()
        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error("Not authorized,zzzzzz")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }

})


module.exports = {protect}