import React from 'react';

import s from './styles.module.css';


const SalePriceBlock = ({sale, discountPrice, price}) => {
  return (
    <div className={s.price}>
	    {sale ? (
	        <div className={s.priceBlock}>
	            <del className={discountPrice && s.discount}>
	                {price} {!discountPrice && <span className={s.dist}>$</span> }
	            </del>
	            <div className={s.discountPrice}>
	                {discountPrice} <span className={s.dist}>$</span>
	            </div>
	        </div>
	    ) : (
	        <span>
	            {price} <span className={s.dist}>$</span>
	        </span>
	    )}
	</div>
  );
};

export default SalePriceBlock;
