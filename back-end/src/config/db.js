import mongoose from 'mongoose';
import dns from 'node:dns/promises';


dns.setServers(['1.1.1.1','1.0.0.1']);

export const connectDb = async()=>{
    try{
       const conne = await mongoose.connect(process.env.MONGO_URI)
        console.log("MonogoDB connected successfully!");

        return conne;
    }catch(error){
        console.error("Error connecting to MongoDB",error)
        process.exit(1);
    }
}



















