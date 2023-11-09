import Employee from '@employees/domain/entities/employee'
import EmployeesModel from '../models/employeesModel'

export default class EmployeeRepository {
  private employeesModel: EmployeesModel

  constructor() {
    this.employeesModel = new EmployeesModel()
  }

  async save(employee: Employee) {
    if (employee.id) {
      return this.update(employee)
    }

    return this.create(employee)
  }

  async updatePersonDetails(employee: Employee): Promise<void> {
    await this.employeesModel.updatePersonDetails(employee)
  }


  async create(employee: Employee): Promise<Employee> {
    const id = await this.employeesModel.createEmployee(employee)

    employee.id = id ?? 0

    return employee
  }

  async update(employee: Employee): Promise<void> {
    await this.employeesModel.updateEmployee(employee)
  }

  async status(employeeId: number): Promise<void> {
    await this.employeesModel.statusEmployee(employeeId)
  }
}
