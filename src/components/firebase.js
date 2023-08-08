
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUfWYoSlKwS3ZkCYLVn0EL-nP_FXOPRjo",
  authDomain: "masonlist-6cc7d.firebaseapp.com",
  databaseURL: "https://masonlist-6cc7d-default-rtdb.firebaseio.com",
  projectId: "masonlist-6cc7d",
  storageBucket: "masonlist-6cc7d.appspot.com",
  messagingSenderId: "831237008624",
  appId: "1:831237008624:web:02917cdfc040f0c28aa635",
  measurementId: "G-3Z005189GM"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export  default app;