import React, { useState } from "react"
import cn from "classnames"
import s from "./Dropdown.module.css"
import dropdownIcon from "../../../assets/dropdownIcon.png"
import themeIconDark from "../../../assets/themeIconDark2.png"
import themeIconLight from "../../../assets/themeIconLight2.png"
import { useTheme } from "../../other/customHooks/useTheme"


export const Dropdown = () => {
	const [active, toggleActive] = useState(false)

	// Customs
	const [theme, setTheme] = useTheme()
	const setActiveColorMode = () => {
        const mode = theme === "dark" ? "light" : "dark"
        setTheme(mode)
        toggleActive(!active) // should add to every onclicck
    }
	// ...
	return (
		<>
			<div className={s.action}>
			 	<div className={s.profile} onClick={ () => toggleActive(!active) }>
			 		<img src={dropdownIcon} alt="#" />
			 	</div>
			 	<div className={active ? cn(s.menu, s.active) : s.menu}>
			 		<ul>
			 			<li onClick={ setActiveColorMode } >
			 				<img src={theme === "dark" ? themeIconLight : themeIconDark} alt="#" />
			 				<span>Switch theme</span>
			 			</li>
			 		</ul>
			 	</div>
			</div>
			<div className={active ? cn(s.window, s.activeDrop) : s.window} onClick={ () => toggleActive(!active) }></div>
		</>
	)
}