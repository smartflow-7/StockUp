import express from 'express'
import { signIn,signUp,adminLogin } from '../controllers/userControllers.js'


const userRoute = express.Router()


userRoute.post('/signin', signIn)
userRoute.post('/signup', signUp)
userRoute.post('/adminlogin', adminLogin)


export default userRoute