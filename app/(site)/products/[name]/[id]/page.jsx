"use client";

import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Image from "next/image";
import ShopProductData from "../../../data/ShopProduct.json";
import { useParams } from "next/navigation";

export default function ProductView() {
  // ต้องรู้ว่าลูกค้าดูสินค้าชิ้นไหน (useParams)
  const { id, name } = useParams(); // ดึง id และ name จาก URL

  // จัดการจำนวนสินค้า (useState สำหรับ quantity)
  const [quantity, setQuantity] = useState(1);

  // ค้นหาสินค้าจาก ShopProductData ตาม id และ name
  const product = ShopProductData?.products?.find(
    (p) => p.id === parseInt(id) && p.name === decodeURIComponent(name)
  );

  // ฟังก์ชันเพิ่มลงตะกร้า
  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      alt: product.alt,
      quantity: quantity, // ใช้จำนวนที่เลือก
    };
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`เพิ่ม ${product.name} จำนวน ${quantity} ชิ้นลงตะกร้า!`);
  };

  // จัดการกรณีไม่พบสินค้า
  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-[#027373] text-center">
          ไม่พบสินค้า
        </h2>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รูปภาพสินค้า */}
        <div className="relative">
          <Image
            src={product.image}
            alt={product.alt}
            width={500}
            height={500}
            className="w-full h-[400px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-[#027373]">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-[#027373]">
              {product.price} บาท
            </p>
            {product.originalPrice && (
              <p className="text-lg text-gray-400 line-through">
                {product.originalPrice} บาท
              </p>
            )}
            {product.originalPrice && (
              <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                ลดราคา
              </span>
            )}
          </div>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-700">
            <span className="font-medium">หมวดหมู่:</span>{" "}
            {product.categories || product.category}
          </p>

          {/* จำนวนสินค้า */}
          <div className="flex items-center gap-4">
            <label className="text-[#027373] font-medium">จำนวน:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#027373]"
            />
          </div>

          {/* ปุ่ม Add to Cart และ Buy Now */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={addToCart}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
            >
              <FaCartPlus className="text-lg" />
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
                  quantity: quantity, // ใช้จำนวนที่เลือก
                };
                const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                const updatedCart = [...existingCart, cartItem];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                window.location.href = "/cart"; // พาไปหน้า cartPage
              }}
              className="flex-1 rounded-lg bg-[#027373] px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ส่วนเสริม: คำอธิบายเพิ่มเติมหรือรีวิว */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-[#027373] mb-4">
          รายละเอียดเพิ่มเติม
        </h2>
        <p className="text-gray-600">
          {product.description}
        </p>
      </div>
    </section>
  );
}