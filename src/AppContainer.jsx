import { ThemeProvider } from "react-switch-theme"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { App } from "./App"
import { initializeAC } from "./redux/sagas/authSaga"

export const AppContainer = () => {
	const dispatch = useDispatch()

	useEffect( () => {
		dispatch(initializeAC())
	}, [])

	const colors = {
		light: {
		  	firstBg: "#EEE",
		  	secBg: "rgb(240, 242, 245)",
		  	thirdBg: "rgb(221, 224, 227)",
		  	additional: "rgba(0, 0, 0, 0.2)",
		  	forText: "#565656FF",
		 	color: "black",
		 	main: "#478A70",
		 	selection: "#94D5BB",
		 	mainSec: "rgb(12, 102, 51)"
		},
		dark: {
		  	firstBg: "rgb(18, 18, 21)",
		  	secBg: "rgb(30, 30, 33)",
		  	thirdBg: "rgb(44, 44, 47)",
		  	additional: "rgba(255, 255, 255, 0.2)",
		  	forText: "#CECECEFF",
		 	color: "#ececed",
		 	main: "#44B78B",
		 	selection: "#2F795B",
		 	mainSec: "rgb(12, 102, 51)"
		}
	}
	const activeMode = "dark"
	const offlineStorageKey = "colorScheme"


	return (
		<ThemeProvider
			colors={colors}
			activeMode={activeMode}
			offlineStorageKey={offlineStorageKey}>
				<App />
		</ThemeProvider>
	)
}