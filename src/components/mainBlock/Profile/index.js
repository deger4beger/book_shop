import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"

import s from './styles.module.css'
import { withoutAuthRedirect } from '../../other/hoc/withoutAuthRedirect';
import { getEmail, getName, getPicture } from '../../../redux/selectors/authSelectors';
import { getIsLoadingProfile, getOrderData, getOrderItems } from '../../../redux/selectors/profileSelectors';
import { getProfileTC, setOrderDataAC } from '../../../redux/reducers/profileReducer';
import { Preloader } from '../../other/Preloader/Preloader';
import OrderingForm from "./OrderingForm"
import OrderCard from "./OrderCard"

const Profile = props => {
    const { toggleEditMode } = useParams()

    const email = useSelector(getEmail)
    const picture = useSelector(getPicture)
    const isLoading = useSelector(getIsLoadingProfile)
    const name = useSelector(getName)
    const orderData = useSelector(getOrderData)
    const orderItems = useSelector(getOrderItems)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileTC())
        return () => {
            dispatch(setOrderDataAC(null))
        }
    }, [])

    useEffect(() => {
        if (toggleEditMode && !!orderItems && orderItems?.length !== 0) {
            scroll.scrollToBottom()
        }
    }, [toggleEditMode, orderItems])

    if (isLoading.includes("profile") || !orderData) {
        return <Preloader />
    }
      return (
        <div className={s.wrapper}>
            <div className={s.upper}>
                <img src={picture} alt="" className={s.picture}/>
                <div className={s.info}>
                    {email} <span className={s.name}>({name})</span>
                </div>
            </div>
            <div className={s.middle}>
                {orderItems.reverse().map(order => {
                    return <OrderCard {...order} key={order.id}/>
                })}
            </div>
            <div className={s.lower}>
                <OrderingForm
                    dispatch={dispatch}
                    orderData={orderData}
                    loading={isLoading.includes("form")}
                    email={email}
                    name={name}
                    active={!!toggleEditMode}
                />
            </div>
        </div>
      )
}

export default withoutAuthRedirect(Profile)
