import React from "react";
import { motion } from "framer-motion";

function CheckButton({ state = "default", onCheck, onRetry, onNext, disabled }) {
  // Không cần biến baseStyle nữa, vì đã gộp vào class .cst_btn
  
  const getButtonProps = () => {
    switch (state) {
      case "wrong":
        return {
          label: "Thử lại",
          onClick: onRetry,
          // Sử dụng class nền và class màu đỏ
          className: " cst_btn-danger",
        };
      case "correct":
        return {
          label: "Tiếp tục",
          onClick: onNext,
          // Sử dụng class nền và class màu xanh lá
          className: " cst_btn-success",
        };
      default: // 'default' state
        return {
          label: "Kiểm tra",
          onClick: onCheck,
          // Sử dụng class nền và class màu xanh dương
          // Trạng thái disabled sẽ được CSS tự động xử lý
          className: " cst_btn-primary",
        };
    }
  };

  const { label, onClick, className } = getButtonProps();

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {label}
    </button>
  );
}

function SkipButton({ onSkip }) {
  return (
    <motion.button
      // whileTap={{ scale: 0.9 }}
      // whileHover={{ scale: 1.05 }}
      onClick={onSkip}
      className="cst_btn"
    >
      Bỏ qua
    </motion.button>
  );
}

export { CheckButton, SkipButton };