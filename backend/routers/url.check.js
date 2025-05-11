import express from 'express'
import { checkURL } from '../controllers/check.url.js'

 const router = express.Router()

 //check the upcoming URL
router.post("/check", checkURL )



export default router