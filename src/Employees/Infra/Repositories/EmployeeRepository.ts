import Employee from '../../Domain/Entities/Employee';
import EmployeesModel from '../Models/EmployeesModel';

export default class EmployeeRepository {
  private employeesModel: EmployeesModel;

  constructor() {
    this.employeesModel = new EmployeesModel();
  }

  async create(employee: Employee): Promise<Employee> {
    const id = await this.employeesModel.createEmployee(employee);

    employee.id = id ? id : 0;

    return employee;
  }

  async update(employee: Employee): Promise<void> {
    await this.employeesModel.updateEmployee(employee);
  }

  async delete(employee_id: number): Promise<void> {
    await this.employeesModel.deleteEmployee(employee_id);
  }
}
