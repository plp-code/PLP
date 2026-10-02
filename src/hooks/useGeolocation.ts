import { useEffect, useState } from "react";
import { useSnackbar } from "@/context/SnackbarContext";

export interface UserLocation {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const snackbar = useSnackbar();
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
    if (!("geolocation" in navigator)) {
      snackbar.error("Location isn't supported on this browser");
      return;
    }

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
        snackbar.error(
          "Couldn't get your location",
          "Allow location access in your browser settings and try again.",
        );
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
