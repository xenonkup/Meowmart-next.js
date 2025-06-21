"use client" 

export default function LoginPage() {
    return (
        <>
        <section className="w-full min-w-[350px] md:min-w-[400px] p-6 bg-white border border-teal-200 rounded-lg shadow-sm sm:p-8 md:p-10">
            <form className="space-y-6">
                <div className="py-2 rounded">
                    <h5 className="text-2xl font-bold text-teal-800 text-center">
                        Meowmart Welcome
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
                    />
                </div>
                {/* บันทึกก่อนเข้าสู่ระบบ */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-teal-300 rounded bg-white focus:ring-2 focus:ring-teal-400"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900"
                        >
                            บันทึกก่อนเข้าสู่ระบบ
                        </label>
                    </div>
                    {/* ลืมรหัสผ่าน */}
                    <a href="#" className="text-sm text-orange-600 hover:underline hover:text-orange-700">
                        ลืมรหัสผ่าน ?
                    </a>
                </div>
                {/* ปุ่ม login */}
                <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors duration-200 cursor-pointer"
                >
                    เข้าสู่ระบบ
                </button>
                <div className="text-sm font-medium text-gray-500 text-center">
                    ยังไม่บัญชี ? {" "}
                    <a href="#" className="text-orange-600 hover:underline hover:text-orange-700">
                        สร้างบัญชี
                    </a>
                </div>
            </form>
        </section>
        </>
    );
}
