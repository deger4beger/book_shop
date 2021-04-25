import GoogleLogin from "react-google-login"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MainButton } from "../../other/Button/Button"
import { loginAC, logoutAC } from "../../../redux/sagas/authSaga"
import { useTheme } from "../../other/customHooks/useTheme"
import { getIsAuth, getIsLoading } from "redux/selectors/authSelectors"
import googleIconDark from "../../../assets/googleIconDark.png"
import googleIconLight from "../../../assets/googleIconLight.png"

export function GoogleAuth() {
    const isAuth = useSelector(getIsAuth)
    const isLoading = useSelector(getIsLoading)
    const history = useHistory()

    const dispatch = useDispatch()
    const [theme, setTheme] = useTheme()

    const responseSuccess = async (response) => {
        dispatch(loginAC(response.tokenId, history))
    }
    const responseError = (response) => {
        console.log(response)
    }
    const logout = () => {
        dispatch(logoutAC(history))
    }
    return (
    	<div>
            {isAuth ?
                <MainButton
                    content={"Logout"}
                    icon={theme === "dark" ? googleIconDark : googleIconLight}
                    isLoading={isLoading}
                    disabled={false}
                    onClick={logout}
                />
            : <GoogleLogin
                clientId="29897898232-727dsvebqsfa7kqrddl0hhbbfalg0vjp.apps.googleusercontent.com"
                render={renderProps => (
                    <MainButton
                        content={"Login"}
                        icon={theme === "dark" ? googleIconDark : googleIconLight}
                        isLoading={isLoading}
                        disabled={false}
                        onClick={renderProps.onClick}
                    />
                )}
                onSuccess={responseSuccess}
                onFailure={responseError}
                cookiePolicy={'single_host_origin'}
            />
            }
		</div>
 	)
}