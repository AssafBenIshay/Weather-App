import React from "react"
import weatherCode from "../../assets/arrays/weatherTypeMapping"
import "./dashboard.css"



export default function DailyForecast({hasMWD, meanWeatherData, imperial}) {
	const [daysForecast, setDaysForecast] = React.useState([])
	React.useEffect(() => {
		const tempDaysForecast = []
		if (hasMWD) {
			const day = (i) => {
				const today = new Date()
				today.setDate(today.getDate() + i)
				const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
				return days[today.getDay()]
			}
			for (let i = 0; i < 7; i++) {
				tempDaysForecast.push({
					day: day(i),
					icon: weatherCode[meanWeatherData.daily.weather_code[i]],
					tempMin: meanWeatherData.daily.temperature_2m_min[i],
					tempMax: meanWeatherData.daily.temperature_2m_max[i],
				})
			}
			setDaysForecast(tempDaysForecast)
		}
	}, [hasMWD, meanWeatherData])
	return (
		<div className="daily-forecast">
			<h4>Daily forecast</h4>
			<div className="daily-forecast-container">
				{hasMWD ? 
					<>
						{daysForecast.map((day, index) => {
							return (
								<div className="daily-forecast-cube" key={index}>
									<h4>{day.day}</h4>
									<img src={day.icon} className="forecast-icon" />
									<div className="temp-div">
										<h5>{`${
											imperial
												? Math.round(day.tempMin * 1.8 + 32)
												: Math.round(day.tempMin)
										}°`}</h5>
										<h5>{`${
											imperial
												? Math.round(day.tempMax * 1.8 + 32)
												: Math.round(day.tempMax)
										}°`}</h5>
									</div>
								</div>
							)
						})}
					</>
				: (
					<>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
						<div className="daily-forecast-cube"></div>
					</>
				)}
			</div>
		</div>
	)
}
