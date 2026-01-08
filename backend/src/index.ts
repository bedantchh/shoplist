import express from "express"
import cors from "cors"
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({origin:ENV.FE_URL}))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.json("hello")
})

app.listen(ENV.PORT,()=>{
    console.log(`Server is running on PORT ${ENV.PORT}`)
})