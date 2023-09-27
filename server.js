const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();
const app = express();



mongoose.connect(process.env.DATABASE_URL );  //, {useNewUrlParser : true}


const db = mongoose.connection;

db.on('error' , (error) => console.error(error));
db.once('open', ()=>console.log("connected to db"));

app.use(express.json());

const subscribersRouter  =require('./routes/subscribers')




app.use('/subscribers' , subscribersRouter);



app.listen(8000, ()=>{
    console.log(`App listed on port http://localhost:8000`);
});
