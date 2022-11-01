import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PlaceItem from '../../components/PlaceItem'
import SearchForm from '../../components/SearchForm'
import CityInfo from '../../components/CityInfo'
import TemperatureInfo from '../../components/TemperatureInfo'
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

export default function PlaceDetails({ data }) {
  return (
    <Layout>
      <Head>
        <title>{data.result.name}</title>
      </Head>

      <div className="container mx-auto px-10 vo">
        <div className="mt-5 w-full lg:w-6/12 mx-auto">
          <SearchForm action="/search" title={data.placeName} />
        </div>
      </div>

      <div className="container mx-auto px-10">
        <div className="mt-4 w-full lg:w-6/12 mx-auto mb-20">

          {data.status === 'OK' && (
            <React.Fragment>
              <div>
                <PlaceItem place={data.result} photoUrl={data.photoUrl} />
                {/* Weather Response */}
                <div className='flex flex-col sm:flex-row mx-auto items-center justify-evenly mt-3 flex-wrap w-full gap-4 sm:gap-3'>
                  <div className="flex border border-gray-200 p-10 bg-white/60 rounded-lg">
                    <CityInfo date={data.date} data={data.weather} />
                  </div>
                  {/* <div className="flex border border-gray-200 p-5 sm:p-10 ">
                  <TemperatureInfo data={data.weather} />
                </div> */}
                  <div className='h-72 w-72 rounded-lg'>
                    <MapWithNoSSR lat={data.location.lat} long={data.location.lng} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}

        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context) {

  // Place Info
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.id}&fields=formatted_address,icon,name,photos,place_id,types,photos,geometry/location`
  const res = await fetch(url);
  const resJson = await res.json();
  const location = resJson.result.geometry.location

  // Current Location Weather
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${process.env.OPENWEATHER_API_KEY}`
  const weatherRes = await fetch(weatherUrl)
  const weatherResJson = await weatherRes.json()

  // Forecast
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&%20&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
  const forcastRes = await fetch(forecastUrl)
  const dataHourly = await forcastRes.json()

  //Prepare Image
  const photo = resJson.result.photos ?  resJson.result.photos[0] : null
  const thumbnailUrl = photo ? `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=400&photoreference=${photo.photo_reference}` : null

  // Prepare Date
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const tempDate = new Date();
  const fullDate = new Date(
    (weatherResJson.dt + weatherResJson.timezone + tempDate.getTimezoneOffset() * 60) * 1000,
  );

  const exactDate = [
    fullDate.getDate(),
    fullDate.getMonth(),
    fullDate.getFullYear(),
    days[fullDate.getDay()],
    months[fullDate.getMonth() + 1],
  ];

  const neededData = {
    city: weatherResJson.name,
    country: weatherResJson.sys.country,
    description: weatherResJson.weather[0].description,
    main: weatherResJson.weather[0].main,
    weatherID: weatherResJson.weather[0].id,
    temp: weatherResJson.main.temp,
    highestTemp: dataHourly.daily[0].temp.max,
    lowestTemp: dataHourly.daily[0].temp.min,
    clouds: weatherResJson.clouds.all,
    humidity: weatherResJson.main.humidity,
    wind: weatherResJson.wind.speed,
    hourly: dataHourly.hourly,
    timezoneOffset: weatherResJson.timezone,
    dt: weatherResJson.dt,
    sunrise: weatherResJson.sys.sunrise,
    sunst: weatherResJson.sys.sunset,
  };

  return {
    props: {
      data: {
        status: resJson.status,
        result: resJson.result,
        weather: neededData,
        placeName: resJson.result.name,
        date: exactDate,
        location: location,
        photoUrl: thumbnailUrl
      }
    }
  }
}