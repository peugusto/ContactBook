import mongoose from "mongoose";
import dotenv from 'dotenv'
import MongoStore from "connect-mongo";
dotenv.config()

const db = mongoose.connect(process.env.MONGO_URI).then(()=>console.log('conectado ao mongo.')).catch(err => console.error('error: ',err))

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
})

export {db,store}