"use client";

import { useState } from "react"; // ใช้สำหรับจัดการ state
import { createUserWithEmailAndPassword } from "firebase/auth"; // ฟังก์ชันสร้างผู้ใช้
import { auth, database } from "../../lib/firebase-config"; // นำเข้า auth และ database
import { ref, set } from "firebase/database"; // ฟังก์ชันสำหรับ Realtime Database
import { useRouter } from "next/navigation"; // นำเข้า useRouter สำหรับการนำทาง
import { toast } from "react-hot-toast"; // นำเข้า toast สำหรับการแจ้งเตือน
import Link from "next/link"; // ใช้สำหรับลิงก์ไปหน้าใหม่

export default function RegPage() {
    const [email, setEmail] = useState(""); // สร้าง state สำหรับอีเมล์
    const [password, setPassword] = useState(""); // สร้าง state สำหรับพาสเวิร์ด
    const [confirmPassword, setConfirmPassword] = useState(""); // สร้าง state สำหรับยืนยันพาสเวิร์ด
    const [error, setError] = useState(""); // แก้ไขตรงนี้
    const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง

    const handleRegister = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        // เช็ค email format เบื้องต้น
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("กรุณากรอกอีเมลให้ถูกต้อง");
            return;
        }
        if (password !== confirmPassword) {
            setError("พาสเวิร์ดไม่ตรงกัน กรุณาลองใหม่");
            toast.error("พาสเวิร์ดไม่ตรงกัน กรุณาลองใหม่");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            const user = userCredential.user;
            // บันทึกข้อมูลไปยัง Realtime Database
            await set(ref(database, `users/${user.uid}`), {
                email: user.email,
                createdAt: new Date().toISOString(),
            });
            setError(""); // ล้างข้อมูลผิดพลาด
            toast.success("สมัครสมาชิกสำเร็จ!"); // แจ้งเตือนเมื่อสมัครสำเร็จ
            setTimeout(() => {
                router.push("/login"); // นำทางไปหน้า Login หลังจากแจ้งเตือน
            }, 2000); // รอ 1.2 วินาที เพื่อให้ toast แสดงผล

        } catch (error) {
            console.error("Error during registration:", error); // บันทึก Error ไว้ตรวจสอบ
            if (error.code === "auth/email-already-in-use") {
                toast.error("อีเมลนี้ถูกใช้แล้ว กรุณาใช้อีเมลอื่น"); // ข้อความสำหรับอีเมลซ้ำ
            } else if (error.code === "auth/invalid-email") {
                toast.error("อีเมลไม่ถูกต้อง"); // ข้อความสำหรับอีเมลไม่ถูกต้อง
            } else {
                toast.error(error.message || "เกิดข้อผิดพลาดในการสมัคร"); // ข้อความผิดพลาดทั่วไป
            }
        }
    };

    return (
        <>
            <section className="w-full min-w-[350px] md:min-w-[400px] p-6 bg-white border border-teal-200 rounded-lg shadow-sm sm:p-8 md:p-10">
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="py-2 rounded">
                        <h5 className="text-2xl font-bold text-teal-800 text-center">
                            สร้างบัญชี
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
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            กรอกพาสเวิร์ด
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าพาสเวิร์ด
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            กรอกพาสเวิร์ดอีกครั้ง
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // อัปเดตค่าการยืนยันพาสเวิร์ด
                        />
                    </div>
                    <div className="flex items-start justify-between">
                        <button
                            type="submit"
                            className="w-full text-white bg-teal-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors duration-200 cursor-pointer"
                        >
                            สมัครสมาชิกใหม่
                        </button>
                    </div>
                    <div className="text-sm font-medium text-gray-500 text-center mt-4">
                        มีบัญชีแล้ว?{" "}
                        <Link
                            href="/login"
                            className="text-orange-600 hover:underline"
                        >
                            เข้าสู่ระบบ
                        </Link>
                    </div>
                </form>
            </section>
        </>
    );
}