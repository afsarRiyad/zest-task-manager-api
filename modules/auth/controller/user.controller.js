import sendEmail from "../../../services/email.services.js"
import User from "../models/user.model.js"

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
     sendEmail(newUser)
   } catch (error) {
     next(error)
   }
}

export default createUser;