import React, { useRef } from "react";

const App = () => {
  const formatted = useRef(null);
  const API = `https://api.opencagedata.com/geocode/v1/json`;
  const apiKey = "74e6013fc19846eda2152da46493757a";
  const getData = async (latitude, longitude) => {
    console.log("GetData");
    try {
      const res = await fetch(
        `${API}?q=${latitude},+${longitude}&key=${apiKey}&language=en&pretty=1`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      alert("Somethig Went Wrong Please try again later");
    }
  };

  const showLocation = () => {
    // console.log("good");
    if ("geolocation" in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const data = await getData(latitude, longitude);
          formatted.current.textContent = data.results[0].formatted;
          const url = data.results[0].annotations.OSM.url;
          setTimeout(() => {
            window.open(url, "_black");
          }, 1500);
        },
        (error) => {
          alert(error);
        }
      );
    } else {
      alert("geolocation IS NOT available");
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-700 flex justify-center items-center flex-col">
        <h1 className="mb-4 text-white text-2xl">Get Your Current Location</h1>
        <button
          onClick={showLocation}
          className="font-sans bg-green-500 tracking-wider text-white p-4 capitalize font-semibold"
        >
          click and allow
        </button>
        <p className="text-white mt-4" ref={formatted}></p>
      </div>
    </>
  );
};

export default App;
