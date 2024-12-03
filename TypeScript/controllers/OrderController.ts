import { connect } from "http2";
import orderService from "../services/orderService";
import walletService from "../services/walletService";
class OrderController {
    private orderService : orderService;
    private walletService : walletService;
    constructor() {
        this.orderService = new orderService();
        this.walletService = new walletService();
    }

    public create = async(req : Request, res : Response) =>
    {
        let {id} = req.headers?.user;
        req.body.customer = id;
        try
        {

            let order = await this.orderService.createOrder(req.body);
            // let payment = await this.orderService.createPayment(req.body,order.id);

            // // // lets addd credits to user wallet, first we need to check last Credit amount in User Wallet and then we need to add new credits into it, maintaining a log

            // let addCredits = await this.walletService.addCredits(req.body)
            // console.log(addCredits);

            return res.json(order);
        }
        catch(error)
        {
            console.log(error);
            return res.json(error);
        }
    }
    public successCallBack = async(req:Request,res : Response) =>
    {   let {id} = req.query;
        id = Number(id);
        try
        {
            // get order infromation from the orderService
            const orderInfo = await this.orderService.getOrderById(id);

            // check order id comming from the response call to idenity the order
            req.body.customer = orderInfo.customerId;
            const paymentData = req.body;
            let payment = await this.orderService.createPayment({
                status : 1,
                customer : req.body.customer
                }
            ,Number(id));
            // // // lets addd credits to user wallet, first we need to check last Credit amount in User Wallet and then we need to add new credits into it, maintaining a log

            let addCredits = await this.walletService.addCredits(req.body)
            const redirectUrl = `http://localhost:3000/dashboard/buy-credits?status=${req.body.status}`;
            // return res.json(redirectUrl);
            res.redirect(302, redirectUrl);

        }
        catch(error)
        {
            console.log(error);
            const redirectUrl = `http://localhost:3000/dashboard/buy-credits?success=0`;

        }
    }
    public createPayment = async(req : Request, res : Response) =>
        {
            let {id} = req.headers?.user;
            req.body.customer = id;
            try
            {
                let order = await this.orderService.createOrder(req.body);
                // // let payment = await this.orderService.createPayment(req.body,order.id);
    
                // // lets addd credits to user wallet, first we need to check last Credit amount in User Wallet and then we need to add new credits into it, maintaining a log
    
                // let addCredits = await this.walletService.addCredits(req.body)
    
                return res.json(order);
            }
            catch(error)
            {
                return res.json(error);
            }
        }
    public utils = async(req : Request, res : Response) =>
        {
            try
            {
                let order = await this.orderService.createOrderUtils(req.body);
                return res.json(order);
            }
            catch(error)
            {
                return res.json(error);
            }
        }


}

export default OrderController; // Ensure this line is correct
