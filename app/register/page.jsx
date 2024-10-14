"use client";
import React, {useState, useEffect} from "react";
import RegistrationForm from "@/components/forms/registration-form";

const RegistrationPage = () => {
  const handleSubmit = async (data) => {
    const submitData = {
      name: `${data.get("firstName")} ${data.get("lastName")}`,
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phoneNumber"),
      profilePicture: data.get("profilePicture"),
      location: data.get(""),
    };

    try {
      const response = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Registration successful");
      } else {
        console.error("Error registering user");
      }
    } catch (e) {
      setShowError(true);
    }
  };

  return (
    <div>
      <h1 className="text-center">Registration</h1>
      <RegistrationForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegistrationPage;
