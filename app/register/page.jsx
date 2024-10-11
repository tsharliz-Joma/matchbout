"use client";
import React, {useState, useEffect} from "react";
import RegistrationForm from "@/components/forms/registration-form";

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    const submitData = {
      name: `${data.get("firstName")} ${data.get("lastName")}`,
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phoneNumber"),
      profilePicture: data.get("profilePicture"),
      location: data.get(""),
    };

    console.log(submitData)
  };

  return (
    <div>
      <h1 className="text-center">Registration</h1>
      <RegistrationForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegistrationPage;
