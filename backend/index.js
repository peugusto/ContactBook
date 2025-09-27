import express from 'express'
import cors from 'cors';
import apiRouter from './src/routes/api.js';
import {db,store} from './src/config/db.js';
import session from 'express-session';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(session({
    secret:'18899881',
    resave:false,
    saveUninitialized:false,
    store:store,
    rolling:true,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}))
app.use('/api', apiRouter);

app.listen(3000,() => console.log("server on."))