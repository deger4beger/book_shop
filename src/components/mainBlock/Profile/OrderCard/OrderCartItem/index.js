import React from 'react';

import s from './styles.module.css';
import bookIconWhite from "assets/bookIconWhite.png"

const OrderCartItem = ({id, price, count, title, author, image, last}) => {
    let border = null
    if (!last) {
        border = {
            borderBottom: "1px solid var(--additional)"
        }
    }
  	return (
    	<div className={s.wrapper} style={border}>
            <div className={s.upper}>
        		<img src={image} alt="" className={s.image}/>
        		<div className={s.info}>
        			<div className={s.title}>
        				{title}
        			</div>
        			<div className={s.author}>
        				{author}
        			</div>
        		</div>
            </div>
    		<div className={s.price}>
    			<div className={s.priceItem}>
    				x{count}
    			</div>
    			<div className={s.priceItem}>
    				{price}$
    			</div>
    		</div>
    	</div>
  	);
};

export default OrderCartItem;
