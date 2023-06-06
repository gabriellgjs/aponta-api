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

    this.employeesRoutes.get('/', getEmployees);

    this.employeesRoutes.post('/', createEmployee);
    
    this.employeesRoutes.get('/:id', getEmployee);

    this.employeesRoutes.put('/:id', updateEmployee);

    this.employeesRoutes.delete('/:id', deleteEmployee);
  }

  get EmployeesRoutes() {
    return this.employeesRoutes;
  }
}
