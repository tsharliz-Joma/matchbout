"use client";
import React, {useState} from "react";
import RegistrationForm from "@/components/forms/registration-form";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit goes here
  // Here is where i get the form information and hol
  const handleSubmit = async (data) => {};

  return (
    <div>
      <h1 className="text-center">Registration</h1>
      <RegistrationForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default SignupPage;
