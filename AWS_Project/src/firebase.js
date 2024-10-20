
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// fcm 클라우드 메시징



// Your web app's Firebase configuration
// storageBucket값 잘못주었음 
const firebaseConfig = {
  // api 키
  apiKey:  import.meta.env.VITE_FIREBASE_INITIALIZE_API_KEY,
  authDomain: "project-mentalcare.firebaseapp.com",
  projectId: "project-mentalcare",
  // 스토리지 버킷값: ㅅㅂ 이거 실수로 오타내서 데이터 저장이 안되고 있었음;;; 
  storageBucket: "project-mentalcare.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_INITIALIZE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_INITIALIZE_APP_ID
};

//파이어 베이스 실행 
// firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);

// 우리가 활성화환 인증 product에 대한 접근 권한 요청
 const auth= getAuth(app);

//스토리지 생성 
 const storage = getStorage(app);

//DB생성 
 const db = getFirestore(app);



export {auth, storage, db,app}

