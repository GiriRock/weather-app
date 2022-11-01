import WeatherSVG from "./WeatherSVG.js"

function CityInfo(props) {
  return props.data.country !== undefined ? (
    <div className="flex flex-col justify-center items-center md:items-start">
      <WeatherSVG class="" dt={props.data.dt} sunset={props.data.sunset} sunrise={props.data.sunrise} id={props.data.weatherID} />
      <p className="text-5xl md:text-6xl font-semibold">{Math.round(props.data.temp - 273.15) + "°"}</p>
      <h1 className="text-3xl md:text-4xl font-semibold">
        {props.data.city}, {props.data.country}
      </h1>
      <h3 className="">
        {props.date[3]} {props.date[0]} {props.date[4]}, {props.date[2]}
      </h3>
      <h2 className="">{props.data.description}</h2>
    </div>
  ) : (
    <div></div>
  )
}

export default CityInfo;