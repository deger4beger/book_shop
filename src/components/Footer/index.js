import cn from "classnames"
import s from "./styles.module.css"
import logoIconDark from "../../assets/logoIconDark.png"
import logoIconLight from "../../assets/logoIconLight.png"
import { useTheme } from "../other/customHooks/useTheme"

export default function Footer() {
    const [theme, setTheme] = useTheme()
    return (
    	<div className={s.wrapper}>
    		<div className={s.container}>
    			<div className={s.upper}>
                    <div className={s.upper_block}>
                        <div className={s.head}>Help</div>
                        <div className={s.ordinary}>About us</div>
                        <div className={s.ordinary}>Contacts</div>
                        <div className={s.ordinary}>Support</div>
                    </div>
                    <div className={cn(s.upper_block, s.last)}>
                        <div className={s.head}>Social</div>
                        <div className={s.ordinary}>VK</div>
                        <div className={s.ordinary}>Discord</div>
                        <div className={s.ordinary}>Instagram</div>
                    </div>
    			</div>
    			<div className={s.lower}>
                    <div className={cn(s.lower_block, s.up)}>
                        <img src={theme === "light" ? logoIconLight : logoIconDark} className={s.logoIcon} alt="#" />
                        <div className={s.title}>
                            dew
                        </div>
                    </div>
                    <div className={cn(s.lower_block, s.low)}>
                        dew © 2021
                    </div>
    			</div>
    		</div>
		</div>
 	)
}