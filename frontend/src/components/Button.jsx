"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import Link from "next/link";

// -------------------- CheckButton --------------------
function CheckButton({ state = "default", onCheck, onRetry, onNext, disabled }) {
  const getButtonProps = () => {
    switch (state) {
      case "wrong":
        return {
          label: "Thử lại",
          onClick: onRetry,
          className: "cst_btn-danger",
        };
      case "correct":
        return {
          label: "Tiếp tục",
          onClick: onNext,
          className: "cst_btn-success",
        };
      default:
        return {
          label: "Kiểm tra",
          onClick: onCheck,
          className: "cst_btn-primary",
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

// -------------------- SkipButton --------------------
function SkipButton({ onSkip }) {
  return (
    <motion.button
      onClick={onSkip}
      className="cst_btn"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
    >
      Bỏ qua
    </motion.button>
  );
}

// -------------------- LessonButton --------------------


// -------------------- Exports --------------------
export { CheckButton, SkipButton };
