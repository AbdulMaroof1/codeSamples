// src/routes/roleRoutes.ts
import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const roleRouter = Router();

roleRouter.post('/roles', RoleController.createRole);
roleRouter.get('/roles', RoleController.getAllRoles);

export default roleRouter;
