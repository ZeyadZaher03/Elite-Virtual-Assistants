import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase-config";

export const loginWithEmailAndPassword = async ({
  email,
  password,
  onSuccess,
  onError,
}: {
  email: string;
  password: string;
  onSuccess: (user: User) => void;
  onError: (error: any) => void;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    onSuccess(userCredential.user);
  } catch (error) {
    onError(error);
  }
};
