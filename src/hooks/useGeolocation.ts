import { useEffect, useState } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
}

/**
 * Owns the user's geolocation: attempts one automatic locate on mount
 * (unless previously dismissed) and exposes manual locate / clear controls.
 */
export function useGeolocation() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator && !userLocation && !dismissed) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => console.log("Auto-location failed:", error.message),
      );
    }
  }, [userLocation, dismissed]);

  const locate = () => {
    setDismissed(false);
    if (!("geolocation" in navigator)) return;

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        alert("Could not get your location. Please check browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
  };

  const clearLocation = () => {
    setUserLocation(null);
    setDismissed(true);
  };

  return { userLocation, isLocating, locate, clearLocation };
}
