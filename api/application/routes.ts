import express from 'express'
import AuthenticationRoutes from '@authAPI/routes/authenticationRoutes'
import EmployeesRoutes from '@employeesAPI/routes/employeesRoutes'
import PatientsRoutes from '@patientsAPI/routes/patientsRoutes'
import RolesRoutes from '@rolesAPI/routes/rolesRoutes'
import AuthorizationRequest from '@sharedAPI/middlewares/authorizationRequest'
import AppointmentsRoutes from '@appointmentsAPI/routes/appointmentsRoutes'

export default class Routes {
  private readonly route = express.Router()
  private login = new AuthenticationRoutes().loginRoute
  private roles = new RolesRoutes().RolesRoutes
  private appointments = new AppointmentsRoutes().AppointmentsRoutes
  private employees = new EmployeesRoutes().EmployeesRoutes
  private patients = new PatientsRoutes().PatientsRoutes
  private authorizationRequest = new AuthorizationRequest()

  constructor() {
    this.route = express.Router()

    this.route.use('/login', this.login)

    this.route.use(
      '/roles',
      this.authorizationRequest.validateAuthorization,
      this.roles,
    )

    this.route.use(
      '/appointments',
      this.authorizationRequest.validateAuthorization,
      this.appointments,
    )


    this.route.use(
      '/employees',
      this.authorizationRequest.validateAuthorization,
      this.employees,
    )

    this.route.use(
      '/patients',
      this.authorizationRequest.validateAuthorization,
      this.patients,
    )
  }

  get routes() {
    return this.route
  }
}
