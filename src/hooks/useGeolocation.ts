import { useEffect, useState } from "react";
import { useSnackbar } from "@/context/SnackbarContext";

export interface UserLocation {
  lat: number;
  lng: number;
}

const toLocation = (p: GeolocationPosition): UserLocation => ({
  lat: p.coords.latitude,
  lng: p.coords.longitude,
});

const OPTIONS: PositionOptions = { timeout: 10_000, maximumAge: 5 * 60_000 };

export function useGeolocation() {
  const snackbar = useSnackbar();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator) || !navigator.permissions) return;
    let cancelled = false;
    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (cancelled || status.state !== "granted") return;
        navigator.geolocation.getCurrentPosition(
          (p) => {
            if (!cancelled) setUserLocation(toLocation(p));
          },
          () => {},
          OPTIONS,
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      snackbar.error("Location isn't supported on this browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserLocation(toLocation(p));
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        snackbar.error(
          "Couldn't get your location",
          err.code === err.PERMISSION_DENIED
            ? "Allow location access in your browser settings and try again."
            : "Check your connection and try again.",
        );
      },
      OPTIONS,
    );
  };

  const clearLocation = () => setUserLocation(null);

  return { userLocation, isLocating, locate, clearLocation };
}
