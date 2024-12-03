import { Request, Response } from 'express';
import SearchService from '../services/searchService';

class SearchController {
    private searchService: SearchService;

    constructor() {
        this.searchService = new SearchService();
    }

    public async newSearch(req: Request, res: Response): Promise<void> {
        const { longitude, latitude } = req.body;
        const {id,email} = req.headers.user;

        try
        {
            let body = req.body;
            body.id = id
            body.email = email;

            if (!longitude || !latitude) {
                res.status(400).json({ error: 'Longitude and latitude are required.' });
                return;
            }

            const result = await this.searchService.performSearch(body);
            res.status(200).json(result);

        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({status : 500,message : error.message , data : {} });
        }

     
    }
    public async getAllSearches(req: Request, res: Response): Promise<void>
    {
        const {id,email} = req.headers.user;
        try
        {
            const result = await this.searchService.getAllSearches(id);
            res.status(200).json(result);
        }
        catch(error)
        {
            res.status(500).json({ error: error.message });
        }
    }
    public async getReportById(req: Request, res: Response): Promise<void>
    {
        let {id} = req.params;
        try
        {
            const result = await this.searchService.getReportById(req.params.id);
            res.status(200).json(result);
        }
        catch(error)
        {
            res.status(500).json({ error: error.message });
        }
    }
}

export default SearchController;
