"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa"; // เปลี่ยนเป็น FaUserCircle

export default function Navbar() {
  // state to manage จัดการเปิดปิดเมนู Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // state to manage จัดการเปิดปิดเมนู Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // เพิ่ม state สำหรับนับจำนวน
  const [cartCount, setCartCount] = useState(0);

  // โหลดและอัปเดตจำนวนสินค้าจาก localStorage แบบเรียลไทม์
  useEffect(() => {
    const updateCartCount = () => {
      // JSON.parse แปลง JSON String ให้อยู่ในรูปแบบ Object
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = savedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    // อัปเดตครั้งแรก
    updateCartCount();

    // ฟังการเปลี่ยนแปลงของ localStorage (จากแท็บอื่น)
    window.addEventListener("storage", updateCartCount);

    // ตรวจสอบการเปลี่ยนแปลงทุก 1 วินาที (สำหรับหน้าเดียวกัน)
    const interval = setInterval(updateCartCount, 1000); // เปลี่ยน 0 เป็น 1000ms เพื่อลด CPU

    // ล้าง event listener และ interval เมื่อ unmount
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const activateLink = (isActive) => {
    return isActive
      ? "bg-gray-300 bg-opacity-60 rounded px-3 py-2"
      : "hover:bg-gray-300 hover:bg-opacity-60 rounded px-3 py-2 hover:text-orange-500 cursor-pointer";
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 z-50">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/home">
              <Image
                src="/assets/logo/LogoMeowMart.png"
                alt="MeowMart Logo"
                width={100}
                height={100}
                className="object-fill"
                style={{ width: "75px", height: "60px" }} // รักษาอัตราส่วน
              />
            </Link>
            {/* Desktop Menu */}
            <ul className="hidden md:flex justify-center items-center space-x-6 text-[#027373] font-medium">
              <li>
                <Link href="/home" className={activateLink(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={activateLink(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className={activateLink(false)}>
                  Cart Product
                </Link>
              </li>
              <li>
                <Link href="/blog" className={activateLink(false)}>
                  Blog
                </Link>
              </li>
            </ul>

            {/* Shoping Icon */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Link href="/cart">
                  <GiShoppingCart className="w-8 h-8 text-[#FF6B6B]" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Desktop ปุ่ม Login */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none w-full text-left flex items-center"
                >
                  <FaUserCircle className="w-8 h-8 text-[#027373] hover:text-orange-500 mr-2" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-[#027373] hover:bg-gray-100 rounded-t"
                    >
                      Login
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-[#027373] hover:bg-gray-100 rounded-b"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col space-y-4 mt-4 text-[#027373] font-medium">
              <li>
                <Link href="/home" className={activateLink(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={activateLink(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className={activateLink(false)}>
                  Cart Product
                </Link>
              </li>
              <li>
                <Link href="/blog" className={activateLink(false)}>
                  Blog Post
                </Link>
              </li>
              <li className="relative">
                <Link href="/cart" className="flex items-center px-3 py-2">
                  <GiShoppingCart className="w-8 h-8 text-[#FF6B6B]" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              {/* ปุ่ม Login Mobile */}
              <li className="relative px-3 py-2">
                <button
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="focus:outline-none w-full text-left flex items-center"
                >
                  <FaUserCircle className="w-8 h-8 text-[#027373] hover:text-orange-500 mr-2" />
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 w-full bg-white border rounded shadow-lg z-20">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-[#027373] hover:bg-gray-100 rounded-t w-full"
                    >
                      Login
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-[#027373] hover:bg-gray-100 rounded-b w-full"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}