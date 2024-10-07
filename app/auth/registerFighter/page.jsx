"use client";
import React from "react";
import {SessionProvider} from "next-auth/react";
import RegisterFighterForm from "@/components/forms/register-fighter-form";

const RegisterFighterPage = () => {
  return (
    <SessionProvider>
      <h2 className="text-2xl font-bold text-center mb-6">
        Register a Fighter
      </h2>
      <RegisterFighterForm />
    </SessionProvider>
  );
};

export default RegisterFighterPage;
