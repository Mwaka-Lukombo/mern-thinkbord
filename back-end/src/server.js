import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';


dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001;



app.use(express.json()); // this middlware will prase JSON bodies :req.body
//our simple custom middleware
app.use(cors({origin:"http://localhost:5173",credentials:true}));


// app.use((req,res,next)=> {
//     console.log(`Re method ${req.method} & url ${req.url}`);
//     next()
// })


app.use(rateLimiter);

//routes app
app.use('/api/notes',notesRoutes);



connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log("Server starting on PORT:"+PORT)
})
})




