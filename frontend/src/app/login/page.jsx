"use client";
import { useAuth } from "@/context/authContext";
import { loginValidation } from "@/utils/validation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    await login(data.email, data.password);
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
            Đăng nhập tài khoản
          </h1>

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
              {...register("email", loginValidation.email)}
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
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-600"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", loginValidation.password)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
              placeholder="Nhập mật khẩu"
            />
            <div className="absolute right-3 top-[10px] flex items-center gap-1">
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
              >
                {showPassword ? <IoEyeOff size={18} /> : <IoIosEye size={20} />}
              </span>
              <span
                onClick={handleClearField("password")}
                className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center cursor-pointer"
              >
                <FaDeleteLeft size={18} />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            href="/login/forgot-password"
            className="text-sm text-blue-600 underline font-medium"
          >
            Quên mật khẩu?
          </Link>

          {/* Submit */}
          <button
            type="submit"
            className="cst_btn-primary w-full h-[50px] my-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            type="button"
            className="cst_btn w-full h-[56px] flex items-center justify-center gap-2   "
            >
            <FcGoogle size={24} />
            Đăng ký với Google
          </button>

          <p className="text-center text-sm mt-6">
            Tôi chưa có tài khoản{" "}
            <Link href="/register" className="text-blue-500 underline font-medium">
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
