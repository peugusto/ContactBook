import Contact from "../models/Contact.js";
import {findAllContacts,countContact} from "../utils/getContacts.js";

const contactController = {
    addContact: async (req,res) =>{
        try {
            
        const {name,address,phone} = req.body
        const {userID} = req.session
            
        if (!userID) throw new Error('userID not found')

        const newContact = new Contact({name:name,address:address,phone:phone,belongsTo:userID})
        await newContact.save()
        
        res.status(200).json({message:"contact was created",contact:newContact})

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

        const currentUrl = req.baseUrl

        let {limit, offset} = req.query;
        limit = Number(limit)
        offset = Number(offset)

        if (!limit) limit = 5;
        if (!offset) offset = 0;


        const contacts = await findAllContacts(offset,limit,userID)
        const total = await countContact();
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}/contacts?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}/contacts?limit=${limit}&offset=${previous}`:null;
        
        
        res.status(200).json({contacts: contacts,name:name,pagination: {
            nextUrl,
            previousUrl
        }})
    },
    getContact: async (req,res) =>{
        const {id} = req.params


        try {
            
            if (!id) throw new Error('ID not found')
            const contact = await Contact.find({_id:id})

            if(!contact) throw new Error('contact not found')
         
            return res.status(200).json({message:'user found',contact:contact})

        } catch (error) {
            return res.status(500).json({message:error})
        }

    }
}

export default contactController