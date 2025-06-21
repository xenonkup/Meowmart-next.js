export default function ResetPassPage(){
    return(
        <>
         <section className="w-full min-w-[350px] md:min-w-[400px] p-6 bg-white  border border-teal-200 rounded-lg shadow-sm sm:p-8 md:p-10">
            <form className="space-y-6">
                <div className="py-2 rounded">
                    <h5 className="text-2xl font-bold text-teal-800 text-center">
                        ลืมรหัสผ่าน
                    </h5>
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        กรอกพาสเวิร์ดเดิม
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
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        กรอกพาสเวิร์ดเดิม
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
                <div className="flex items-start justify-between">
                    {/* ปุ่ม สมัครสมาชิก */}
                <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors duration-200 cursor-pointer"
                >
                    ยืนยัน
                </button>
                </div>
            </form>
        </section>
        </>
    )
}