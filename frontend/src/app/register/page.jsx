"use client";
import { useAuth } from "@/context/authContext";
import { registerValidation } from "@/utils/validation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const { registerUser, loginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    await registerUser(data.username, data.email, data.password);
  };

  const handleClearField = (fieldName) => () => setValue(fieldName, "");

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="w-full h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="w-[450px] shadow-md px-10 py-8 rounded-xl bg-white"
        >
          <h1 className="text-center text-3xl font-bold text-blue-500 mb-6">
            Tạo tài khoản
          </h1>

          {/* Username */}
          <div className="relative mb-6">
            <label
              htmlFor="username"
              className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-600"
            >
              Họ và tên
            </label>
            <input
              id="username"
              {...register("username", registerValidation.username)}
              type="text"
              className="w-full py-3 px-4 border border-gray-300 rounded-md outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
              placeholder="Ví dụ: Nguyễn Văn A"
            />
            <span
              onClick={handleClearField("username")}
              className="absolute right-3 top-[10px] w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
            >
              <FaDeleteLeft size={18} />
            </span>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <label
              htmlFor="email"
              className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", registerValidation.email)}
              type="email"
              className="w-full py-3 px-4 border border-gray-300 rounded-md outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
              placeholder=".....@email.com"
            />
            <span
              onClick={handleClearField("email")}
              className="absolute right-3 top-[10px] w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
            >
              <FaDeleteLeft size={18} />
            </span>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-600"
            >
              Tạo mật khẩu
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", registerValidation.password)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
              placeholder="Tối thiểu 8 ký tự"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[10px] w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
            >
              {showPassword ? <IoEyeOff size={18} /> : <IoIosEye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          

          {/* Submit */}
          <button
            type="submit"
            className="cst_btn-primary w-full h-[50px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            type="button"
            className="cst_btn w-full h-[56px] flex items-center justify-center gap-2 mt-3  "
            >
            <FcGoogle size={24} />
            Đăng ký với Google
          </button>

          {/* Redirect */}
          <p className="text-center text-sm mt-6">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-500 underline font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
