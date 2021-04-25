import { useContext } from 'react'
import { Theme } from "react-switch-theme"

export const useTheme = () => {
	const [theme, setTheme] = useContext(Theme)

	return [ theme, setTheme ]
}