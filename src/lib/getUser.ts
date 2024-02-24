import { cookies } from "next/headers";
import { customInitApp } from "./firebase-admin-config";
import { getAuth } from "firebase-admin/auth";

customInitApp();

const getUser = async () => {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  const user = await getAuth().verifySessionCookie(session, true);
  return user;
};

export default getUser;
