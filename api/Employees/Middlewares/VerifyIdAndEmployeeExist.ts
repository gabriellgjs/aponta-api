import VerifyId from "api/Shared/Middlewares/VerifyId";
import verifyEmployeeExist from "./VerifyEmployeeExist";

export default async function VerifyInAndEmployeeExist(employee_id: number) {
  VerifyId(employee_id);
  await verifyEmployeeExist(Number(employee_id)); 
}