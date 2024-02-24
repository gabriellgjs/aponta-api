import { Appointments } from "@prisma/client";

export const ResponseListAppointments = (appointments: Appointments[]) => {
    const response = appointments.map((appointment) => {
        return {
          id: appointment.id,
          status: appointment.status,
          confirmedAt: appointment.confirmedAt, 
          description: appointment.description,
          dataTimeStart: appointment.dataTimeStart,
          dataTimeEnd: appointment.dataTimeStart,
          dentistId: appointment.dentistId,
          patientId: appointment.patientId,
          canceledAt: appointment.canceledAt,
          appointmentId: appointment.appointmentId
        }
    })

    return [...response]
}

export const ResponseAppointment = (appointment: Appointments) => {
    return {
        id: appointment.id,
        status: appointment.status,
        confirmedAt: appointment.confirmedAt, 
        description: appointment.description,
        dataTimeStart: appointment.dataTimeStart,
        dataTimeEnd: appointment.dataTimeStart,
        dentistId: appointment.dentistId,
        patientId: appointment.patientId,
        canceledAt: appointment.canceledAt,
        appointmentId: appointment.appointmentId
    }
}
