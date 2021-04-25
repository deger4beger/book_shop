import cn from "classnames"
import s from "./Button.module.css"
import loadingIcon from "../../../assets/loadingIcon.svg"
import loadingIconWhite from "../../../assets/loadingIconWhite.svg"

export const MainButton = ({content, icon, onClick, isLoading, disabled, styles, preloaderWhite}) => {
	return (
		<div
			className={disabled ? cn(s.loginButton, s.disabled) : s.loginButton}
		    onClick={isLoading ? undefined : disabled ? undefined : onClick}
		    style={styles} >
			    {icon && (
			    	<img src={icon}
			    		className={isLoading ? cn(s.googleIcon, s.loading) : s.googleIcon}
			    		alt="#" />
			    	)
			    }
			    {isLoading && (
			    	<img src={preloaderWhite ? loadingIconWhite : loadingIcon}
			    		className={s.loadingIcon}
			    		alt="#" />
			    	)
			    }
			    <div className={isLoading ? cn(s.content, s.loading) : s.content}>
			    	{content}
			    </div>
		</div>
	)
}