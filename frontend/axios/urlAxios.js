import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL
const Accesbility_Checker_Url = '/api/v1/check'


// API Processor 
export const apiProcessor = async ({
    url,
    method,
    payload
}) => {
    try {
       const response = axios({
            url,
            method,
            data: payload,
        })

        const {data} = await response
        toast[data.status]
    } catch (error) {
        
    }
}

// Send the URL | POST | CHECK
export const checkURL = 