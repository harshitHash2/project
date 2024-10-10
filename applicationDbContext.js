require('dotenv').config();
const mongoose = require('mongoose');

 const mongoURI = process.env.CON_STR;

 const connectToMongo = ()=> {
    mongoose.connect(mongoURI).then((val) => {
      console.log(' Mongoose Connected Successfully');
      console.log(val.connection.host)
    })
    .catch(err => {
      console.error('Connection Error:', err);
    });

 }

 module.exports= connectToMongo;