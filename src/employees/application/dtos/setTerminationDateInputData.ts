export default class SetTerminationDateInputData {
  constructor(
    readonly employeeId: number,
    readonly terminationDate: string | null,
  ) {}
}
