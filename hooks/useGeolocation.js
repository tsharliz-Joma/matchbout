import {useState, useEffect} from "react";

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      });
      setLoading(false);
      setError(null);
    };

    const errorHandler = (error) => {
      setError(error.message);
      setLoading(false);
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return {location, error, loading};
};

export {useGeolocation};
