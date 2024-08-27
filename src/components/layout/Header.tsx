"use client";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";


export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto">
        <div
          id="drawer-top-example"
          className={`fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} bg-white dark:bg-gray-800`}
          tabIndex={-1}
          aria-labelledby="drawer-top-label"
        >
          <h5 id="drawer-top-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            Top drawer
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-top-example"
            aria-controls="drawer-top-example"
            onClick={toggleDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div>
            <SearchBox />
          </div>

        </div>
        <div className="flex justify-end items-center p-5">
          <div className="flex">
            <Link href="#" className="after:content-['|'] after:px-2 last:after:content-none text-slate-500 text-sm"><span>로그인</span></Link>
            <Link href="#" className="after:content-['|'] after:px-2 last:after:content-none text-slate-500 text-sm"><span>회원가입</span></Link>
            <Link href="#" className="after:content-['|'] after:px-2 last:after:content-none text-slate-500 text-sm"><span>고객센터</span></Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center p-5">
          <div className="flex justify-start">
            <Image src="/logo.png" alt="Logo" width={100} height={46} layout="intrinsic" />
          </div>

          <div className="flex justify-center">
            <div className="hidden md:block w-full">
              <SearchBox />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h6M3 12h6M3 12l9-9m0 18L3 12M21 12l-9-9m9 18l-9-9"></path>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h6M3 12h6M3 12l9-9m0 18L3 12M21 12l-9-9m9 18l-9-9"></path>
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-200 rounded-full block md:hidden" onClick={toggleDrawer}>
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>

          </div>
        </div>
        <Navbar />
      </div>
    </header>
  )
}