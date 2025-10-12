"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { auth, googleProvider } from "@/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const formattedUser = {
          id: firebaseUser.uid,
          username: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        setUser(formattedUser);

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(formattedUser));
        }
      } else {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Đăng nhập với Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Đăng nhập Google thành công!");
      setTimeout(() => {
        router.push("/learn");
      }, 500);
    } catch (error) {
      toast.error("Đăng nhập Google thất bại!");
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      toast.error( "Đăng nhập thất bại!");
    }
  };

  // Đăng ký
  const registerUser = async (username, email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (username) await updateProfile(user, { displayName: username });
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        router.push("/learn");
      }, 500);
    } catch (error) {
      toast.error("Đăng ký thất bại!");
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      toast.info("Đã đăng xuất!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      toast.error("Đăng xuất thất bại!");
    }
  };

  // Reset mật khẩu
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Kiểm tra email để đặt lại mật khẩu!");
    } catch (error) {
      toast.error("Không thể gửi email khôi phục!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registerUser,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider");
  return context;
};
