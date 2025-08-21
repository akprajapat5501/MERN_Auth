const mongoose = require('mongoose');

const mongo_url = process.env.MONGOURL;

const dbconnect = async() =>{
    await mongoose.connect(mongo_url)
    // console.log("database is connected...");
}

// mongoose.connect(mongo_url)
// .then(()=>{
//     console.log("database is connected...");
// }).catch((error) => {
//     console.log("MongoDB connection error", error);
// })

module.exports = dbconnect;
