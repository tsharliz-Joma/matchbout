"use client";
import { SessionProvider, signIn } from "next-auth/react";
import AuthButton from "@/components/ux/button/index";

export default function SignIn() {
  return (
    <SessionProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-sm w-full  shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Sign In
          </h2>
          <AuthButton />
        </div>
      </div>
    </SessionProvider>
  );
}
