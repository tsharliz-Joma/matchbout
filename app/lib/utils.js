import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

async function getCityFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Geocoding API error: ${data.status}`);
    }

    // Find the city from the address components
    const cityComponent = data.results[0].address_components.find((component) =>
      component.types.includes("locality"),
    );

    const city = cityComponent ? cityComponent.long_name : "Unknown location";


    return city;
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unable to determine location";
  }
}

export {cn, getCityFromCoordinates};
