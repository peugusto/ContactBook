export default function inputValidation(req,res,next){
    const {user,password} = req.body

    if (!user.trim() || !password.trim() ){
        return res.status(500).json({message:'All fields must be completed'})
    }

    if(password.trim().length < 7){
        return res.status(500).json({message: 'The password must be have 7 characters or more.'})
    }

    next()
}