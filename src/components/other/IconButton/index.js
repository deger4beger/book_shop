import React from "react"
import cn from "classnames"
import s from "./styles.module.css"
import smallPreloaderGreen from "assets/smallPreloaderGreen.svg"
import { useTheme } from "../../other/customHooks/useTheme"


export const IconButton = ({icon, onClick, disabled, loading}) => {
	// 16 - 20 px icons are good
	const [theme, setTheme] = useTheme()

	return (
		<>
			<div className={s.action} onClick={!loading && !disabled && onClick}>
			 	<div className={disabled ? cn(s.profile, s.disabled) : s.profile}>
			 		<img src={loading ? smallPreloaderGreen : icon} alt="#" />
			 	</div>
			</div>
		</>
	)
}
