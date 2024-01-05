import { z } from 'zod'

export const updatePatientInAppointmentSchema = z.object({
  patientId: z.number({
    required_error: 'Id do paciente é obrigatório',
    invalid_type_error: 'Id deve ser uma number',
  }),
})
