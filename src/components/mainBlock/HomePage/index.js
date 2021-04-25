import { useTheme } from "../../other/customHooks/useTheme"
import s from "./styles.module.css"
import HomePageUpper from "./HomePageUpper"
import HomePageMiddle from "./HomePageMiddle"
import HomePageLower from "./HomePageLower"


export default function HomePage() {
	const [theme, setTheme] = useTheme()
    return (
    	<div className={s.wrapper}>
    		<div className={s.container}>
                <HomePageUpper
                    theme={theme}
                />
                <HomePageMiddle />
                <HomePageLower
                    theme={theme}
                />
    		</div>
		</div>
 	)
}