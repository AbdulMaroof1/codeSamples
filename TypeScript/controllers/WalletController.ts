// src/controllers/RoleController.ts
import { Request, Response } from 'express';

class WalletController {
   
  // this method is going to add credits into the customer wallet. 
  async addCredits(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const role = await RoleService.createRole(name, description);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role' });
    }
  }
  async checkCustomerCredits(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const role = await RoleService.createRole(name, description);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role' });
    }
  }

}

export default new WalletController();
