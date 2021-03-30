import { weatherKey } from './key.js'
const log = console.log

export const getWeatherData = (setWeather, location) => {
  return fetch(`http://api.weatherstack.com/current?access_key=${weatherKey}&query=${location}`).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return { message: 'error' }
    }
  }).then(json => {
    if (json.message !== 'error') {
      setWeather({
        name: json.location.name,
        temp: json.current.temperature,
        icon: json.current.weather_icons[0],
        feel: json.current.feelslike,
        time: json.current.observation_time,
        status: 200
      })
      return json.current
    } else {
      setWeather({
        status: 500
      })
      return json
    }
  }).catch(log)
}

export const updateData = () => {
  return fetch('http://localhost:8000/uses', {
    method: 'POST',
    mode: 'no-cors'
  }).then(res => {
    log(res)
    if (res.ok) {
      return res.json()
    } else {
      return { message: 'error1' }
    }
  }).then(json => {
    return json
  }).catch(log)
}

export const getData = (setUses) => {
  return fetch('http://localhost:8000/uses', {
    method: 'GET',
    mode: 'no-cors'
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return { message: 'error' }
    }
  }).then(json => {
    if (json) {
      setUses(json.data)
    }
    return json
  }).catch(log)
}
