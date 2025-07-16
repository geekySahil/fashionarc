const mongoose = require('mongoose');
const User = require('../../models/auth/auth-model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const {username, email , password} = req.body;

    if(!username || !email || !password){
        return res.json({
            message: 'All fields are required ',
            success: false
        })
    }

   try {
     const existingUser = await User.findOne({username: username, email: email})

 
     if(existingUser){
         return res.json({
             message: 'user already exists with this email try another email ',
             success : false,
         })
     }

 
     const hashedPassword = await bcrypt.hash(password, 10)
 
     const newUser = new User({
         username: username , 
         email : email,
         password: hashedPassword
     })
 
     await newUser.save({validateBeforeSave: false})
 
     return res.status(200).json({
         message: 'user registered successfully ',
         success: true , 
 
     })
   } catch (error) {
        res.status(500).json({
            message: error.message,
            status: error.status
        })    
   }
}

const loginUser = async (req, res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.json({
            message: 'Missing email or password',
            success: false
        })
    }

   try {
     const existingUser = await User.findOne({email: email})
 
     if(!existingUser){
         return res.json({
             message: 'user does not exist ',
             success : false,
         })
     }
 
     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
     
     if(!isPasswordCorrect){
        return res.json({
            message: 'Incorrect Password',
            success: false,
        })
     }
 
     const token = await jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        username: existingUser.username

     }, 'CLIENT_SECRET_KEY', {expiresIn: '60m'})

    
     return res.cookie('token', token, {httpOnly: true, secure: false }).status(200).json({
         message: 'user logged in successfully ',
         success: true , 
         user: {
            id: existingUser._id,
            role: existingUser.role,
            email: existingUser.email,
            username: existingUser.username
        }
    })
   } catch (error) {
        res.status(500).json({
            success: false , 
            message: error.message,
        })    
   }
}



// auth middleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token


    if(!token){
        return res.json({
            message: 'Unauthorised user', 
            success: false
        })
    }

    try {
        const decodedToken = await jwt.verify(token, 'CLIENT_SECRET_KEY')
    
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(401).json({
            message: 'unauthorized user ',
            success: false 
        })
    }
}

// logout 

const logoutUser = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully'
    })
}

module.exports = {loginUser, registerUser,authMiddleware, logoutUser}