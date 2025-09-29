import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        localization={{
          signIn: {
            start: {
              title: "Đăng nhập hệ thống Education",
            },
          },
        }}
        appearance={{
          elements: {
            card: "shadow-xl border rounded-xl p-6",
            headerTitle: "text-2xl font-bold text-blue-600",
          },
        }}
      />
    </div>
  );
}
