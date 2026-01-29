import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



app.use(express.json()); // this middlware will prase JSON bodies :req.body
//our simple custom middleware


// app.use((req,res,next)=> {
//     console.log(`Re method ${req.method} & url ${req.url}`);
//     next()
// })


app.use(rateLimiter);

//routes app
app.use('/api/notes',notesRoutes);


if(process.env.NODE_ENV !== "production"){
    app.use(cors({origin:"http://localhost:5173",credentials:true}));
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'../front-end/dist')))
    app.get("/{*path}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../front-end","dist","index.html"))
    });
}

connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log("Server starting on PORT:"+PORT)
})
})




