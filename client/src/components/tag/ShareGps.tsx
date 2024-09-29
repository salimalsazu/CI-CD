import { useState } from "react";
import { GrMapLocation } from "react-icons/gr";

const ShareGps = ({ phoneNumber }: { phoneNumber: string }) => {
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `My location: https://maps.google.com/?q=${latitude},${longitude}`;

          // Ensure the phone number and message are correctly formatted
          const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
          window.location.href = url;
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button
        onClick={handleGetLocation}
        className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out"
      >
        <span className="flex justify-center text-primary">
          <GrMapLocation size={20} />
        </span>
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ShareGps;
