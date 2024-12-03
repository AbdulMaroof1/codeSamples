import  countryService from '../services/CountryService';
class CountryController {
    private countryService : countryService;
    constructor() {
        this.countryService = new countryService();
    }

    public create = async(req : Request, res : Response) =>
    {
        try
        {
            let result = await this.countryService.create(req.body);
            return res.json(result);
        }
        catch(error)
        {
            return res.json(error);
        }
    }

    public createAttributes = async(req : Request, res : Response) =>
        {
            try
            {
                let result = await this.countryService.createAttributes(req.body);
                return res.json(result);
            }
            catch(error)
            {
                return res.json(error);
            }
        }

    public list = async(req:Request,res:Response) =>
    {
        try
        {
            let result = await this.countryService.list();
            return res.json(result);

        }
        catch(error)
        {
            return res.json(error);

        }
    }

}

export default CountryController; // Ensure this line is correct
