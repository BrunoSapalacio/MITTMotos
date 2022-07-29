import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiCqDi74qrxldgxTG3VxdkHmgQalFDxgo",
  authDomain: "mittmotos-d19fd.firebaseapp.com",
  projectId: "mittmotos-d19fd",
  storageBucket: "mittmotos-d19fd.appspot.com",
  messagingSenderId: "860748106467",
  appId: "1:860748106467:web:fa9984e18c6dac97ddd3d6",
  measurementId: "G-B69XEW5PXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;