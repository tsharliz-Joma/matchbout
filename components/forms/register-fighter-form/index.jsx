"use client";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {AlertCircle} from "lucide-react";

const RegisterFighterForm = () => {
  const {data: session} = useSession();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    stance: "",
    fights: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!session?.user?.id) {
      setError("You must be logged in to register a fighter");
      return;
    }

    try {
      const response = await fetch("/api/fighters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          coachId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register fighter");
      }

      setSuccess(true);
      setFormData({
        name: "",
        age: "",
        height: "",
        stance: "",
        fights: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white text-black shadow-md rounded-lg overflow-hidden p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-700">
            Height
          </label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g., 5'11&quot; or 180 cm"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="stance"
            className="block text-sm font-medium text-gray-700">
            Stance
          </label>
          <select
            id="stance"
            name="stance"
            value={formData.stance}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
            <option value="">Select a stance</option>
            <option value="Orthodox">Orthodox</option>
            <option value="Southpaw">Southpaw</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="fights"
            className="block text-sm font-medium text-gray-700">
            Number of Fights
          </label>
          <input
            type="number"
            id="fights"
            name="fights"
            value={formData.fights}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-500">
            Fighter registered successfully!
          </p>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Register Fighter
        </button>
      </form>
    </div>
  );
};

export default RegisterFighterForm;
