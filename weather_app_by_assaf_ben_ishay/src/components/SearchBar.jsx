import React from "react"
import MGLASS from "../assets/images/icon-search.svg"
import "./components.css"


export default function SearchBar({
	cities,
	setSelectedCity,
	setSearchOn,
	setSelectedCountry,
	setWeatherData,
	setLatAndLon,
	setHasWD
}) {
	const [hasInpt, setHasInpt] = React.useState(false)
	const [val, setVal] = React.useState("")
	const [cList, setCList] = React.useState([])
	const [fullList, setFullList] = React.useState([])
	const [pointer, setPointer] = React.useState(0)
	const [rightPadding, setRightPadding] = React.useState(0)


	React.useEffect(() => {
		function getScrollbarWidth() {
			return window.innerWidth - document.documentElement.clientWidth
		}
		setRightPadding(getScrollbarWidth())
	}, [])

	/**
	 * Sets the list of cities to the shortened list of cities (max 10 elements). to show in the dropdown search result list
	 * Resets the pointer to 0, which is responsible to point to the beginning of the shortened list whenever the user scrolls up or down
	 *  in the dropdown search result list.
	 */
	function SearchBar(e) {
		setHasInpt(e.target.value ? true : false)
		setVal(e.target.value)

		const list = cities.filter((city) =>
			city.toLowerCase().includes(e.target.value)
		)
		const shortenedList = list.slice(0, 10)

		setCList(Array.from(shortenedList))
		setFullList(Array.from(list))
		setPointer(0)
	}

	function setUserSelectedCity(e) {
		const slicedCity = e.currentTarget.innerText
		const slicedCityArr = slicedCity.split(" :: ")

		setSelectedCity(slicedCityArr[0])
		setSelectedCountry(slicedCityArr[1])
		setHasInpt(false)
		setVal(e.currentTarget.innerText)
		compensateScrollWidthUponDropdownSearch(true)
	}

	function compensateScrollWidthUponDropdownSearch(unset) {
		if (unset) {
			document.body.style.overflow = "unset"
			document.body.style.paddingRight = "0px"
		} else {
			document.body.style.overflow = "hidden"
			document.body.style.paddingRight = rightPadding + "px"
		}
	}

	function handleWheelSelect(e) {
		const fl = Array.from(fullList || [])?.length ?? 0

		if (fl > 10) {
			if (e.deltaY > 0) {
				if (pointer + 9 === fl - 1) {
					console.log("endoflist") // ! set sound here
				} else {
					const tempP = pointer + 1
					setPointer(tempP)
					setCList(fullList?.slice(tempP, tempP + 10))
				}
			}
			if (e.deltaY < 0) {
				if (pointer === 0) {
					//! play sound of beginning of list
				} else {
					const tempP = pointer - 1
					setPointer(tempP)
					setCList(fullList?.slice(tempP, tempP + 10))
				}
			}
		}
	}

	function handleClick() {
		if (cList?.length !== undefined && cList?.length > 0 && val.includes("::")) {
			setSearchOn(true)
			compensateScrollWidthUponDropdownSearch(true)
		} else {
			setSearchOn(false)
			setVal("")
			setCList(undefined)
			setFullList(undefined)
			setPointer(0)
			setWeatherData([])
			setLatAndLon([0, 0])
			setHasWD(false)
		}
	}

	function handleDelete(e) {
		if (e.key === "Backspace" || e.key === "Delete") {
			setSearchOn(false)
			setVal("")
			setCList(undefined)
			setFullList(undefined)
			setPointer(0)
			setWeatherData([])
			setLatAndLon([0, 0])
			setHasWD(false)
		}
	}

	return (
		<div className="search-div">
			<img src={MGLASS} className="search-icon" alt='magnifying-glass'/>
			<input
				placeholder="Search for a place..."
				className="search-input"
				onChange={(e) => SearchBar(e)}
				onKeyDown={(e) => handleDelete(e)}
				value={val}
				id='search-input'
				autoComplete="off"
			/>
			<button
				className={`search-button ${cList?.length > 0 && val.includes("::") ? "active" : ""
					}`}
				onClick={() => handleClick()}
			>
				Search
			</button>
			{hasInpt && cList?.length > 0 && (
				<div
					className="results-container"
					onWheel={(e) => handleWheelSelect(e)}
					onMouseEnter={() => compensateScrollWidthUponDropdownSearch(false)}
					onMouseLeave={() => compensateScrollWidthUponDropdownSearch(true)}
				>
					{cList?.map((city, i) => {
						return (
							<div key={i}>
								{fullList && city === fullList[0] && <hr className="hr" />}
								<button className="results-cell" onClick={(e) => setUserSelectedCity(e)}>
									{city}
								</button>
								{fullList && city === fullList[fullList.length - 1] && (
									<hr className="hr" />
								)}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
