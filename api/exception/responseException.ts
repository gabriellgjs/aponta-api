import { Response } from 'express'

type ResponseExceptionProps = {
  response: Response
  errorHandler: { status: number; message: string } | undefined
}

const ResponseException = ({
  response,
  errorHandler,
}: ResponseExceptionProps) => {
  return response
    .status(errorHandler?.status ?? 0)
    .json({ ...errorHandler })
    .end()
}

export default ResponseException
