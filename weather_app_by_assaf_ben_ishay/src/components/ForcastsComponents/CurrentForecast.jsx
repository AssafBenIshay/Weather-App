import React from "react"
import weatherTypeMapping from "../../assets/arrays/weatherTypeMapping"
import "./dashboard.css"

export default function CurrentForecast({
	selectedCity,
	selectedCountry,
	weatherData,
	currentHourAtLocation,
	hasWD,
	imperial,
}) {
	const [todayDate] = React.useState(new Date().toDateString())
	const [weatherCode, setWeatherCode] = React.useState()
	const [weatherTemp, setWeatherTemp] = React.useState()

	React.useEffect(() => {
		if (hasWD) {
			const weatherCodeNumber = weatherData?.hourly.weather_code[currentHourAtLocation]
			const weatherCurrentTemp = weatherData?.hourly.temperature_2m[currentHourAtLocation]

			setWeatherCode(weatherTypeMapping[weatherCodeNumber.toString()])
			setWeatherTemp(weatherCurrentTemp)
		}
	}, [currentHourAtLocation, hasWD, weatherData])

	return (
		<>
			{hasWD ? (
				<>
					<div className="current-forecast">
						<div className="time-and-place">
							<h2>
								{selectedCity}, {selectedCountry}
							</h2>
							<p>{todayDate}</p>
						</div>
						<div className="logo-and-temp">
							<img src={weatherCode} />
							<i>
								{imperial ? Math.floor(Number(weatherTemp) * 1.8 + 32) : weatherTemp}°
							</i>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="current-forecast-loading">
						<div className="loading-balls">
							<p className={"ball1 ball"}>•</p>
							<p className={"ball2 ball"}>•</p>
							<p className={"ball3 ball"}>•</p>
						</div>
						<div>
							<p className="loading-balls-p">Loading...</p>
						</div>
					</div>
				</>
			)}
		</>
	)
}
