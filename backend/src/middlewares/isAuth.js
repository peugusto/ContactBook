export default function isAuth(req,res,next){
    const {isLogged} = req.session;

    if(!isLogged) return res.status(500).json({message:'User not authenticated'})

    next()
}