import express, { Router } from 'express';
import EmployeesController from '../Controllers/EmployeesController';

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

    this.employeesRoutes.get('/employee/:id', getEmployee);

    this.employeesRoutes.get('/employees', getEmployees);

    this.employeesRoutes.post('/employee', createEmployee);

    this.employeesRoutes.put('/employee/:id', updateEmployee);

    this.employeesRoutes.delete('/employee/:id', deleteEmployee);
  }

  get EmployeesRoutes() {
    return this.employeesRoutes;
  }
}
