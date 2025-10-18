"use client";
import LeftNavbar from "@/components/LeftNavbar";
import { useState } from "react";
import { toast } from "react-toastify";

const initial = { name: "", phone: "", email: "", message: "", website: "" };

export default function Page() {
    const [form, setForm] = useState(initial);
    const [loading, setLoading] = useState(false);

    const onChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");

    async function onSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Vui lòng nhập Họ tên, Email và Nội dung");
            return;
        }
        if (!isEmail(form.email)) {
            toast.error("Email không hợp lệ");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/contact`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.ok === false)
                throw new Error(data?.error || "Gửi thất bại");

            toast.success("Cảm ơn phản hồi của bạn ✨");
            setForm(initial); // reset form
        } catch (err) {
            toast.error(err.message || "Không gửi được, thử lại sau");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex lg:mt-20 mt-[120px]">
            <LeftNavbar />
            <div className="w-full py-4">
                <form
                    onSubmit={onSubmit}
                    className="w-full lg:w-5/12 mx-auto my-10 bg-white shadow-lg rounded-xl py-8 px-4"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
                        Liên hệ với chúng tôi
                    </h2>

                    <div className="relative mb-5">
                        <label
                            htmlFor="fullname"
                            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
                        >
                            Họ và tên
                        </label>
                        <input
                            id="fullname"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="relative mb-5">
                        <label
                            htmlFor="phone"
                            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
                        >
                            Số điện thoại
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            type="tel"
                            placeholder="Nhập số điện thoại của bạn"
                            className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="relative mb-5">
                        <label
                            htmlFor="email"
                            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            type="email"
                            placeholder="Nhập Email của bạn"
                            className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="relative mb-6">
                        <label
                            htmlFor="message"
                            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
                        >
                            Nội dung
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            rows={5}
                            placeholder="Nhập nội dung bạn muốn gửi..."
                            className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                        />
                    </div>

                    {/* Honeypot chống spam */}
                    <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={onChange}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`cst_btn-primary ${
                                loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Đang gửi…" : "Gửi liên hệ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
