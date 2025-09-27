export default function contactValidation(req,res,next){
    const {name,phone,address} = req.body

    if (!name.trim() || !phone.trim() ){
        return res.status(500).json({message:'All fields must be completed'})
    }

    if(phone.trim().length < 9){
        return res.status(500).json({message: 'The phone must be have 9 characters or more.'})
    }

    if(address.trim().length < 12){
        return res.status(500).json({message: 'The adress must be have 12 characters or more.'})
    }

    next()
}