export default class RescheduleAppointmentInputData {
  constructor(
    readonly dataTimeStart: string,
    readonly dataTimeEnd: string,
    readonly appointmentId: number,
  ) {}
}
