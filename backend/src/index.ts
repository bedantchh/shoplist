import express from "express"
import cors from "cors"
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'

import userRoutes from './routes/userRoutes'
import commentRoutes from './routes/commentRoutes'
import productRoutes from './routes/productRoutes'

const app = express();

app.use(cors({origin:ENV.FE_URL,credentials:true}))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/comments",commentRoutes)

app.listen(ENV.PORT,()=>{
    console.log(`Server is running on PORT ${ENV.PORT}`)
})