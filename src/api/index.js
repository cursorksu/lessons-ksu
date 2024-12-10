import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { fbConfig } from './fbConfig';

const FB_CONFIG_Intermediate = process.env.REACT_APP_FB_CONFIG.replace(
  /\\\\/g,
  '\\'
);
const fbConfigEnv = JSON.parse(FB_CONFIG_Intermediate.replace(/\\"/g, '"'));

export const firebaseApp = initializeApp(fbConfigEnv || fbConfig);
export const fireStore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
