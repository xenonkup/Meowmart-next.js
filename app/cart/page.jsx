"use client";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function cartPage() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // เพิ่มสถานะ Loading

  // โหลด cart จาก localStorage เมื่อ component ถูก (mount) หรืออัปเดต
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // จัดการซื้อซ้ำ
    const uniqueCart = []; // array ใหม่สำหรับเก็บสินค้าที่ไม่ซ้ำ
    savedCart.forEach((item) => {  // forEach: วนลูปทุกสินค้าใน savedCart
      const existingItem = uniqueCart.find((x) => x.id === item.id); // find: ตรวจหาสินค้าที่มี id ซ้ำใน uniqueCart
      if (existingItem) {  // ถ้าพบสินค้าซ้ำ 
        existingItem.quantity += item.quantity; // บวก quantity เข้าไป
      } else {
        uniqueCart.push({ ...item }); // เพิ่มสินค้าใหม่ถ้าไม่ซ้ำ
      }
    });
    // อัปเดต State cart ให้แสดงตะกร้าที่จัดการแล้ว
    setCart(uniqueCart);
    localStorage.setItem("cart", JSON.stringify(uniqueCart)); // บันทึก uniqueCart กลับไปที่ localStorage โดยแปลงเป็น JSON
  }, []);

  // ฟังก์ชันอัปเดตจำนวน
  const updateQuantity = (id, change) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change); // ไม่ให้ต่ำกว่า 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // บันทึกทันที
  };

  // คำนวณยอดรวม (ให้แน่ใจว่าใช้ discount ล่าสุด)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping - discount;

  // ใช้คูปอง
  const applyCoupon = () => {
    if (coupon.trim() === "MEOW10") { // ใช้ trim() เพื่อลบช่องว่าง
      setDiscount(20);
      alert("ใช้คูปองสำเร็จ! ได้รับส่วนลด 20 บาท");
    } else {
      setDiscount(0);
      alert("กรอกรหัสไม่ถูกต้อง");
    }
  };

  // ลบ item 
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

// ฟังก์ชันชำระเงิน
  const handlePayment = () => {
    setIsLoading(true); // เริ่ม Loading
    setTimeout(() => {
      localStorage.removeItem("cart"); // ล้างตะกร้าใน localStorage
      setCart([]); // รีเซ็ต cart ใน state
      alert("ชำระเงินสำเร็จ"); // แจ้งเตือนหลังล้าง
      setIsLoading(false); // สิ้นสุด Loading
      window.location.href = "/"; // ไปหน้าแรก
    }, 500); // หน่วงเวลา
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold text-[#027373]">ตระกร้าสินค้า</h1>

        <div className="bg-white rounded-lg shadow-md mt-5">
          {cart.length === 0 ? (
            <p className="p-4 text-center text-gray-600">ตระกร้าว่าง</p>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.name}`} // ใช้ key ไม่ซ้ำ
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                  <div>
                    <h3 className="text-[#027373] font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.price} บาท x
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[#027373] font-semibold">
                    {(item.price * item.quantity).toLocaleString()} บาท
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <section className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>ยอดสินค้า</span>
            <span>{subtotal.toLocaleString()} บาท</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>ค่าส่ง</span>
            <span>{shipping.toLocaleString()} บาท</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>ส่วนลด</span>
            <span>-{discount} บาท</span>
          </div>
          <div className="flex justify-between font-semibold text-[#027373] text-lg">
            <span>ยอดรวมสุทธิ</span>
            <span>{total.toLocaleString()} บาท</span>
          </div>
        </section>

        <section className="mt-6 p-4">
          <div className="flex justify-end gap-2">
            <input
              type="text"
              placeholder="กรอกรหัสคูปอง"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-50 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027373]"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="px-4 py-2 bg-[#207373] text-white rounded-lg hover:bg-[#015959]"
            >
              ใช้คูปอง
            </button>
          </div>
        </section>

        <button
          disabled={cart.length === 0 || isLoading} // ปิดปุ่มเมื่อ Loading
          onClick={handlePayment}
          className="w-full mt-6 bg-[#027373] text-white py-3 rounded-lg font-semibold hover:bg-[#015959] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              กำลังโหลด...
            </span>
          ) : (
            "ยืนยันการชำระเงิน"
          )}
        </button>
      </section>
    </>
  );
}