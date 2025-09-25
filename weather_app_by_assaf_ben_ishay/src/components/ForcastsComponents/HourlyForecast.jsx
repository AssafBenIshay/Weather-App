import "./dashboard.css"
import Chevron from "../../assets/images/icon-dropdown.svg"
import React from "react"
import weatherCode from "../../assets/arrays/weatherTypeMapping"


export default function HourlyForecast({
	hasWD,
	weatherData,
	currentHourAtLocation,
	imperial,
}) {
	const [hourlyForecast, setHourlyForecast] = React.useState([])
	const [dayMenuOpen, setDayMenuOpen] = React.useState(false)
	const [days, setDays] = React.useState([
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	])
	const [userSelectedDay, setUserSelectedDay] = React.useState(
		new Date().getDay()
	)

	React.useEffect(() => {
		function buildDaysMenuAccToUTCDay() {
			const currentUTCDay = new Date().getDay()
			const days = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			]
			const newDays = days.slice(currentUTCDay).concat(days.slice(0, currentUTCDay))
			setDays(newDays)
			setUserSelectedDay(0)
		}
		buildDaysMenuAccToUTCDay()
		buildHourlyForecast(hasWD, weatherData, currentHourAtLocation, imperial)
	}, [hasWD, weatherData, currentHourAtLocation, imperial])

	function buildHourlyForecast(
		hasWD,
		weatherData,
		currentHourAtLocation,
		imperial
	) {
		if (hasWD) {
			const hForecastTemp = []
			const currentHoursArr = []
			const cHAL = Number(currentHourAtLocation)

			for (let i = 0; i < 8; i++) {
				function PmAm(i) {
					if ((cHAL + i) % 24 === 0) {
						const hour = `Midnight 🌛`
						return hour
					}
					if ((cHAL + i) % 24 > 12) {
						const hour = String(`${((cHAL + i) % 24) - 12} PM`)
						return hour
					} else if ((cHAL + i) % 24 <= 12) {
						const hour = String(`${(cHAL + i) % 24} AM`)
						return hour
					}
					return `${cHAL + i}`
				}
				const hour = PmAm(i)
				currentHoursArr.push(hour)
			}

			for (let i = 0; i < 8; i++) {
				hForecastTemp.push({
					logo: weatherCode[
						weatherData.hourly.weather_code[cHAL + i]
					],
					time: currentHoursArr[i],
					temp: imperial
						? Number(Math.round(weatherData.hourly.temperature_2m[cHAL + i] * 1.8 + 32))
						: Number(weatherData.hourly.temperature_2m[cHAL + i]),
				})
			}
			setHourlyForecast(hForecastTemp)
		}
	}

	function handleDayMenuClick(e) {
		setDayMenuOpen(!dayMenuOpen)
		const selectedDay4HourForcast = Number(e.target.value) * 24 + currentHourAtLocation
		setUserSelectedDay(Number(e.target.value))
		buildHourlyForecast(hasWD, weatherData, selectedDay4HourForcast, imperial)
	}

	return (
		<div className="hourly-forecast">
			<div className="hourly-forecast-top">
				<h4>Hourly forecast </h4>
				<button
					onClick={() => setDayMenuOpen(!dayMenuOpen)}
					className="hourly-forecast-top-button"
				>
					{hasWD ? days[userSelectedDay] : "—"}
					<img src={Chevron} />
				</button>
			</div>
			{hasWD ? (
				<div className="hours-forecast-list-container">
					{hourlyForecast.map((hour, ind) => {
						return (
							<div className="hours-forecast-list-item" key={ind}>
								<div className="hours-forecast-list-item-left">
									<img src={hour.logo} />
									<h3>{hour.time}</h3>
								</div>
								<p>{hour.temp}</p>
							</div>
						)
					})}
				</div>
			) : (
				<div className="hours-forecast-list-container">
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
					<div className="hours-forecast-list-item"></div>
				</div>
			)}
			{dayMenuOpen && (
				<div className="day-menu">
					{days.map((day, ind) => {
						return (
							<option
								className="day-menu-item"
								key={ind}
								onClick={(e) => handleDayMenuClick(e)}
								value={ind}
							>
								{day}
							</option>
						)
					})}
				</div>
			)}
		</div>
	)
}
