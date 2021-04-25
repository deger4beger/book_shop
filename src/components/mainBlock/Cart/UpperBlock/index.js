import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import s from './styles.module.css'
import { MainButton } from '../../../other/Button/Button';
import {
    clearBooksInCartAC,
    getOrderDataAC,
    toggleSelectedItemsAC } from '../../../../redux/sagas/cartSaga';
import { buttonGreenCyber, buttonRedCyber } from '../../../other/Button/buttonStyles';
import { useTheme } from '../../../other/customHooks/useTheme';
import Checkbox from "../../../other/CustomCheckbox"
import {
	getIsLoading,
	getSelectedItems,
	getTotalCount,
	getTotalDiscountPrice,
	getTotalPrice } from '../../../../redux/selectors/cartSelectors';

const UpperBlock = ({ products}) => {
	const [theme, setTheme] = useTheme()
	const dispatch = useDispatch()

	const totalCount = useSelector(getTotalCount)
    const totalPrice = useSelector(getTotalPrice)
    const totalDiscountPrice = useSelector(getTotalDiscountPrice)
    const isLoading = useSelector(getIsLoading)
    const selectedItems = useSelector(getSelectedItems)

    const checked = (selectedItems?.length === products?.length) && selectedItems.length !== 0
    const isDiscountPriceShown = totalDiscountPrice && totalDiscountPrice !== totalPrice &&
        !(parseInt(totalDiscountPrice.toFixed()) === 0)

    const loadingClearCart = isLoading.includes("cart")
    const loading = isLoading.includes("order")

    const disabled = products?.length === 0 || !products
    const disabledClearCart =  isLoading.filter(el => el !== "cart").length !== 0 || disabled
    const disabledMakeOrder =  isLoading.filter(el => el !== "order").length !== 0 ||
        selectedItems.length === 0 || disabled

    const onCheckboxClick = () => {
        if (checked) {
            dispatch(toggleSelectedItemsAC(selectedItems, false, true))
        } else {
            let a = []
            products.forEach(product => {
                if (!selectedItems.includes(product.product.id)) {
                    a.push(product.product.id)
                }
            })
            dispatch(toggleSelectedItemsAC(a, true, true))
        }
    }

  	return (
    	<div className={s.info}>
            <div className={s.innerInfo}>
                <div className={s.priceBlock}>
                    <span className={s.distinct}>{totalCount}</span> {totalCount === 1 ? "book" : "books"} on&nbsp;
                    {isDiscountPriceShown ? (
                        <span className={s.relative}>
                            <del className={s.discount}>
                                {totalPrice.toFixed(2)}
                            </del>
                            <span className={s.distinct}>
                                {totalDiscountPrice.toFixed(2)} $
                            </span>
                        </span>
                    ) : (
                        <span className={s.distinct}>
                            {totalPrice.toFixed(2)} $
                        </span>
                    )}
                </div>
                <div className={s.buttons}>
                    <div className={s.firstButton}>
                        <MainButton
                            content={"Clear cart"}
                            icon={null}
                            isLoading={loadingClearCart}
                            disabled={disabledClearCart}
                            onClick={() => dispatch(clearBooksInCartAC())}
                            styles={buttonRedCyber}
                            preloaderWhite={theme === "light" ? false : true}
                        />
                    </div>
                    <MainButton
                        content={"Make order"}
                        icon={null}
                        isLoading={loading}
                        disabled={disabledMakeOrder}
                        onClick={() => dispatch(getOrderDataAC(selectedItems))}
                        styles={buttonGreenCyber}
                        preloaderWhite={theme === "light" ? false : true}
                    />
                </div>
            </div>
            <div className={s.checkbox}>
                <Checkbox
                    checked={checked}
                    onClick={onCheckboxClick}
                />
                Select all
            </div>
        </div>
  	)
}

export default UpperBlock
