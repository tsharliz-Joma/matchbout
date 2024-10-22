"use client";
import React, {useState, useEffect} from "react";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";


const RegistrationPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    const submitData = {
      name: `${data.get("firstName")} ${data.get("lastName")}`,
      email: data.get("email"),
      password: data.get("password"),
      mobile: data.get("phoneNumber"),
      city: data.get("city"),
    };

    try {
      const response = await fetch("api/methods", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error(error);
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
