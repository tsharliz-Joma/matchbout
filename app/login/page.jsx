"use client";
import {SessionProvider, signIn} from "next-auth/react";


const Login = () => {





  return (
    <SessionProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-sm w-full  shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Login
          </h2>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => signIn("google", {callbackUrl: "/"})}>
            Sign in
          </button>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Login;
