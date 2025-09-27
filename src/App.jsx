import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = `81fffb2a62b2620ae249eda9c7734221`; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: { q: city, units: "metric", appid: apiKey },
        }
      );
      setWeather(res.data);
    } catch (err) {
      setWeather(null);
      setError(err);
    }
  };
  // Background colors based on weather type
  const getBackground = () => {
    if (!weather) return "from-blue-400 to-indigo-600";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "from-gray-400 to-gray-600";
    if (main.includes("rain") || main.includes("drizzle"))
      return "from-blue-600 to-gray-700";
    if (main.includes("snow")) return "from-white to-blue-300";
    if (main.includes("clear")) return "from-yellow-400 to-orange-500";
    return "from-blue-400 to-indigo-600";
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${getBackground()} transition-all duration-700`}
    >
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">
        Weather Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="p-3 rounded-xl text-black w-64 sm:w-80 focus:outline-none shadow-md"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-200 mb-6 font-medium">{error}</p>}
      {weather && (
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center w-80 sm:w-96 transition-all duration-500">
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-lg capitalize mt-1">
            {weather.weather[0].description}
          </p>

          <div className="flex justify-center mt-4 items-center">
            <img
              className="w-24 h-24"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <p className="text-6xl font-bold ml-4">
              {Math.round(weather.main.temp)}°C
            </p>
          </div>

          <div className="flex justify-around mt-6 text-white font-medium">
            <div>
              <p>Min</p>
              <p>{Math.round(weather.main.temp_min)}°C</p>
            </div>
            <div>
              <p>Max</p>
              <p>{Math.round(weather.main.temp_max)}°C</p>
            </div>
            <div>
              <p>Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
