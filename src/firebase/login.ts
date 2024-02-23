import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-config";

export const postLogin = async ({ token }: { token: string }) => {
  try {
    fetch("/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

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
    const token = await userCredential.user.getIdToken();
    await postLogin({ token });
    onSuccess(userCredential.user);
  } catch (error) {
    onError(error);
  }
};
