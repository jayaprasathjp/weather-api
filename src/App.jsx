import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [data, setData] = useState([]);
  const handleSearch = useDebouncedCallback(async (term) => {
    if (term.trim() === "") {
      return;
    }
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=26143d277cebd0cceea96bde3933ffee&q=${term}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }, 300);
  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(
        "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=26143d277cebd0cceea96bde3933ffee"
      );
      const result = await response.json();
      setData(result);
    };
    handleFetch();
  }, []);
  return (
    <>
      <h2 className="text-2xl ml-20 mt-10 font-extrabold tracking-tight text-indigo-600 ">
        Weather API
      </h2>
      <div className="flex justify-center mb-8">
        <div className="relative ">
          <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-indigo-500 "
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-indigo-500 "
            placeholder="Search City"
            required
          />
        </div>
      </div>
      <div className="flex justify-center mb-8">
        {data && data.city && (
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow w-auto">
            <div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                City : {`${data.city.name}  (${data.city.id})`}
              </h5>
            </div>
            <div className="flex space-x-4">
              <div className="">
              <p className="mb-3 font-normal text-gray-500 ">
                    Country : {data.city.country}
                  </p>
                  <p className="mb-3 font-normal text-gray-500 ">
                    Latitude : {data.city.coord.lat}
                  </p>
                  <p className="mb-3 font-normal text-gray-500 ">
                    Longitude : {data.city.coord.lon}
                  </p>
                 
                </div>
                <div className="">
                <p className="mb-3 font-normal text-gray-500 ">
                  timezone : {data.city.timezone}
                </p>
                <p className="mb-3 font-normal text-gray-500 ">
                  Sunrise : {data.city.sunrise}
                </p>
                <p className="mb-3 font-normal text-gray-500 ">
                  Sunset : {data.city.sunset}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex  justify-center mx-56">
        <table className="text-sm w-screen text-left border">
          <thead className="text-xs text-center text-indigo-700 uppercase bg-indigo-50 ">
            <tr>
              <th scope="col" className="px-6 border py-3" colSpan={1}>
                Dt
              </th>
              <th scope="col" className="px-6 border py-3" colSpan={9}>
                Main
              </th>
              <th scope="col" className="px-6 border py-3" colSpan={3}>
                Weather
              </th>
              <th scope="col" className="px-6 border py-3" colSpan={1}>
                Clouds
              </th>
              <th scope="col" className="px-6 border py-3" colSpan={3}>
                Wind
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-3 border py-3">
                Time
              </th>
              <th scope="col" className="px-3 border py-3">
                Temp
              </th>
              <th scope="col" className="px-3 border py-3">
                Feels_like
              </th>
              <th scope="col" className="px-3 border py-3">
                Temp_min
              </th>
              <th scope="col" className="px-3 border py-3">
                Temp_max
              </th>
              <th scope="col" className="px-3 border py-3">
                Pressure
              </th>
              <th scope="col" className="px-3 border py-3">
                Sea_level
              </th>
              <th scope="col" className="px-3 border py-3">
                Grnd_level
              </th>
              <th scope="col" className="px-3 border py-3">
                Humidity
              </th>
              <th scope="col" className="px-3 border py-3">
                Temp_kf
              </th>

              <th scope="col" className="px-3 border py-3">
                Main
              </th>
              <th scope="col" className="px-3  border py-3">
                Description
              </th>
              <th scope="col" className="px-3 border py-3">
                Icon
              </th>
              <th scope="col" className="px-3 border py-3">
                All
              </th>
              <th scope="col" className="px-3 border py-3">
                Speed
              </th>
              <th scope="col" className="px-3  border py-3">
                Deg
              </th>
              <th scope="col" className="px-3 border py-3">
                Gust
              </th>
            </tr>
          </thead>
          <tbody>
            {data.list?.map((data, index) => (
              <tr key={index} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {data.dt_txt}
                </th>
                <td className="px-6 py-4">{data.main.temp}</td>
                <td className="px-6 py-4">{data.main.feels_like}</td>
                <td className="px-6 py-4">{data.main.temp_min}</td>
                <td className="px-6 py-4">{data.main.temp_max}</td>
                <td className="px-6 py-4">{data.main.pressure}</td>
                <td className="px-6 py-4">{data.main.sea_level}</td>
                <td className="px-6 py-4">{data.main.grnd_level}</td>
                <td className="px-6 py-4">{data.main.humidity}</td>
                <td className="px-6 py-4">{data.main.temp_kf}</td>
                <td className="px-6 py-4">{data.weather[0].main}</td>
                <td className="px-6 py-4">{data.weather[0].description}</td>
                <td>
                  <img
                    className="w-12 h-12"
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="Cloudy icon"
                  />
                </td>
                <td className="px-6 py-4">{data.clouds.all}</td>
                <td className="px-6 py-4">{data.wind.speed}</td>
                <td className="px-6 py-4">{data.wind.deg}</td>
                <td className="px-6 py-4">{data.wind.gust}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
