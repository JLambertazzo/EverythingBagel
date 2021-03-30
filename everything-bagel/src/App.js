import './App.css'
import React, { useState, useEffect } from 'react'
import { getWeatherData, updateData, getData } from './actions.js'

export default function App () {
  const [weather, setWeather] = useState({ status: 0 })
  const [location, setLocation] = useState('Toronto')
  const [uses, setUses] = useState(0)
  useEffect(() => {
    if (location !== '') {
      getWeatherData(setWeather, location)
      updateData()
      getData(setUses)
    }
  }, [location])

  const getRecommendation = feel => {
    if (feel < 0) {
      return (<p className="sm:text-3xl text-2xl md:text-center text-2xl text-gray-200 w-full px-10 italic">It's cold out! Get a jacket ❄️</p>)
    } else if (feel < 10) {
      return (<p className="sm:text-3xl text-2xl md:text-center text-2xl text-gray-200 w-full px-10 italic">It's chilly out, beware 🌬️</p>)
    } else {
      return (<p className="sm:text-3xl text-2xl md:text-center text-2xl text-gray-200 w-full px-10 italic">It's Canadian summer 🔥🌞</p>)
    }
  }

  return (
    <div className='App h-screen w-screen flex flex-col justify-center items-center bg-purple-600'>
      <h1 className='sm:text-7xl text-5xl md:text-center p-10 font-extrabold tracking-tight text-gray-100 w-full px-10'>EverythingBagel 🍉🦈🥯</h1>
      <h2 className='sm:text-4xl text-3xl md:text-center font-bold text-2xl text-gray-200 w-full px-10'>{`It's ${weather.temp}°C in ${weather.name}`}</h2>
      <h2 className='sm:text-3xl text-2xl md:text-center text-2xl text-gray-200 w-full px-10'>{`It feels like ${weather.feel}°C`}</h2>
      {getRecommendation(weather.feel)}
      <div>
        <label className="sm:text-2xl text-xl md:text-center text-2xl text-gray-200 w-full px-10">Enter your location:</label>
        <input className="outline-none border-b-2 border-white bg-transparent text-white" type='text' onChange={event => setLocation(event.target.value)} />
      </div>
      <div>
        <p className="sm:text-3xl text-2xl md:text-center text-2xl text-gray-200 w-full px-10 italic">{`This site has been used ${uses} times`}</p>
      </div>
    </div>
  )
}
