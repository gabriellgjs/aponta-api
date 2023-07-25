export default class SetTerminationDateInputData {
  constructor(
    readonly employee_id: number, 
    readonly terminationDate: Date | null,
  ) {}
}
