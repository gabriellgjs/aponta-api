import { Router } from 'express';
import RolesRoutes from './Roles/Routes/RolesRoutes';
import EmployeesRoutes from './Employees/Routes/EmployeesRoutes';

export const Routes = Router();

Routes.use(new RolesRoutes().RolesRoutes);
Routes.use(new EmployeesRoutes().EmployeesRoutes);
