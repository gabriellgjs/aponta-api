import express from 'express';
import AuthenticationRoutes from './Auth/Routes/AuthenticationRoutes';
import EmployeesRoutes from './Employees/Routes/EmployeesRoutes';
import RolesRoutes from './Roles/Routes/RolesRoutes';
import UsersRoutes from './Users/Routes/UsersRoutes';
import AuthorizationRequest from './Shared/Middlewares/AuthorizationRequest';
import PatientsRoutes from './Patients/Routes/PatientsRoutes';

export default class Routes {
  private route = express.Router();
  private login = new AuthenticationRoutes().loginRoute;
  private roles = new RolesRoutes().RolesRoutes;
  private employees = new EmployeesRoutes().EmployeesRoutes;
  private patients = new PatientsRoutes().PatientsRoutes;
  private users = new UsersRoutes().UsersRoutes;
  private authorizationRequest = AuthorizationRequest.validateAuthorization;

  constructor() {
    this.route = express.Router();
    
    this.route.use('/login', this.login);
    this.route.use('/roles', this.authorizationRequest, this.roles);
    this.route.use('/employees', this.authorizationRequest, this.employees);
    this.route.use('/users', this.authorizationRequest, this.users);
    this.route.use('/patients', this.authorizationRequest, this.patients);
  }
  
  get routes() {
    return this.route;
  }
} 


//TODO remanejar rotas