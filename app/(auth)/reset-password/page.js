"use client";

import { useState } from "react"; // ใช้สำหรับจัดการ state
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth"; // ฟังก์ชันอัปเดตรหัสผ่าน
import { auth, database } from "../../lib/firebase-config"; // นำเข้า auth และ database
import { ref, set } from "firebase/database"; // ฟังก์ชันสำหรับ Realtime Database
import { toast, Toaster } from "react-hot-toast"; // นำเข้า toast และ Toaster
import Link from "next/link"; // ใช้สำหรับลิงก์ไปหน้าใหม่

export default function ResetPassPage() {
  const [email, setEmail] = useState(""); // สร้าง state สำหรับอีเมล์
  const [currentPassword, setCurrentPassword] = useState(""); // สร้าง state สำหรับรหัสผ่านเดิม
  const [newPassword, setNewPassword] = useState(""); // สร้าง state สำหรับรหัสผ่านใหม่
  //   const [message, setMessage] = useState(""); // สร้าง state สำหรับข้อความแจ้งเตือน

  const handleResetPassword = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า

    try {
      // ยืนยันตัวตนด้วย email และ currentPassword
      const userCredential = await signInWithEmailAndPassword(auth,email,currentPassword);
      const user = userCredential.user;

      // ตรวจสอบความถูกต้องของรหัสผ่านใหม่
      if (newPassword.length < 6) {
        toast.error("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
        return;
      } else if (currentPassword === newPassword) {
        toast.error("รหัสผ่านซ้ำกับเดิม");
        return;
      } else {
        toast(""); // ล้างข้อความแจ้งเตือน
      }

      // อัปเดตรหัสผ่านใหม่
      await updatePassword(user, newPassword);
      // บันทึกการเปลี่ยนรหัสไปยัง Realtime Database
      await set(ref(database, `users/${user.uid}/passwordUpdated`), {
        updatedAt: new Date().toISOString(),
      });
      toast.success("เปลี่ยนรหัสผ่านสำเร็จ!");
      setTimeout(() => {
        toast(""); // ล้างข้อความหลัง 5 วินาที
      }, 5000);

    } catch (error) {
    // ตรวจสอบข้อผิดพลาดการแสดงข้อความแจ้งรหัสผ่านผิดพลาด
      if (error.code === "auth/wrong-password") {
        toast.error("รหัสผ่านเดิมผิด");
      } else if (error.code === "ไม่พบผู้ใช้งาน") {
        toast.error("ไม่พบอีเมลนี้");
      } else {
        toast.error("เกิดข้อผิดพลาด");
      }
    }
  };

  return (
    <>
      <Toaster />
      <section className="w-full min-w-[350px] md:min-w-[400px] p-6 bg-white border border-teal-200 rounded-lg shadow-sm sm:p-8 md:p-10">
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="py-2 rounded">
            <h5 className="text-2xl font-bold text-teal-800 text-center">
              เปลี่ยนรหัสผ่าน
            </h5>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              อีเมล์
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
              placeholder="Email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // อัปเดตค่าอีเมล์
            />
          </div>
          <div>
            <label
              htmlFor="current-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              รหัสผ่านเดิม
            </label>
            <input
              type="password"
              name="current-password"
              id="current-password"
              className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
              placeholder="••••••••"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)} // อัปเดตค่ารหัสผ่านเดิม
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
              placeholder="••••••••"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // อัปเดตค่ารหัสผ่านใหม่
            />
          </div>
          <div className="flex items-start justify-between">
            <button
              type="submit"
              className="w-full text-white bg-teal-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors duration-200 cursor-pointer"
            >
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 text-center mt-4">
            กลับไปที่{" "}
            <Link href="/login" className="text-orange-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
