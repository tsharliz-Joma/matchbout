"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

const NewCoach = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: null,
    location: {lat: 0, lng: 0},
  });

  const handleFileChange = (e) => {
    setFormData({...formData, profilePicture: e.target.files[0]});
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error fetching location", error);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const createCoach = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("lat", formData.location.lat.toString()); // Convert lat to string
    formDataToSend.append("lng", formData.location.lng.toString()); // Convert lng to string
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture); // Append the file
    }

    try {
      const response = await fetch("/api/coaches.ts", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Coach created successfully!");
        router.push("/dashboard");
      } else {
        console.error("Failed to create coach");
      }
    } catch (error) {
      console.error("Error creating coach", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Coach
        </h1>
        <form
          className="space-y-4 text-gray-800"
          onSubmit={createCoach}
          encType="multipart/form-data">
          {/* Name Field */}
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profile Picture Field */}
          <div>
            <label
              htmlFor="Profile Picture"
              className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Latitude Field */}
          <div>
            <label
              htmlFor="Latitude"
              className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              value={formData.location.lat}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Longitude Field */}
          <div>
            <label
              htmlFor="Longitude"
              className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              value={formData.location.lng}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Get Location Button */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out">
            Get Location
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out">
            Create Coach
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCoach;
