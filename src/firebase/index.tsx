// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  get as getFirebaseData,
  push,
  set,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCMANOb5V4PKs3AV7z2-FgXbAa0Ps5cFm8",
  authDomain: "agency-b6787.firebaseapp.com",
  projectId: "agency-b6787",
  storageBucket: "agency-b6787.appspot.com",
  messagingSenderId: "907819990962",
  appId: "1:907819990962:web:c9650516c2b45fcc6faeab",
  measurementId: "G-4GJXLXPR2Y",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);

export const pagesRef = ref(database, "pages");
export const HomePageRef = ref(database, "pages/home");
export const aboutUsRef = ref(database, "pages/about-us");
export const servicesRef = ref(database, "pages/services");
export const blogsRef = ref(database, "pages/blogs");
export const salesRef = ref(database, "sales");

type PushDataParams = {
  refPath: any; // Adjust the type based on your actual Firebase structure
  data: any; // Adjust the type based on your actual data structure
  callback: () => void;
  onError: () => void;
};

export const pushData = ({
  refPath,
  data,
  callback,
  onError,
}: PushDataParams) => {
  const firebaseRef = ref(database, refPath);
  push(firebaseRef, data)
    .then(() => callback())
    .catch((error) => onError());
};

interface SetDataParams {
  refPath: string;
  data: any; // Adjust the type based on your requirements
  onSave: () => void;
  onError: (error: any) => void;
}

export const setData = async ({
  refPath,
  data,
  onSave,
  onError,
}: SetDataParams) => {
  const firebaseRef = ref(database, refPath);

  try {
    await set(firebaseRef, data);
    onSave();
  } catch (error) {
    console.error("Error setting data:", error);
    onError(error);
  }
};

interface RemoveDataParams {
  refPath: string;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export const removeNode = async ({
  refPath,
  onSuccess,
  onError,
}: RemoveDataParams) => {
  if (!refPath) return;
  const firebaseRef = ref(database, refPath);
  try {
    await remove(firebaseRef);
    onSuccess();
  } catch (error) {
    console.error("Error removing node:", error);
    onError(error);
  }
};

type RefPath = string;
type OnSuccessCallback<T> = (data: T) => void;
type OnErrorCallback = (error: Error | string) => void;

export const getData = async <T,>(
  refPath: RefPath | null,
  onSuccess: OnSuccessCallback<T>,
  onError: OnErrorCallback
): Promise<T | null> => {
  if (!refPath) {
    onError("Invalid refPath");
    return null;
  }

  const firebaseRef = ref(database, refPath);

  try {
    const snapshot = await getFirebaseData(firebaseRef);

    if (snapshot.exists()) {
      const value = snapshot.val() as T;
      onSuccess(value);
      return value;
    } else {
      onError("Snapshot does not exist");
      return null;
    }
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      onError(error.message);
    } else {
      onError(error?.toString());
    }
    return null;
  }
};
