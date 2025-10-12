export const registerValidation = {
  username: {
    required: { value: true, message: "Vui lòng nhập tên người dùng" },
    minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
  },
  email: {
    required: { value: true, message: "Vui lòng nhập email" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },
  password: {
    required: { value: true, message: "Vui lòng nhập mật khẩu" },
    minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
  },
};

export const loginValidation = {
    email: {
    required: { value: true, message: "Vui lòng nhập email" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },
  password: {
    required: { value: true, message: "Vui lòng nhập mật khẩu" },
  },
}