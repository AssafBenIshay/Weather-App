import React from 'react'

export default function CurrentForecastDetails({
	hasWD,
	weatherData,
	currentHourAtLocation,
	imperial
}) {
    const [feelsLike, setFeelsLike] = React.useState('')
    const [humidity, setHumidity] = React.useState('')
    const [wind,setWind] = React.useState('')
    const [precipitation,setPrecipitation] = React.useState('')
    
    React.useEffect(() => {
		if (hasWD) {
			const fl = weatherData?.hourly.apparent_temperature[currentHourAtLocation]
			const h = weatherData?.hourly.relative_humidity_2m[currentHourAtLocation]
			const w = weatherData?.hourly.wind_speed_10m[currentHourAtLocation]
			const p = weatherData?.hourly.precipitation[currentHourAtLocation]
                setFeelsLike(imperial ? Math.round((Number(fl) * 1.8 + 32)) : fl)
                setHumidity(h)
                setWind(imperial ? Math.round((Number(w) / 1.609)) : w)
                setPrecipitation(imperial ? Math.round((Number(p) / 25.4)): p)
        }
    },[weatherData,imperial])
    // },[currentHourAtLocation, hasWD, imperial, weatherData])

	return (
		<div className="current-forecast-details">
			<div className="current-forecast-details-cube">
				<h4>Feels Like</h4>
				<h1>{hasWD ? `${feelsLike}°`:'—'}</h1>
			</div>
			<div className="current-forecast-details-cube">
				<h4>Humidity</h4>
				<h1>{hasWD?`${humidity}%`:'—'}</h1>
			</div>
			<div className="current-forecast-details-cube">
				<h4>Wind</h4>
				<h1>{hasWD?`${wind} ${imperial ? 'mph' : 'km/h'}`:'—'}</h1>
			</div>
			<div className="current-forecast-details-cube">
				<h4>Precipitation</h4>
				<h1>{hasWD ?`${precipitation} ${imperial ? 'in' : 'mm'}`:'—'}</h1>
			</div>
		</div>
	)
}
