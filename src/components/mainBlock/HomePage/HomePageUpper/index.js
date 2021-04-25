import React from 'react'
import { Link } from "react-router-dom"
import bgBanner from "assets/bgBanner.png"
import bookIconDark from "assets/bookIconDark.png"
import bookIconWhite from "assets/bookIconWhite.png"
import logoGirl from "assets/logoGirl.png"

import s from './styles.module.css'


const HomePageUpper = ({theme}) => {
  return (
    <React.Fragment className={s.wrapper}>
    	<img src={logoGirl} alt="" className={s.logoGirl} />
    	<div className={s.title}>
			<p className={s.title_text}>
				Buy, bitches
			</p>
			<p className={s.title_text2}>- Stephen Hawking</p>
		</div>
		<div className={s.banner}>
			<Link to="/store">
					<img src={bgBanner} alt="#" className={s.banner_image}/>
			</Link>
		</div>
		<div className={s.buttons}>
			<Link to="/store">
				<div className={s.store_button}>
					<img src={theme === "light" ? bookIconWhite : bookIconDark} alt="#" className={s.store_icon}/>
					<div>
						STORE
					</div>
				</div>
			</Link>
		</div>
    </React.Fragment>
  );
};

export default HomePageUpper;
