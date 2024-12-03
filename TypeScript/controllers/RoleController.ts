// src/controllers/RoleController.ts
import { Request, Response } from 'express';
import RoleService from '../services/RoleService';

class RoleController {
  async createRole(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const role = await RoleService.createRole(name, description);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role' });
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }
}

export default new RoleController();
