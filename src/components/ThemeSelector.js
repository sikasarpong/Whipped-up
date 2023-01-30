import { useTheme } from "../hooks/useTheme"
import modeIcon from '../assets/mode-icon.svg'
// styles
import './ThemeSelector.css'

const themeColors = ['#263238', '#249c6b', '#800000']

export default function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme()


    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)


    return (
        <div className="theme-selector">
            <div className="mode-toggle">
                <img onClick={toggleMode}
                    src={modeIcon}
                    alt="change of background color of app"
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>

            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}