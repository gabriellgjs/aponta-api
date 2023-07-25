import VerifyId from "api/Shared/Middlewares/VerifyId";
import verifyRoleExist from "api/Shared/Middlewares/VerifyRoleExist";

export default async function VerifyIdAndRoleExist(role_id: number) {
  VerifyId(role_id);
  await verifyRoleExist(Number(role_id)); 
}