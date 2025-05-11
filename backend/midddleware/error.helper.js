import { responseClient } from "./response.client";

export const  errorHandler = (error, req, res, next) =>{
    const statusCode = error.statusCode || 500; 
    const message = error.message
    responseClient({req, res, statusCode, message})
}
