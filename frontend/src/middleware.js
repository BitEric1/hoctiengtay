import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/"], // mấy route public, ai cũng xem được
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
