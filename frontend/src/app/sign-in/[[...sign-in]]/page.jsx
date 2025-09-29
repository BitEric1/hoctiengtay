import { SignIn } from "@clerk/nextjs";

export default function SignInComponent() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
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
