// นำเข้าเครื่องมือ initializeApp กล่องเครื่องมือตั้งค่า firebase
import { initializeApp } from "firebase/app"
// นำเข้าเครื่องมือ firebase Auth กล่องเครื่องมือ ยืนยันตัวตนหรือล็อคอิน
import { getAuth } from "firebase/auth"

// สร้าง กล่่อง firebaseConfig ที่เก็บข้อมูลของ App
// process.env. เก็บข้อมูลลับในไฟล์แยก
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}


// นำ firebaseConfig ไปให้ initaializeApp ไปตั้งค่า
const app = initializeApp(firebaseConfig)

// ส่ง auth ออกไปให้ไปใช้ในไฟล์อื่นในโปรเจคนะ
export const auth = getAuth(app);

// การใช้ NEXT_PUBLIC_ ข้างหน้า หมายถึงตัวแปรที่สามารถเข้าถึง ฝั่ง cilent และ server ได้ 