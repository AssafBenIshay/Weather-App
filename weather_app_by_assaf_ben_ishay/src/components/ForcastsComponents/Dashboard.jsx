import CurrentForecast from "./CurrentForecast"
import CurrentForecastDetails from "./CurrentForecastDetails"
import DailyForecast from "./DailyForecast"
import "./dashboard.css"
import HourlyForecast from "./HourlyForecast"
import {
	connectWeatherAPI,
	getWeatherAPI,
	getMeanWeatherAPI,
} from "../../WeatherAPIConnector"
import React from "react"


export default function Dashboard({
	selectedCity,
	setWeatherData,
	searchOn,
	setLatAndLon,
	latAndLon,
	selectedCountry,
	weatherData,
	imperial,
	setMeanWeatherData,
	meanWeatherData,
	setApiError,
	hasWD,
	setHasWD,
	introAnimation
}) {
	const [hasMWD, setHasMWD] = React.useState(false)
	const [currentHourAtLocation, setCurrentHourAtLocation] = React.useState(0)

	React.useEffect(() => {
		async function getGeoDataByCityName(city) {
			const geoData = await connectWeatherAPI(city)
			if (!geoData) {
				//setApiError(true)
			} else {
				setLatAndLon([geoData[0]?.lat, geoData[0]?.lon])
			}
		}
		if (selectedCity) {
			getGeoDataByCityName(selectedCity)
		} else {
			console.log("no city selected yet")
		}
	}, [selectedCity, setApiError, setLatAndLon])

	React.useEffect(() => {
		async function receiveWeatherData() {
			const wd = await getWeatherAPI(latAndLon[0], latAndLon[1])
			if (!wd) {
				setApiError(true)
				return
			} else {
				setWeatherData(wd)
				setHasWD(true)
			}
		}

		async function receiveMeanWeatherData() {
			const mwd = await getMeanWeatherAPI(latAndLon[0], latAndLon[1])
			if (!mwd) {
				setTimeout(() => {
					setApiError(true)
					return
				}, 5000);
			} else {
				setMeanWeatherData(mwd)
				setHasMWD(true)
			}
		}

		if (searchOn) {
			receiveWeatherData()
			receiveMeanWeatherData()
		}
	}, [searchOn, latAndLon, setWeatherData, setApiError, setHasWD, setMeanWeatherData])
	//}, [searchOn, latAndLon, setWeatherData]) //! before fix

	React.useEffect(() => {
		let currentOverThereHour = 0

		if (hasWD) {
			const currentUTCHour = new Date().getUTCHours()
			const today = new Date()
			const year = today.getFullYear()
			const startOfYear = new Date(year, 0, 1)
			const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1

			currentOverThereHour =
				currentUTCHour +
				Math.floor((latAndLon[1] * 4) / 60) +
				isPlusOneDaytime(latAndLon[1], dayOfYear)

			function isPlusOneDaytime(latitude, dayOfYear) {
				const pi = Math.PI
				const P = Math.asin(0.39795 *Math.cos(0.2163108 + 2 * Math.atan(0.9671396 * Math.tan(0.0086 * (dayOfYear - 186)))))
				const numerator =Math.sin((0.8333 * pi) / 180) + Math.sin((latitude * pi) / 180) * Math.sin(P)
				const denominator = Math.cos((latitude * pi) / 180) * Math.cos(P)
				const daylightHours = 24 - (24 / pi) * Math.acos(numerator / denominator)

				if (daylightHours > 12) {
					return 1
				} else {
					return 0
				}
			}
		}
		setCurrentHourAtLocation(currentOverThereHour)
	}, [hasWD, latAndLon, weatherData])

	return searchOn ? (
		<>
			<div className="dashboard">
				<div>
					<CurrentForecast
						hasWD={hasWD}
						selectedCity={selectedCity}
						selectedCountry={selectedCountry}
						weatherData={weatherData}
						currentHourAtLocation={currentHourAtLocation}
						imperial={imperial}
						setApiError={setApiError}
					/>
					<CurrentForecastDetails
						hasWD={hasWD}
						weatherData={weatherData}
						currentHourAtLocation={currentHourAtLocation}
						imperial={imperial}
					/>
					<DailyForecast
						hasMWD={hasMWD}
						meanWeatherData={meanWeatherData}
						imperial={imperial}
					/>
				</div>
				<HourlyForecast
					hasWD={hasWD}
					weatherData={weatherData}
					currentHourAtLocation={currentHourAtLocation}
					imperial={imperial}
				/>
			</div>
		</>
	) : (
		<div>
				<h2 className="search-result-empty-h2">{introAnimation ? "Search for a city" : "No search result found!"}</h2>
		</div>
	)
}
