import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    // databaseURL: "https://mock-fasunok-default-rtdb.firebaseio.com/",
    projectId: 'mock-fasunok'
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database }