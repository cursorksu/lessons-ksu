import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore as getFirestoreNoLight  } from 'firebase/firestore';
import { fbConfig } from './fbConfig';
import { getAuth } from 'firebase/auth';

export const firebaseApp = initializeApp(fbConfig);
export const fireStore = getFirestore(firebaseApp);
export const fireStoreNoLight = getFirestoreNoLight(firebaseApp);

export const auth = getAuth(firebaseApp);
