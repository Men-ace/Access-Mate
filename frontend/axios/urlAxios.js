import axios from 'axios'
import {toast} from "react-toastify"

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL
const Accesbility_Checker_Url = API_BASE_URL+'/api/v1/check'


// API Processor 
export const apiProcessor = async ({
    url,
    method,
    payload
}) => {
    // eslint-disable-next-line no-useless-catch
    try {
       const response = axios({
            url,
            method,
            data: payload,
        })

        const {data} = await response
        toast[data.status](data.message)
        return data 
    } catch (error) {
       throw error 
    }
}

// Send the URL | POST | CHECK
export const checkURL = async(payload) =>{
    const obj = {
        url: Accesbility_Checker_Url,
        method: "post",
        payload, 
    }
    return apiProcessor(obj)
}