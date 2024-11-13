'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { loginCheck } from '@/utils/auth';

const API_URLS = {
  CHECK_USER_ID: "api/user/check/userId",
  SIGNUP: "api/user/signup"
} as const;

export default function SignUp() {
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isUserIdChecked, setIsUserIdChecked] = useState<boolean>(false);
  const router = useRouter();

  // 로그인 체크
  const isLogin = async () => {
    let result = await loginCheck();
    if(result) {
      router.push('/');
    }
  }
  isLogin();
  

  const validateForm = (params: SignUpParams): string | null => {
    if (Object.values(params).some(value => value === "")) {
      return "모든 항목을 입력해주세요.";
    }
    if (!isUserIdChecked) {
      return "아이디 중복 확인을 해주세요.";
    }
    if (password !== confirmPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return null;
  };


  const handleCheckUserId = async () => {
    if (userId.length < 4) {
      alert("유저 아이디는 4자 이상이어야 합니다.");
      return;
    }

    try {
      const ret = await axios.get(`${API_URLS.CHECK_USER_ID}?userId=${userId}`);
      const message = ret.data.retCode === 200 
        ? "이미 사용중인 아이디입니다."
        : "사용 가능한 아이디입니다.";
      
      alert(message);
      if (ret.data.retCode !== 200) {
        setIsUserIdChecked(true);
      }
    } catch (err) {
      alert("아이디 중복 확인 중 오류가 발생했습니다.");
      console.error(err);
    }
  };


  interface SignUpParams {
    userId: string;
    username: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    phoneNumber: string;
  }
  
  const handleSignUp = async () => {
    const params: SignUpParams = {
      userId,
      username,
      password,
      passwordConfirm: confirmPassword,
      nickname,
      phoneNumber
    };

    const validationError = validateForm(params);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const ret = await axios.post(API_URLS.SIGNUP, params, {
        headers: { "Content-Type": "application/json" }
      });

      if (ret.data.retCode === 200) {
        alert("회원가입이 완료되었습니다.");
        router.push('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert(ret.data.retMsg || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (err) {
      alert("회원가입 중 오류가 발생했습니다.");
      console.error(err);
    }
  };


  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        {/* User ID Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">User ID</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 text-gray-700 border rounded-l-md focus:outline-none focus:border-indigo-400"
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-r-md hover:bg-indigo-600" onClick={handleCheckUserId}>
              Check
            </button>
          </div>
        </div>

        
        {/* Username Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 text-gray-700 border rounded-l-md focus:outline-none focus:border-indigo-400"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-400"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Nickname Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">Nickname</label>
          <input
            type="text"
            placeholder="Enter your nickname"
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-400"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-400"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button className="w-full py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </section>
  );
}