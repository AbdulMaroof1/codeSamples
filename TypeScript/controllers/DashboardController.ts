import DashboardService from "../services/DashboardService";
class DashboardController {
    private dashboardService : DashboardService;
    constructor() {
        this.dashboardService = new DashboardService();

    }

    public dashboard = async(req:Request,res:Response) : Promise<any> =>
    {
        let {user}  = req.headers
        try
        {
            const data = await this.dashboardService.commonDashboardService(user);
            return res.json(data);
        }
        catch(error)
        {
            console.log(error);
            return res.json(error);
        }
    }

}

export default DashboardController; // Ensure this line is correct
