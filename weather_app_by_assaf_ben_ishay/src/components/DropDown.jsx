import './components.css'
import UNITS from '../assets/images/icon-units.svg'
import DROP from '../assets/images/icon-dropdown.svg'
import React from 'react'
import DropDowPair from './DropDowPair'

export default function DropDown({imperial,setImperial}) {
    const [menuOpen, setMenuOpen] = React.useState(false)

    
    return (
    <div className='units-dropdown-div'>
        <button className='drop-down' onClick={()=>setMenuOpen(!menuOpen)}>
             <img src={UNITS} alt='units'/>
             Units
             <img src={DROP} alt='drop'/>
        </button> 
        {menuOpen && 
        <div className='units-menu' >
            <button onClick={() => setImperial(last => !last)} className='switch-button'>{imperial ? 'Switch to Metric' : 'Switch to Imperial'}</button>
            <DropDowPair
                title={'Temperature'} name={'measure'} value={'metricT'} text={'Celsius (℃)'}
                value2={'imperialT'} text2={'Fahrenheit (℉)'}  imperial={imperial}/>
            <DropDowPair
                        title={'Wind Speed'} name={'velocity'} value={'metricV'} text={'km/h'}
                        value2={'imperialV'} text2={'mph'}  imperial={imperial} />
            <DropDowPair
                        title={'Precipitation'} name={'volume'} value={'metricP'} text={'Millimeters(mm)'}
                        value2={'imperialP'} text2={'Inches (in)'}  imperial={imperial} />

        </div>
                
        }
    </div>

    )
}