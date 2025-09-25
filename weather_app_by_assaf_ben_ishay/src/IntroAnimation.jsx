import CLEANLOGO from "./assets/images/logo-clean.svg"
import "./App.css"
import React from 'react'

const mount = {
    animation: "inAnimationfade 5s forwards ease-out",
    
}
const logoRoll = {animation: "introLogoRoll 3s  forwards  ease-out"} //logoRoll

export default function IntroAnimation({ introAnimation, setIntroAnimation }) {
    React.useEffect(() => {
        setTimeout(() => {
            setIntroAnimation(false)
        }, 20000)
    })
	return (<>
		<div className="intro" style={introAnimation ? mount : ""}>
			<h1 className="intro-title">WELCOME</h1>
		</div>
			<div className='intro-logo-container' style={introAnimation ? logoRoll : ""}>
				<img src={CLEANLOGO} className="intro-logo" />
			</div></>
	)
}
