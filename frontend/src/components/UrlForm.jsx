import useForm from "../hooks/useForm.js";
import useLoader from "../../hooks/useLoader.js";
import InputField from "./InputField.jsx"
import { checkURL } from "../../axios/urlaxios.js";
import { toast } from "react-toastify";

const initialFormData = {
    url: '',
}

const UrlForm = (props) => {
  const {setIsSent} = props
// Form Handling 
 const {formData, handleOnChange} = useForm(initialFormData)
 const {url} = formData

 // For loading state
 const {isLoading, stopLoading, startLoading} = useLoader()

const handleOnSubmit = async(e)=>{
    e.preventDefault()

    startLoading()
    //send api request to check accessbility
    const result = await checkURL({
        url,
    })
    stopLoading()

    // handle error 
    if (result.status === "error"){
      return toast.error(result.message)
    }

    // on success
    toast.success(result.message)
    setIsSent(true)
}




  return (
    <Form onsubmit={handleOnSubmit}>
      <h2 className="text-center mb-4">Create an Account</h2>

      <InputField
        label = "Enter the Website Url"
        inputFieldAttributes= {{
          type: 'url',
          name: 'url',
          value: formData.url,
          placeholder: 'e.g., https://www.yourwebsite.com/',
          onchange: handleOnChange,
          required: true,
        }}
      />
      <p>Enter a full URL, including "http:// or  https://"</p>

      <Button
        variant="primary" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner animation="border" /> : 'Sign up'}
      </Button>
    </Form>
   );
}


export default UrlForm
