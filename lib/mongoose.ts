const mongoose = require("mongoose");

let isConnected = false; //variable to track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('MONGOOSE_URI is not defined');
    if(isConnected) return console.log('using existing db connection');

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected= true;
        console.log('MongoDB connected');
    }catch(error){
        console.log(error);
    }
}