import React from 'react';
import { Link } from "react-router-dom"
import cn from "classnames"
import backIcon from "assets/navArrow.png"
import backIconLight from "assets/navArrowLight.png"
import StarRating from "components/other/StarRate/StarRating"
import { MainButton } from '../../../other/Button/Button';
import { buttonGreenCyber } from '../../../other/Button/buttonStyles';

import s from './styles.module.css';
import { updateRatingAC } from '../../../../redux/sagas/booksSaga';

const BookInfo = React.memo(({ratingColor, book, isAuth, isRatingLoading, myRateColor, dispatch, toggleCart, isLoading, theme}) => {
  return (
    <React.Fragment>
    	<div className={s.container}>
   			<div className={s.left}>
   				<Link to={"/store"}>
   					<img src={theme ==="light" ? backIconLight : backIcon} alt="#" className={s.backIcon}/>
   				</Link>
   				<img src={book?.image} alt="" className={s.image} style={{borderColor: ratingColor}}/>
   				<div className={s.rate} style={{borderColor: ratingColor}}>
   					{book.rating ? (
                     <span>
                        {parseFloat(book.rating)} / 5
                        <span className={s.reviewersCount}>
                            ({book.reviewers_count})
                        </span>
                     </span>) : ("No rating yet")}
   				</div>
   				<div className={isAuth && !isRatingLoading ? s.myRate : cn(s.myRate, s.disabled)}>
   					My rating
   					<StarRating
   						count={5}
   						value={book.my_rate}
   						size={30}
   						activeColor={myRateColor}
   						changeRate={(myRating) => dispatch(updateRatingAC(myRating, book.id))}/>
   				</div>
   			</div>
   			<div className={s.right}>
   				<div className={s.title}>
   					<div className={s.name}>
   						{book.name}
   					</div>
   					<div className={s.author}>
   						{book.author}
   					</div>
   				</div>
   				<div className={s.description}>
   					{book.description}
   				</div>
   				<div className={s.priceBlock}>
   					<div className={s.price}>
              { !book.sale ? (
                  <div>
     						    {book.price} <span className={s.dollar}>$</span>
                  </div>
                ) : (
                  <div>
                    <div>
                      <div className={s.realPrice}>
                        {book.discountPrice} <span className={s.dollar}>$</span>
                      </div>
                      <div className={s.del}>
                        <del>{book.price}</del>
                        <span className={s.sale}>(-{parseFloat(book.sale).toFixed()}%)</span>
                      </div>
                    </div>
                  </div>
                )
              }
   					</div>
   					<MainButton
   						content={"Add to cart"}
   						icon={null}
   						onClick={toggleCart}
   						isLoading={isLoading}
   						disabled={!isAuth}
   						styles={buttonGreenCyber}
   						preloaderWhite={theme === "light" ? false : true}
   					/>
   				</div>
   			</div>
   		</div>
    </React.Fragment>
  )
})

export default BookInfo;
