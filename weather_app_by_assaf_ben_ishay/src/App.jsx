import "./App.css"
import LOGO from "./assets/images/logo.svg"
import DropDown from "./components/DropDown"
import SearchBar from "./components/SearchBar"
import {cityList} from "./CityListBuilder"
import React from "react"
import Dashboard from "./components/ForcastsComponents/Dashboard"
import ApiError from "./ApiError"
import IntroAnimation from './IntroAnimation'

const unmount = {
	animation: "outAnimationfade 5s forwards ease-in",
}


function App() {
	const [introAnimation, setIntroAnimation] = React.useState(true)
	const [cities, setCities] = React.useState([]) 
	const [selectedCity, setSelectedCity] = React.useState("")
	const [selectedCountry, setSelectedCountry] = React.useState("")
	const [WeatherData, setWeatherData] = React.useState([])
	const [searchOn, setSearchOn] = React.useState(false)
	const [latAndLon, setLatAndLon] = React.useState([])
	const [imperial, setImperial] = React.useState(false)
	const [meanWeatherData, setMeanWeatherData] = React.useState([])
	const [apiError, setApiError] = React.useState(false)
	const [hasWD, setHasWD] = React.useState(false)

	React.useEffect(() => {
		async function getCities() {
			const CL = await cityList()
			if (!Array.isArray(CL)) {
				setApiError(true)
			} else {
				setCities(CL)
			}
		}
		getCities()
	}, [])

	function handleRetry() {
		setApiError(false)
		setWeatherData([])
		setMeanWeatherData([])
		setLatAndLon([0, 0])
		setSelectedCity("")
		setSelectedCountry("")
		setSearchOn(false)
	}

	return (
		<>
			<div id="app" style={introAnimation ? unmount : {}}>
				<div className="logo-menu">
					<img src={LOGO} alt='logo'/>
					<DropDown imperial={imperial} setImperial={setImperial} />
				</div>
				{!apiError ? (
					<>
						<h1 className="title">How's the sky looking today?</h1>
						<SearchBar
							cities={cities}
							setSelectedCity={setSelectedCity}
							setSearchOn={setSearchOn}
							setSelectedCountry={setSelectedCountry}
							setWeatherData={setWeatherData}
							setLatAndLon={setLatAndLon}
							setHasWD={setHasWD}
						/>
						<Dashboard
							selectedCity={selectedCity}
							setWeatherData={setWeatherData}
							searchOn={searchOn}
							latAndLon={latAndLon}
							setLatAndLon={setLatAndLon}
							selectedCountry={selectedCountry}
							weatherData={WeatherData}
							imperial={imperial}
							setMeanWeatherData={setMeanWeatherData}
							meanWeatherData={meanWeatherData}
							setApiError={setApiError}
							hasWD={hasWD}
							setHasWD={setHasWD}
							introAnimation={introAnimation}
						/>
					</>
				) : (
					<ApiError handleRetry={handleRetry} />
				)}
			</div>
			<p className="footer">
				Weather app using Vite + React by{" "}
				<a href="https://github.com/AssafBenIshay">Assaf Ben-Ishay</a>
			</p>

			{introAnimation ? (
				<IntroAnimation
					introAnimation={introAnimation}
					setIntroAnimation={setIntroAnimation}
				/>
			) : (
				""
			)}
		</>
	)
}

export default App
