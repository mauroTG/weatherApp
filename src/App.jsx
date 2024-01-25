import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Clear from "./assets/clear.png";
import Clouds from "./assets/clouds.png";
import Drizzle from "./assets/drizzle.png";
import Mist from "./assets/mist.png";
import Rain from "./assets/rain.png";
import Snow from "./assets/snow.png";
import Humidity from "./assets/humidity.png";
import Wind from "./assets/wind.png";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const API_KEY = "cdabeefb03d2d2068687c83edcba474c";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${API_KEY}`;
  const searchLocation = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      await axios.get(url).then((res) => {
        setData(res.data);
        if (res.data.weather[0].main === "Clouds") setImage(Clouds);
        else if (res.data.weather[0].main === "Clear") setImage(Clear);
        else if (res.data.weather[0].main === "Drizzle") setImage(Drizzle);
        else if (res.data.weather[0].main === "Mist") setImage(Mist);
        else if (res.data.weather[0].main === "Rain") setImage(Rain);
        else if (res.data.weather[0].main === "Snow") setImage(Snow);
      });
      setLocation("");
    }
  };

  return (
    <div className="container mx-auto">
      <div
        className="bg-gradient-to-r from-orange-400 to-rose-400 w-11/12 max-w-[480px] text-white my-12 mx-auto rounded-3xl py-10 px-9 text-center shadow-2xl transition duration-300"
        id="background">
        <div className="w-full flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Enter location"
            spellCheck="false"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDownCapture={searchLocation}
            className="border-none outline-none bg-zinc-200 text-zinc-800 py-2 px-6 h-10 rounded-3xl flex-1 text-lg"
          />
          <button
            className="border-none outline-none bg-zinc-200 rounded-full h-10 w-10 cursor-pointer relative"
            onClick={searchLocation}>
            <MagnifyingGlassIcon className="absolute w-5 text-zinc-800 top-1/4 left-1/4" />
          </button>
        </div>

        {data.weather ? (
          <div>
            <img src={image} alt="Weather icon" className="w-56 mt-3 mx-auto" />
            <p className="text-4xl">
              {data.name}, {data.sys.country}
            </p>
            <h1 className="text-5xl font-bold mt-5">
              {Math.round(data.main.temp * 10) / 10}°C
            </h1>
            <div className="flex items-center justify-between py-0 px-5 mt-5">
              <div className="flex items-center text-left gap-4">
                <img src={Humidity} alt="Humidity icon" className="w-10 mr-2" />
                <div>
                  <p className="text-xl">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="flex items-center text-left gap-4">
                <img src={Wind} alt="Wind icon" className="w-10 mr-2" />
                <div>
                  <p className="text-xl">{data.wind.speed} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
