import User from "../models/User.js";
import bcrypt from 'bcrypt'

const userController = {
    signUp: async(req,res) =>{
        try {
        const{user,password} = req.body

        const userFound = await User.findOne({user:user})

        if(userFound) throw new Error('user already exist')

        const hash = await bcrypt.hash(password,10)
        const newUser = new User({user: user,password:hash})
        await newUser.save()

        res.status(201).json({
            message:'User created.',
        })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    signIn: async(req,res) =>{
        const {user,password} = req.body
        const userFound = await User.findOne({user:user})

        if (!userFound){
            return res.status(400).json({message:'User or password not found.'})
        }

        const passwordMatch = await bcrypt.compare(password,userFound.password)

        if(!passwordMatch){
            return res.status(400).json({message:'User or password not found.'})
        }

        req.session.isLogged = true;
        req.session.userID = userFound._id
        req.session.name = userFound.user

        res.status(200).json({message:'logged.',isLogged:req.session.isLogged,userID:req.session.userID})
    },
    check: (req,res) =>{
        const {isLogged} = req.session

        if(isLogged){
            return res.status(400).json({message:'already logged'})
        }
    },
    logout: (req,res) =>{
        const {isLogged} = req.session
        if (!isLogged) return res.status(401).json({message:'you cant logout if you are not logged'})

        req.session.destroy(err => {
            if(err){
                return res.status(500).json({message:err})
            }
            res.clearCookie('connect.sid')
            return res.status(200).json({message: 'logout.'})
        })
    }
}

export default userController

