import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"

import s from './styles.module.css';
import { withoutAuthRedirect } from "../../other/hoc/withoutAuthRedirect.jsx"
import { Preloader } from '../../other/Preloader/Preloader';

import ProductsList from "./ProductsList"
import Modal from "../../other/Modal/Modal"
import ModalContent from "./ModalContent"
import UpperBlock from "./UpperBlock"
import {
    getCartAC,
    setCartDataAC} from '../../../redux/sagas/cartSaga';
import {
    getCartMessage,
    getIsCartLoading,
    getOrderData,
    getProducts} from '../../../redux/selectors/cartSelectors';

const Cart = props => {
    const [modal, setModal] = useState(false)

    const firstRender = useRef(true)
    const dispatch = useDispatch()

    const products = useSelector(getProducts)
    const cartMessage = useSelector(getCartMessage)
    const isCartLoading = useSelector(getIsCartLoading)
    const orderData = useSelector(getOrderData)


    useEffect( () => {
        scroll.scrollTo(0, {duration: 450})
        dispatch(getCartAC())
        return () => {
            dispatch(setCartDataAC(null, null, null, null))
        }
    }, [])

    // for Modal window
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if (orderData) {
            setModal(true)
        }
    }, [orderData])

    if (isCartLoading) {
        return <Preloader />
    }
    return (
        <div className={s.container}>
            {cartMessage && (
                <div className={s.cartMessage}>
                    Your cart is empty
                </div>
            )}
            {products && (
                <UpperBlock
                    products={products}
                />
            )}
            <ProductsList
                data={products}
            />
            <Modal active={modal} setActive={setModal}>
                <ModalContent
                    orderData={orderData}
                />
            </Modal>
        </div>
    )
}

export default withoutAuthRedirect(Cart);
