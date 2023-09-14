import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { fbConfig } from "./fbConfig";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp(fbConfig, "Lessons");
export const fireStore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
