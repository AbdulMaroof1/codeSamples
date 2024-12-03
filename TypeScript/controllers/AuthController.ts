// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import emailService from '../services/emailService';
import OtpService from '../services/otpService';
import CustomError from '../errors/CustomError';
import { validateDto } from '../middlewares/validation.middleware';

class AuthController {
    private authService: AuthService;
    private otpService : OtpService;

    constructor() {
        this.authService = new AuthService();
        this.otpService = new OtpService();
    }
    public async signUp(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, email, phoneNumber, password , role } = req.body;
        try {
            const user = await this.authService.signUp({
            
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role
            
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            console.log(req.body);
            const user = await this.authService.login(email,password);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Password Recovery

    public async forgotPassword(req: Request, res: Response): Promise<Response> {
        const { email} = req.body;
        try {
            const user = await this.authService.forgotPassword(email);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public changePassword = async(req:Request,res:Response) =>
    {
        try
        {
            const user = await this.authService.changePassword(req.body);
            return res.status(200).json(user);
        }
        catch(error)
        {
            return res.status(500).json(error);

        }
    }
    // Ending Password Recovery Routes

    public verifyOtp = async(req: Request, res: Response) : Promise<any> =>
    {
        try
        {
            console.log(req.body);
            let respn = await this.otpService.verifyOtp(req.body.email,req.body.otp);
            return res.status(200).json(respn);          
        }
        catch(error)
        {
            return res.status(500).json({ error: error });          
        }
    }


    // User Profile Actions

    public updateProfilePassword = async(req:Request,res:Response) =>
    {
        try
        {
            const result = await this.authService.updateProfilePassword(req.body);
            return res.status(200).json(result);

        }
        catch(error)
        {

        }
    }

    // User Profile Actions
}

export default AuthController; // Ensure this line is correct
