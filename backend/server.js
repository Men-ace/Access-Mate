import express from  "express"
import "dotenv/config"
import cors from "cors"
import { connectDB } from "./config/db.config.js"
import URLcheck from "./routers/url.check.js"

 const app = express()
const PORT = process.env.PORT  || 8000

 // database connection  
 connectDB()

 //Middlewares
 app.use(cors())
 app.use(express.json())

 //Routers
 app.use('/api/v1/check', URLcheck)

// Server status
app.listen(PORT, (error) => {
    error? console.log("Error",error) 
         : console.log("Server is live")
})