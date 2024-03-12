import express from "express";
import './db/connection.js'
import userRouter from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000', // Specify the allowed origin
    credentials: true // Allow requests with credentials
  }));
app.use(express.json())
app.use(cookieParser())

const port = 8989;

app.use(userRouter)

// app.get("/", (req, res)=>{
//     res.status(201).json("server created")
// });

app.listen(port ,()=>{
console.log(`server has been run on port no : ${port}`);
})