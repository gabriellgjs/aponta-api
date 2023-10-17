import 'express-async-errors'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import Routes from './routes'
import { ErrorResponse } from '@sharedAPI/middlewares/errorResponse'
import swaggerUi from 'swagger-ui-express'
import swaggerDocumentation from '../../swagger.json'

dotenv.config()

export default class App {
  private readonly port = parseInt(process.env.PORT ?? '3000')
  private readonly server = express()
  private readonly routes = new Routes().routes
  private readonly errors = ErrorResponse
  private readonly version = '/v1'
  private readonly host = '0.0.0.0'
  private readonly documentationUrl = this.version + '/documentation'

  constructor() {
    this.server.use(express.json())
    this.server.use(
      cors({
        origin: '*',
      }),
    )
    this.server.use(
      this.documentationUrl,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocumentation),
    )
    this.server.use(this.version, this.routes)
    this.server.use(this.errors)

    this.listen()
  }

  private listen() {
    this.server.listen(
      {
        port: this.port,
        host: this.host,
      },
      () => {
        console.log('HTTP Server running on port ' + this.port)
      },
    )
  }
}
