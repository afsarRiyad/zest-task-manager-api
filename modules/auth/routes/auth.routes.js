import express from 'express';
import validate from "../../../middleware/validate.js";
import User from "../models/user.model.js"
import userSchema from "../schemas/auth.schema.js"

const router = express.Router()

const createUser = async (req, res, next) =>{
   try {
     const { name, email, password} = req.body
     const newUser = await User.create({
        name,
        email,
        password
     })
     res.status(200).json({
        success: true,
        message: "user created successfully",
        data: newUser
     })
   } catch (error) {
     next(error)
   }
}

router.post('/signup', validate(userSchema), createUser)

export default router