

const  API_KEY='f96b73be4fc88b657edfebb3a2275109'
const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid=${API_KEY}`
const BASE_URL = `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,precipitation_probability&forecast_days=9#`
const MEAN_URL = `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`
export const connectWeatherAPI = async (city) => {
    const uri = encodeURI(API_URL.replace('{city}', city));
    try {
        const response = await fetch(uri)
        const data = await response.json()
        return data
    } catch (error) {
        alert(`Error fetching weather data for city: ${city} , Error: ${error}`)
        return null
    }
}

export const getWeatherAPI = async (lat, lon) => {
    const url = BASE_URL.replace('{lat}', lat.toString()).replace('{lon}', lon.toString())
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getMeanWeatherAPI = async (lat, lon) => {
        if(!lat || !lon) return null

    const url = MEAN_URL.replace('{lat}', lat.toString()).replace('{lon}', lon.toString())
    const response = await fetch(url);
    const data = await response.json();
    return data;
}