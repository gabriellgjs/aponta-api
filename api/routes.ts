import { Router } from 'express';
import RolesRoutes from './Roles/Routes/RolesRoutes';
import EmployeesRoutes from './Employees/Routes/EmployeesRoutes';
import UsersRoutes from './Users/Routes/UsersRoutes';

export const Routes = Router();

Routes.use(new RolesRoutes().RolesRoutes);
Routes.use(new EmployeesRoutes().EmployeesRoutes);
Routes.use(new UsersRoutes().UsersRoutes);
