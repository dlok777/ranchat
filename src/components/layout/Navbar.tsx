"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <button
          onClick={toggleDropdown} // 카테고리 클릭 시 드롭다운 메뉴 토글
          className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none"
        >
          <FontAwesomeIcon icon={faList} className="text-xl min-w-[1.25rem]" />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            카테고리
          </span>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 z-50" style={{ marginTop: 180 }}>
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li className="group relative">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    인테리어
                  </Link>
                  <ul className="absolute left-full top-0 hidden group-hover:block mt-0 ml-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800">
                    <li>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        가구
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        조명
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="group relative">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    잡화
                  </Link>
                  <ul className="absolute left-full top-0 hidden group-hover:block mt-0 ml-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800">
                    <li>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        문구류
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        생활용품
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    전자제품
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    패션
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </button>

        <div className={`hidden w-full md:block md:w-auto`} id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">서비스</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">이벤트</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">제휴신청</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar;