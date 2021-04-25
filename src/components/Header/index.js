import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import s from "./styles.module.css"
import cn from "classnames"
import { Dropdown } from "../other/Dropdown/Dropdown"
import { GoogleAuth } from "./GoogleLogin/GoogleLogin"
import { useTheme } from "../other/customHooks/useTheme"
import logoIconDark from "../../assets/logoIconDark.png"
import logoIconLight from "../../assets/logoIconLight.png"
import { MainButton } from '../other/Button/Button';
import { getIsAuth } from '../../redux/selectors/authSelectors';
import { useNotification } from '../other/Alert/AlertProvider';
import { useEffect, useRef } from 'react';
import { getAlertMessage } from '../../redux/selectors/booksSelectors';
import { IconButton } from '../other/IconButton';
import profileIcon from "assets/profileIcon.png"
import cartIcon from "assets/cartIcon.png"

export default function Header() {
    const [theme, setTheme] = useTheme()

    // for alert in store and oneBook
    const alertMessage = useSelector(getAlertMessage)
    const firstRender = useRef(true)
    const alert = useNotification()

    useEffect( () => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if (alertMessage === null) {
            return
        }
        alert({
            type: "SUCCESS",
            message: "Added to cart"
        })
    }, [alertMessage])

    //
    const isAuth = useSelector(getIsAuth)
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div>
                    <Link className={cn(s.logo, s.link)} to={"/homepage"}>
                        <img src={theme === "light" ? logoIconLight : logoIconDark} className={s.logoIcon} alt="#" />
                        <div className={s.title}>
                            dew
                        </div>
                    </Link>
                </div>
                <div className={s.routes}>
                    <div className={s.route}>
                        <Link className={s.link} to={"/store"}>
                            <span className={s.routeItem}>Store</span>
                        </Link>
                    </div>
                    <div className={s.route}>
                        <Link className={s.link} to={"/3"}>
                            <span className={s.routeItem}>Support</span>
                        </Link>
                    </div>
                </div>
                <div className={s.options}>
                    <Link
                        to={"/profile"}
                        className={!isAuth ? cn(s.link, s.disabled) : s.link}>
                        <IconButton
                            disabled={!isAuth}
                            loading={false}
                            onClick={null}
                            icon={profileIcon}
                        />
                    </Link>
                    <Link
                        to={"/cart"}
                         className={!isAuth ? cn(s.cartButton, s.disabled) : s.cartButton}
                        >
                        <IconButton
                            icon={cartIcon}
                            loading={false}
                            disabled={!isAuth}
                            onClick={null}
                        />
                    </Link>
                    <div className={s.dropdown}>
                        <Dropdown />
                    </div>
                    <GoogleAuth />
                </div>
            </div>
        </div>
     )
}