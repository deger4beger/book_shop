import React from 'react';
import { Map, Placemark } from 'react-yandex-maps'
import bgImage from "assets/bgImage.png"
import mapIconDark from "assets/mapIconDark.png"
import mapIconLight from "assets/mapIconLight.png"
import discountIconDark from "assets/discountIconDark.png"
import discountIconLight from "assets/discountIconLight.png"
import warrantyIconDark from "assets/warrantyIconDark.png"
import warrantyIconLight from "assets/warrantyIconLight.png"

import s from './styles.module.css';


const HomePageLower = ({theme}) => {
  return (
    <React.Fragment>
    	<div className={s.adds}>
			<div className={s.left}>
				Knowledge - fashionable
			</div>
			<div className={s.right}>
				<img src={bgImage} alt="#" className={s.girlImage}/>
			</div>
		</div>
		<div className={s.cases}>
			<div className={s.inner}>
				<div className={s.elem}>
					<img src={theme === "light" ? mapIconLight : mapIconDark} alt="#" className={s.caseIcon}/>
					<div className={s.content}>
						<span className={s.selection}>Fast </span>delivery <span className={s.selection}>throughout kazakhstan</span>
					</div>
				</div>
				<div className={s.elem}>
					<img src={theme === "light" ? discountIconLight : discountIconDark} alt="#" className={s.caseIcon}/>
					<div className={s.content}>
						<span className={s.selection}>Frequent </span>discounts and events
					</div>
				</div>
				<div className={s.elem}>
					<img src={theme === "light" ? warrantyIconLight : warrantyIconDark} alt="#" className={s.caseIcon}/>
					<div className={s.content}>
						Warranty and refund<span className={s.selection}> within 10 days</span>
					</div>
				</div>
			</div>
		</div>
		<div className={s.footer}>
			<div className={s.elem2}>
				<div className={s.mapContent}>
					And our own store in Kokshetau
				</div>
				<div className={s.mapContainer}>
					<Map
					    defaultState={{
					      center: [53.28514410173332, 69.36958005491239],
					      zoom: 15,
					      controls: ['zoomControl', 'fullscreenControl'],
					    }}
					    modules={['control.ZoomControl', 'control.FullscreenControl']}
					    className={s.map}>
					    <Placemark defaultGeometry={[53.28514410173332, 69.36958005491239]} />
					</Map>
				</div>
			</div>
		</div>
    </React.Fragment>
  );
};

export default HomePageLower;
