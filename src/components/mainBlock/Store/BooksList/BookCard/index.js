import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import { animateScroll as scroll } from "react-scroll"

import s from './styles.module.css'
import { useTheme } from "components/other/customHooks/useTheme"
import loadingIcon from "assets/loadingMainIcon.svg"

import cartIconLight from "assets/cartIconLight.png"
import cartIconDark from "assets/cartIconDark.png"
import { addToCartAC } from '../../../../../redux/sagas/cartSaga';
import { getIsLoading } from '../../../../../redux/selectors/cartSelectors';
import { getIsAuth } from '../../../../../redux/selectors/authSelectors';
import { ratePainter } from '../../../../../redux/helpers';
import SalePriceBlock from "./SalePriceBlock"

const BookCard = React.memo(({name, author, image, price, id, getBooks, rating, sale, discountPrice}) => {
    const [theme, setTheme] = useTheme()
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading)
    const isAuth = useSelector(getIsAuth)
    const loading = isLoading.includes(id)
    const ratingColor = ratePainter(rating)

    const toggleCart = () => {
        dispatch(addToCartAC(id))
    }

    const authorClick = () => {
        getBooks({search: author})
        scroll.scrollTo(0, {duration: 450})
    }

    return (
        <div className={s.wrapper}>
            { sale && <div className={s.sale}>{parseFloat(sale)} %</div> }
            <div className={s.inner}>
                <div className={s.higher}>
                    <Link to={`book/${id}`} className={s.link}>
                        <img src={image} alt="" className={s.bookIcon}/>
                    </Link>
                    <div className={s.rating} style={{color: ratingColor}}>
                        {rating ? parseFloat(rating) : "-"}
                    </div>
                    <div className={s.iner}></div>
                </div>
                <div className={s.lower}>
                    <div className={s.title}>
                        <Link to={`book/${id}`} className={s.link}>
                            {name}
                        </Link>
                    </div>
                    <div className={s.author} onClick={authorClick}>
                        {author}
                    </div>
                    <SalePriceBlock
                        sale={sale}
                        discountPrice={discountPrice}
                        price={price}
                    />
                    <div className={!isAuth ? cn(s.button, s.disabled) :
                            loading ? cn(s.button, s.loading) : s.button} onClick={toggleCart}>
                        {!loading &&
                            <div>
                                <img src={theme === "light" ? cartIconLight : cartIconDark} alt="#" className={s.cartIcon} />
                                <span className={s.cartText}>Add to cart</span>
                            </div>
                        }
                        {loading &&
                            <span className={s.cartText}>
                                <img src={loadingIcon} alt="#" />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default BookCard
