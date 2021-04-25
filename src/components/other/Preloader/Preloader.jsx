import s from "./Preloader.module.css"
import { useTheme } from '../customHooks/useTheme';
import preloaderLight from "assets/preloaderLight.svg"
import preloaderDark from "assets/preloaderDark.svg"

export function Preloader() {
	const [theme, setTheme] = useTheme()
    return (
    	<div className={s.wrapper}>
    		<img src={theme === "light" ? preloaderLight : preloaderDark} alt="#" className={s.preloader}/>
    	</div>
 	);
}