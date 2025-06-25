"use client";

import { useState } from "react"; // เพิ่ม useEffect
import { signInWithEmailAndPassword } from "firebase/auth"; // เพิ่ม signOut
import { auth } from "../../lib/firebase-config"; // นำเข้า auth
import { useRouter } from "next/navigation"; // นำเข้า useRouter สำหรับการนำทาง
import { toast , Toaster} from "react-hot-toast"; // นำเข้า toast สำหรับการแจ้งเตือน
import Link from "next/link"; // ใช้สำหรับลิงก์ไปหน้าใหม่

export default function LoginPage() {
  const [email, setEmail] = useState(""); // สร้าง state สำหรับอีเมล์
  const [password, setPassword] = useState(""); // สร้าง state สำหรับพาสเวิร์ด
  const [error, setError] = useState(""); // สร้าง state สำหรับข้อความผิดพลาด
  const [rememberMe, setRememberMe] = useState(false); // State สำหรับ checkbox
  const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง

  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      await signInWithEmailAndPassword(auth, email, password); // ล็อกอินด้วยอีเมล์และพาสเวิร์ด
      if (rememberMe) {
        // บันทึกอีเมลและรหัสผ่านใน localStorage ถ้ากด checkbox
        localStorage.setItem("rememberedCredentials", JSON.stringify({ email, password }));
      } else {
        // ลบข้อมูลที่บันทึกถ้าไม่เลือก remember me
        localStorage.removeItem("rememberedCredentials");
      }
      setError(""); // ล้างข้อมูลผิดพลาด
      toast.success("เข้าสู่ระบบสำเร็จ"); // แจ้งเตือนเมื่อสมัครสำเร็จ
      setTimeout(() => {
        router.push("/home"); // นำทางไปหน้าแรกหลังล็อกอินสำเร็จ
      }, 1200);

    } catch (error) {
      console.error("Error during login:", error); // บันทึก Error ไว้ตรวจสอบ
      if (error.code === "auth/invalid-credential") {
        toast.error("ไม่พบผู้ใช้งาน"); // ข้อความเฉพาะสำหรับ invalid-credential
      } else {
        toast.error(error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"); // ข้อความผิดพลาดทั่วไป
      }
    }
  };

  return (
    <>
      <Toaster />
      <section className="w-full min-w-[350px] md:min-w-[400px] p-6 bg-white border border-teal-200 rounded-lg shadow-sm sm:p-8 md:p-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="py-2 rounded">
            <h5 className="text-2xl font-bold text-teal-800 text-center">
              Meowmart Welcome
            </h5>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}{" "}
          {/* แสดงข้อผิดพลาดถ้ามี */}
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
              onChange={(e) => setEmail(e.target.value)} // อัปเดตค่าอีเมล์เมื่อมีการเปลี่ยนแปลง
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              พาสเวิร์ด
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-white border border-teal-300 text-gray-900 text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าพาสเวิร์ดเมื่อมีการเปลี่ยนแปลง
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-teal-300 rounded bg-white focus:ring-2 focus:ring-teal-400"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} // อัปเดตสถานะ checkbox
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                บันทึกก่อนเข้าสู่ระบบ
              </label>
            </div>
            <Link
              href="/reset-password"
              className="text-sm text-orange-600 hover:underline hover:text-orange-700"
            >
              ลืมรหัสผ่าน ?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-teal-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors duration-200 cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>
          <div className="text-sm font-medium text-gray-500 text-center">
            ยังไม่บัญชี ?{" "}
            <Link
              href="/register"
              className="text-orange-600 hover:underline hover:text-orange-700"
            >
              สร้างบัญชี
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
