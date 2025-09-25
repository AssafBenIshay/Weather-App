import IconDrizzle from '../../assets/images/icon-drizzle.webp'
import IconFog from '../../assets/images/icon-fog.webp'
import IconOvercast from '../../assets/images/icon-overcast.webp'
import IconPClouded from '../../assets/images/icon-partly-cloudy.webp'
import IconRain from '../../assets/images/icon-rain.webp'
import IconSnow from '../../assets/images/icon-snow.webp'
import IconStorm from '../../assets/images/icon-storm.webp'
import IconSunny from '../../assets/images/icon-sunny.webp'


const weatherCode = {
        0: IconSunny,
        1: IconSunny,
        2: IconPClouded,
        3: IconOvercast,
        45: IconFog,
        48: IconFog,
        51: IconDrizzle,
        53: IconDrizzle,
        55: IconDrizzle,
        56: IconDrizzle,
        57: IconDrizzle,
        61: IconRain,
        63: IconRain,
        65: IconRain,
        66: IconRain,
        67: IconRain,
        71: IconSnow,
        73: IconSnow,
        75: IconSnow,
        77: IconSnow,
        80:IconRain,
        81: IconRain,
        82:IconStorm,
        85:IconSnow,
        86: IconSnow,
        95:IconStorm,
        96:IconStorm,
        99:IconStorm,
        
}
export default weatherCode;
