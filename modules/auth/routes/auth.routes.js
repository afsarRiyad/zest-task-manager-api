import express from 'express';
import validate from "../../../middleware/validate.js";
import userSchema from "../schemas/auth.schema.js"
import createUser from '../controller/user.controller.js';

const router = express.Router()


router.post('/signup', validate(userSchema), createUser)

export default router