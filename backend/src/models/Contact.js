import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    address:{type:String,require:true},
    belongsTo:{type:String}
})

const Contact = mongoose.model('Contact',contactSchema)

export default Contact