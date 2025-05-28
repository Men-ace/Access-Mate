import useForm from "../hooks/useForm.js";
import useLoader from "../../hooks/useLoader.js";

const initialFormData = {
    url: '',
    name: 'url'
}

const UrlForm = () => {

// Form Handling 
 const {formData, handleOnChange} = useForm(initialFormData)
 const {url, name} = formData

 // For loading state
 const {isLoading, stopLoading, startLoading} = useLoader()

const handleOnSubmit = (e)=>{
    e.preventDefault()

    startLoading

}




  return (
    <Form>
      <h2 className="text-center mb-4">Create an Account</h2>

      <InputField
        label = "Enter the Website Url"
        inputFieldAttributes= {{
          type: 'url',
          name: 'url',
          value: formData.name,
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
