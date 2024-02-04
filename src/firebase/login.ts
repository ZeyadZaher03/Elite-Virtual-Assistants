import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { app } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth(app);

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

export const checkAuthState = (
  onLoggedIn: (user: User) => void,
  onLoggedOut: () => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onLoggedIn(user);
    } else {
      onLoggedOut();
    }
  });
};

checkAuthState(
  () => {},
  () => {}
);

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}
