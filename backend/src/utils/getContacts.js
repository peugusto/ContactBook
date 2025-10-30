import Contact from "../models/Contact.js"

const findAllContacts = (offset,limit,userID) => Contact.find({belongsTo:userID}).skip(offset).limit(limit);
const countContact = () => Contact.countDocuments();

export {
findAllContacts,
countContact
} ;




