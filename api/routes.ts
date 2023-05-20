import { Router } from "express"
import RolesRoutes from "./Roles/Routes/RolesRoutes"

export const Routes = Router();

Routes.use(new RolesRoutes().getRoleRoutes);