import { responseClient } from "../midddleware/response.client"
export const checkURL = async (req,res) => {
    try {
        const {url} = req.body

        //validating if its a url
        if (!url || !validator.isURL(url,{require_protocol: true} )){
            const message = "This is not an website"
            const statusCode = 400
            return responseClient({req, res, message, statusCode})
        }


        // Launch Puppeteer 
        const browser = await puppeteer.launch({
            headless:true,
            args:['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page = await browser.newpage()

       
    // Navigate to URL with timeout
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch((err) => {
        throw new Error(`Failed to load URL: ${err.message}`);
      });




    } catch (error) {
        next(error)
    }



}