import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import cn from "classnames"
import { Link } from "react-router-dom"

import s from './styles.module.css'
import { getIsLoading, getSelectedItems } from '../../../../../redux/selectors/cartSelectors';
import { patchBookInCartAC, removeBookInCartAC, toggleSelectedItemsAC } from '../../../../../redux/sagas/cartSaga';
import SalePriceBlock from "../../../Store/BooksList/BookCard/SalePriceBlock"
import Checkbox from "../../../../other/CustomCheckbox"


const CartBookCard = React.memo(({name, price, author, image, count, id, sale, discountPrice}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading)
    const selectedItems = useSelector(getSelectedItems)
    const loading = isLoading.includes(id) || isLoading.includes("cart") || isLoading.includes("order")
    const checked = selectedItems.includes(id)
    const toggleSelected = () => {
        if (checked) {
            dispatch(toggleSelectedItemsAC([id], false, true))
        } else {
            dispatch(toggleSelectedItemsAC([id], true, true))
        }
    }
    return (
        <div className={s.wrapper}>
            <div className={s.checkbox}>
                <Checkbox
                    checked={checked}
                    onClick={toggleSelected}
                />
            </div>
            { sale && <div className={s.sale}>{parseFloat(sale)} %</div> }
            <div className={s.inner}>
                <div className={s.countBlock}>
                    <div
                        className={count >= 20 || loading ? cn(s.sign, s.top, s.disabled) : cn(s.sign, s.top)}
                        onClick={() => dispatch(patchBookInCartAC(id, "add"))}>
                        +
                    </div>
                    <div className={s.count}>
                        {count}
                    </div>
                    <div
                        className={count === 1 || loading ? cn(s.sign, s.bottom, s.disabled) : cn(s.sign, s.bottom)}
                        onClick={() => dispatch(patchBookInCartAC(id, "remove"))}>
                        -
                    </div>
                </div>
                <div className={s.higher}>
                    <img src={image} alt="" className={s.bookIcon}/>
                </div>
                <div className={s.lower}>
                    <div className={s.title}>
                        <Link to={`book/${id}`} className={s.link}>
                            {name}
                        </Link>
                    </div>
                    <div className={s.author}>
                        {author}
                    </div>
                    <SalePriceBlock
                        sale={sale}
                        price={price}
                        discountPrice={discountPrice}
                    />
                    <div
                        className={loading ? cn(s.button, s.disabled) : s.button}
                        onClick={() => dispatch(removeBookInCartAC(id))}>
                            <span className={s.cartText}>Remove</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CartBookCard
