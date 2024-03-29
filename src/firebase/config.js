// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 인증기능
import { getAuth } from "firebase/auth";

// 데이터 베이스
import { Timestamp, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 사용자 인증
const appAuth = getAuth(app);

// 데이터 베이스
const appFireStore = getFirestore(app);

// 날짜를 추가할때 firebase server시간 기준으로 하자.
const timestamp = Timestamp;

// 외부에서 활용가능하도록 export한다,
export { appAuth, appFireStore,timestamp };
