import express, { Router } from 'express';
import EmployeesController from '../Controllers/EmployeesController';
import CreateEmployeeMiddleware from '../Middlewares/CreateEmployeeMiddleware';
import { is } from 'api/Shared/Middlewares/AccessControlList';
import SetUserIdMiddleware from '../Middlewares/SetUserIdMiddleware';
import UpdateEmployeeMiddleware from '../Middlewares/UpdateEmployeeMiddleware';

export default class EmployeesRoutes {
  private employeesController: EmployeesController;
  private employeesRoutes: Router;

  constructor() {
    this.employeesController = new EmployeesController();
    this.employeesRoutes = express.Router();
    this.routes();
  }

  public async routes() {
    const getEmployee = this.employeesController.getEmployee.bind(
      this.employeesController,
    );

    const getEmployees = this.employeesController.getEmployees.bind(
      this.employeesController,
    );

    const createEmployee = this.employeesController.createEmployee.bind(
      this.employeesController,
    );

    const updateEmployee = this.employeesController.updateEmployee.bind(
      this.employeesController,
    );

    const deleteEmployee = this.employeesController.deleteEmployee.bind(
      this.employeesController,
    );
    const setUserId = this.employeesController.setUserId.bind(
      this.employeesController,
    );

    this.employeesRoutes.get('/', getEmployees);
    this.employeesRoutes.get('/:id', getEmployee);
    this.employeesRoutes.post('/', is(["admin", "manager"]), CreateEmployeeMiddleware, createEmployee);
    this.employeesRoutes.put('/:id', is(["admin", "manager"]), UpdateEmployeeMiddleware, updateEmployee);
    this.employeesRoutes.delete('/:id', is(["admin", "manager"]), deleteEmployee);
    this.employeesRoutes.patch('/:employee_id/user', is(["admin", "manager"]), SetUserIdMiddleware, setUserId);
  }

  get EmployeesRoutes() {
    return this.employeesRoutes;
  }
}
