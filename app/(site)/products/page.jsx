"use client";

import { use, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ShopProductData from "../data/ShopProduct.json";

export default function shopProductPage() {
  // ค้นหา
  const [search, setSearch] = useState(""); // ใช้ useState เก็บคำค้นหา (เริ่มว่าง)
  // หมวดหมู่
  const [category, setCategory] = useState("All"); // ใช้ useState เก็บหมวดหมู่ (เริ่มที่ "All")

  const [cart , setCart] = useState("") // ใช้ตระกร้า

  const addToCart = (product) => {
    // เข้าถึง Product จำนวน 1 
    const cartItem = {...product , quantity : 1};
    // JSON.parse แปลง JSON String ให้อยู่ในรูปแบบ Object
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...existingCart, cartItem]
    // JSON.stringify คือ แปลง Object ให้อยู่ในรูปแบบเป็น JSON String
    localStorage.setItem("cart" , JSON.stringify(updatedCart))
    setCart(updatedCart),
    alert(`${product.name} ถูกเพิ่มเข้าตระกร้า`)
  }

  // กรองสินค้าจากข้อมูลทั้งหมดใน ShopProductData ตามหมวดหมู่และคำค้นหา
  const filterProduct =
    ShopProductData?.products?.filter((product) => {
      const matchesCategory = category === "All" || product.categories === category; // ตรวจสอบหมวดหมู่
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()); // ตรวจสอบคำค้นหา
      return matchesCategory && matchesSearch; // คืนค่า true ถ้าตรงทั้งสองเงื่อนไข
    }) || []; // ถ้าไม่มีข้อมูลคืน array ว่าง

  return (
    <>
      {/* ค้นหาสินค้า */}
      <section className="max-w-7xl mx-auto px-4 py-10 border-b-1">
        <form className="max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="กรอกชื่อสินค้าที่นี้"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027373]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearch className="absolute right-3 text-gray-400 text-xl" />
          </div>
        </form>
      </section>

      {/* ส่วนหมวดหมู่อาหารแมว */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="mb-4 text-4xl font-semibold text-[#027373] md:text-2xl lg:text-3xl">
            อาหารแมว
            <span className="bg-green-100 text-green-800 text-sm font-medium ml-2 px-2 py-1 rounded-full">
              {filterProduct.length} รายการ
            </span>
          </h2>
          <form className="flex items-center gap-4">
            <label className="text-[#027373] text-lg font-medium whitespace-nowrap">
              เลือกหมวดหมู่
            </label>
            <select
              className="w-48 bg-gray-50 border border-gray-300 text-[#027373] text-sm font-medium rounded-lg p-2.5 focus:ring-2 focus:ring-[#027373] focus:border-[#027373] focus:outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">ทั้งหมด</option>
              {/* แสดงหมวดหมู่จาก JSON */}
              {ShopProductData?.categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </section>

       {/* รายละเอียดสินค้า */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProduct.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.name}/${product.id}`}
            >
              <div className="group relative block overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={100}
                  height={100}
                  className="w-[150px] h-[150px] object-contain rounded transition-all duration-500 group-hover:scale-105 mx-auto"
                />
                <div className="relative border border-gray-100 bg-white p-4 flex flex-col min-h-[200px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[#027373] font-semibold text-lg">
                      {product.price} บาท
                    </p>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-[#027373] line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                {/* ปุ่ม Add to Cart และ Buy Now */}
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
                      <FaCartPlus className="text-lg" />
                      Add to Cart
                      
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-sm bg-[#027373] px-2 py-2 text-sm font-medium text-white transition hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaCartPlus className="text-lg" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
