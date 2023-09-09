import express from 'express';
import AccessListControlRoutes from '../Auth/Routes/AccessListControlRoutes';
import AuthenticationRoutes from '../Auth/Routes/AuthenticationRoutes';
import EmployeesRoutes from '../Employees/Routes/EmployeesRoutes';
import PatientsRoutes from '../Patients/Routes/PatientsRoutes';
import PermissionsRoutes from '../Permissions/Routes/PermissionsRoutes';
import RolesRoutes from '../Roles/Routes/RolesRoutes';
import AuthorizationRequest from '../Shared/Middlewares/AuthorizationRequest';
import UsersRoutes from '../Users/Routes/UsersRoutes';

export default class Routes {
  private route = express.Router();
  private login = new AuthenticationRoutes().loginRoute;
  private acl = new AccessListControlRoutes().ACLRoute;
  private roles = new RolesRoutes().RolesRoutes;
  private employees = new EmployeesRoutes().EmployeesRoutes;
  private patients = new PatientsRoutes().PatientsRoutes;
  private users = new UsersRoutes().UsersRoutes;
  private permissions = new PermissionsRoutes().PermissionsRoutes;
  private authorizationRequest = AuthorizationRequest.validateAuthorization;

  constructor() {
    this.route = express.Router();
    
    this.route.use('/login', this.login);
    this.route.use('/acl', this.authorizationRequest, this.acl);
    this.route.use('/roles', this.authorizationRequest, this.roles);
    this.route.use('/permissions', this.authorizationRequest, this.permissions);
    this.route.use('/employees', this.authorizationRequest, this.employees);
    this.route.use('/users', this.authorizationRequest, this.users);
    this.route.use('/patients', this.authorizationRequest, this.patients);
  }
  
  get routes() {
    return this.route;
  }
} 


//TODO remanejar rotas