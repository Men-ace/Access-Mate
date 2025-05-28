import { useState } from "react";

const useLoader = () =>{
    const [isloading, setIsLoading] = useState(false)

    const startLoading =() => setIsLoading(true)
    const stopLoading = () => setIsLoading(false)

    return {
        isloading,
        setIsLoading,
        startLoading,
        stopLoading,
    }
}

export default useLoader

// made to control the loading state like submitting, clicking 