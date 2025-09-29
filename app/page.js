"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    setWeather(null);

    if (!city) {
      setError("⚠️ Please enter a city");
      return;
    }

    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "❌ City not found");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("❌ Something went wrong");
    }
  };

  // Dynamic background
  const getBgClass = () => {
    if (!weather) return "from-blue-500 to-indigo-700";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "from-gray-500 to-gray-700";
    if (main.includes("rain")) return "from-blue-700 to-gray-900";
    if (main.includes("snow")) return "from-blue-300 to-blue-600";
    if (main.includes("clear")) return "from-yellow-400 to-orange-500";
    return "from-indigo-500 to-purple-700";
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${getBgClass()} text-white px-6 py-10 transition-all duration-500`}
    >
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white drop-shadow-lg">
        🌦 Weather Dashboard
      </h1>

      {/* Search bar */}
      <div className="flex gap-3 w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
        />
        <button
          onClick={getWeather}
          disabled={!city}
          className="px-5 py-3 rounded-xl font-semibold bg-white/30 hover:bg-white/40 backdrop-blur-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="mt-4 text-red-200 font-medium">{error}</p>}

      {/* Weather card */}
      {weather && weather.name && (
        <div className="mt-12 w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl p-8 text-center transform transition duration-500 hover:scale-105">
          {/* City + Temp */}
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <h3 className="text-6xl font-extrabold mt-2">
            {Math.round(weather.main.temp)}°C
          </h3>
          <p className="capitalize mt-2 text-lg opacity-90">
            {weather.weather[0].description}
          </p>

          {/* Weather icon */}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Weather Icon"
            className="mx-auto mt-4 animate-bounce"
          />

          {/* Stats grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition">
              💧 Humidity: {weather.main.humidity}%
            </div>
            <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition">
              🌬 Wind: {weather.wind.speed} m/s
            </div>
            <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition">
              🌡 Feels like: {Math.round(weather.main.feels_like)}°C
            </div>
            <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition">
              📈 Pressure: {weather.main.pressure} hPa
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


