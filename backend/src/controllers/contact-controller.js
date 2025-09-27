import Contact from "../models/Contact.js";

const contactController = {
    addContact: async (req,res) =>{
        try {
            
        const {name,address,phone} = req.body
        const {userID} = req.session
            
        if (!userID) throw new Error('userID not found')

        const newContact = new Contact({name:name,address:address,phone:phone,belongsTo:userID})
        await newContact.save()
        
        res.status(200).json({message:"contact was created"})

        } catch (error) {
            res.status(500).json({message:error})
        }
    },
    editContact: async (req,res) =>{
        const {id}= req.params
        const {name,phone,address} = req.body
        try {

            if(!id) throw new Error('ID does not exist')

            const editContact = await Contact.findOneAndUpdate(
            {_id:id},
            {$set: {name:name,phone:phone,address:address}},
            {new:true, runValidators: true}
            )    

            if (!editContact) throw new Error('Contact not found')
        
            res.status(200).json({message:"edited"})

        } catch (error) {
            return res.status(500).json({message:error})
        }



    },
    deleteContact: async (req,res) =>{
        try {
            const {_id} = req.body
            const deletedContact = await Contact.findOneAndDelete({_id:_id})

            if(!_id) throw new Error('id not found')

            if(!deletedContact) throw new Error('contact was not deleted')
            return res.status(200).json({message:'user deleted'})

        } catch (error) {
            return res.status(500).json({message:error})
        }
    },
    getContacts: async (req,res) =>{
        const {userID,name} = req.session;

        if (!userID) return res.status(500).json({message:'userID not found'})

        const contacts = await Contact.find({belongsTo:userID});
        
        res.status(200).json({contacts: contacts,name:name})
    },
    getContact: async (req,res) =>{
        const {id} = req.params
        // const {userID} = req.session

        try {
            
            if (!id) throw new Error('ID not found')
            // if (id !== userID) throw new Error('User not authenticated')


            const contact = await Contact.find({_id:id})

            if(!contact) throw new Error('contact not found')
         
            return res.status(200).json({message:'user found',contact:contact})

        } catch (error) {
            return res.status(500).json({message:error})
        }

    }
}

export default contactController