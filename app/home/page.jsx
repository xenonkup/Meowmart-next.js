"use client";

// นำเข้า Hook และ Component ที่ใช้
import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa"; // นำเข้าไอคอนรถเข็น
import Bannerimages from "../data/Banner.json"; // นำเข้าข้อมูลแบนเนอร์จาก JSON
import LogoProduct from "../data/LogoProducts.json"; // นำเข้าข้อมูลหมวดหมู่จาก JSON
import WhyChooseUs from "../data/WhyChooseUs.json"; // นำเข้าข้อมูลเหตุผลที่เลือกเรา
import ShopProductData from "../data/ShopProduct.json"; // นำเข้าข้อมูลสินค้าจาก JSON
import Image from "next/image"; // นำเข้า Component รูปภาพจาก Next.js
import Link from "next/link"; // นำเข้า Component ลิงก์จาก Next.js

export default function HomePage() {
  // ใช้ useState เก็บตำแหน่งแบนเนอร์ที่กำลังแสดง (เริ่มที่ 0)
  const [activeItem, setActiveItem] = useState(0);

  // ตระกร้า
  const [cart, setCart] = useState("")

  // ฟังก์ชันเลื่อนแบนเนอร์ไปข้างหน้า
  const nextSlide = () => {
    setActiveItem((current) =>
      current === Bannerimages.length - 1 ? 0 : current + 1 // ถ้าถึงอันสุดท้ายกลับไปอันแรก
    );
  };

  // ฟังก์ชันเลื่อนแบนเนอร์ไปข้างหลัง
  const prevSlide = () => {
    setActiveItem((current) =>
      current === 0 ? Bannerimages.length - 1 : current - 1 // ถ้าถึงอันแรกไปอันสุดท้าย
    );
  };

  // ใช้ useEffect ทำแบนเนอร์เลื่อนอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // ตั้งเวลาทุก 5000ms (5วินาที)
    return () => clearInterval(interval); // คืนค่าเพื่อหยุดเมื่อ Component ถูกถอน
  });

  const addToCart = (product) => {
    // เข้าถึง product ทั้งหมด จำนวน 1
    const cartItem = { ...product, quantity: 1 };
    //  JSON.parse แปลง JSON String ให้อยู่ในรูปแบบ Object
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...existingCart, cartItem]
    // JSON.stringify คือ แปลง Object ให้อยู่ในรูปแบบเป็น JSON String
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart)
    alert(`${product.name} ถูกเพิ่มเข้าตระกร้า`)
  }

  return (
    <>
      <main className="min-h-screen"> {/* Main container ให้สูงเต็มหน้าจอ */}
        {/* ส่วนแบนเนอร์ */}
        <section className="relative w-full" data-carousel="slide">
          <div className="relative h-60 overflow-hidden md:h-150" style={{ position: "relative" }}> {/* ความสูงแบนเนอร์ ปรับใน md เป็น 150 */}
            {Bannerimages.map((banner, index) => (
              <div
                key={banner.id} // Key สำหรับแต่ละแบนเนอร์
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${activeItem === index ? "opacity-100" : "opacity-0" // แสดงเฉพาะแบนเนอร์ที่ active
                  }`}
              >
                <Image
                  src={banner.image} // รูปภาพจาก JSON
                  alt={banner.alt} // คำอธิบายภาพ
                  fill // ใช้ fill เพื่อให้ภาพเต็มพื้นที่
                  priority={index === 0} // โหลดภาพแรกก่อน
                  className="object-cover" // ปรับภาพให้ครอบคลุม
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={prevSlide} // เรียกฟังก์ชันเลื่อนไปข้างหลัง
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span> {/* คำอธิบายสำหรับ Screen Reader */}
            </span>
          </button>
          <button
            type="button"
            onClick={nextSlide} // เรียกฟังก์ชันเลื่อนไปข้างหน้า
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span> {/* คำอธิบายสำหรับ Screen Reader */}
            </span>
          </button>
        </section>

        {/* ส่วนสินค้า */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold text-[#027373] mb-6 text-center">
            {ShopProductData.title1} {/* หัวข้อจาก JSON */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* ตั้งคอลัมน์ตามขนาดหน้าจอ */}
            {ShopProductData.products.slice(0, 4).map((product) => (
              <Link
                key={product.id} // Key สำหรับแต่ละสินค้า
                href={`/products/${encodeURIComponent(product.name)}/${product.id}`} // ลิงก์ไปหน้า ProductView
                className="group relative block overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px] object-contain rounded transition-all duration-500 group-hover:scale-105 mx-auto"
                />
                <div className="relative border border-gray-100 bg-white p-4 flex flex-col min-h-[200px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[#027373] font-semibold text-lg">
                      {product.price} บาท {/* ราคาสินค้า */}
                    </p>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-[#027373] line-clamp-2">
                    {product.name} {/* ชื่อสินค้า จำกัด 2 บรรทัด */}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {product.description} {/* คำอธิบาย จำกัด 3 บรรทัด */}
                  </p>
                  <div className="mt-auto flex flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      className="flex-1 rounded-sm bg-gray-100 px-2 py-2 text-sm font-medium text-gray-900 transition hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                      value={cart}
                      onClick={(e) => {
                        e.preventDefault()  // ป้องกันการไปหน้า ProductView
                        addToCart(product) // เรียกฟังก์ชันเพิ่มตะกร้า
                      }}
                    >
                      <FaCartPlus className="text-lg" /> {/* ไอคอนรถเข็น */}
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cartItem = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          alt: product.alt,
                          quantity: 1,
                        }; // สร้างข้อมูลสินค้าในตะกร้า
                        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]"); // ดึงตะกร้าเก่า
                        const updatedCart = [...existingCart, cartItem]; // เพิ่มสินค้าใหม่
                        localStorage.setItem("cart", JSON.stringify(updatedCart)); // บันทึกตะกร้า
                        window.location.href = "/cart"; // ไปหน้า cart
                      }}
                      className="flex-1 rounded-sm bg-[#027373] px-2 py-2 text-sm font-medium text-white transition hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaCartPlus className="text-lg" /> {/* ไอคอนรถเข็น */}
                      Buy Now {/* ปุ่มซื้อทันที */}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ส่วนหมวดหมู่สินค้า */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-[#027373] mb-8 text-center">
            {LogoProduct.title} {/* หัวข้อจาก JSON */}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"> {/* ตั้งคอลัมน์ตามขนาดหน้าจอ */}
            {LogoProduct.LogoProductsObject.map((itemLogoProduct) => (
              <div
                key={itemLogoProduct.id} // Key สำหรับแต่ละหมวดหมู่
                className="hover:shadow-lg transition-shadow rounded-lg p-4" // เงาขยายเมื่อชี้
              >
                <div className="h-[150px] flex flex-row justify-center items-center">
                  <Image
                    src={itemLogoProduct.image} // รูปภาพจาก JSON
                    alt={itemLogoProduct.name} // คำอธิบายภาพ
                    width={150}
                    height={150}
                    className="object-contain" // ปรับภาพให้พอดี
                  />
                </div>
                <h3 className="text-center mt-2 font-medium">{itemLogoProduct.name} {/* ชื่อหมวดหมู่ */}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ส่วนเหตุผลที่เลือกเรา */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-[#027373] mb-12 text-center">
            {WhyChooseUs.title} {/* หัวข้อจาก JSON */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* ตั้งคอลัมน์ตามขนาดหน้าจอ */}
            {WhyChooseUs.reasons.map((reason) => (
              <div
                key={reason.id} // Key สำหรับแต่ละเหตุผล
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" // เอฟเฟกต์เมื่อชี้
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={reason.icon} // ไอคอนจาก JSON
                      width={60}
                      height={60}
                      alt={reason.alt} // คำอธิบายไอคอน
                      className="transform hover:scale-110 transition-all duration-300" // ขยายเมื่อชี้
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {reason.title} {/* หัวข้อเหตุผล */}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {reason.desc} {/* คำอธิบายเหตุผล */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}