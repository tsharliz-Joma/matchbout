'use client'
import React, {useState, useRef} from "react";
import {AlertCircle, MapPin} from "lucide-react";
import {useGeolocation} from "@/hooks/useGeolocation";
import {getCityFromCoordinates} from "@/app/lib/utils";
import {useRouter} from "next/navigation";

const RegistrationForm = ({handleSubmit}) => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [city, setCity] = useState("");
  const {location, error: geoError, loading} = useGeolocation();
  const [geocodingError, setGeocodingError] = useState(null);
  const [error, setError] = useState();
  const router = useRouter();
  const formRef = useRef(null);

  // useEffect(() => {
  //   if (location) {
  //     console.log(location);
  //     getCityFromCoordinates(location.latitude, location.longitude)
  //       .then((cityName) => {
  //         setCity(cityName);
  //         setGeocodingError(null);
  //       })
  //       .catch((err) => {
  //         console.error("Error getting city name:", err);
  //         setGeocodingError("Failed to get city name");
  //       });
  //   }
  // }, []);



  const onSubmit = () => {
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        const formData = new FormData(formRef.current);
        form.requestSubmit()
        handleSubmit(formData);
      } else {
        const inputs = Array.prototype.slice.all(
          formRef.current.getElementsByTagName("input"),
        );
        inputs.forEach((input) => {
          const feedback = input.nextElementSibling;
          if (!input.checkValidity()) {
            input.classList.add(`text-red-500`);
            feedback.classList.remove("hidden");
          } else {
            input.classList.remove(`text-red-500`);
            feedback.classList.add("hidden");
          }
        });
      }
    }
  };

  const handleConfirmPassword = (event) => {
    const password = document.getElementById("password").value;
    setPasswordMatch(password === event.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white !text-black shadow-md rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
      <form
        noValidate
        ref={formRef}
        action={onSubmit}
        className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700">
              first Name
            </label>
            <input
              id="firstName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700">
              last name
            </label>
            <input
              id="lsatName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            onChange={handleConfirmPassword}
            required
          />
          {!passwordMatch && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Passwords do not match
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="relative">
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pr-10"
              placeholder={
                loading ? "Detecting location..." : "Enter your city"
              }
              readOnly={loading}
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {(geoError || geocodingError) && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {geoError || geocodingError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
