import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import s from './styles.module.css'
import { withoutAuthRedirect } from '../../other/hoc/withoutAuthRedirect';
import { getEmail, getName, getPicture } from '../../../redux/selectors/authSelectors';
import { getIsLoadingProfile, getOrderData, getOrderItems } from '../../../redux/selectors/profileSelectors';
import { getProfileTC, setProfileDataAC } from '../../../redux/reducers/profileReducer';
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
            dispatch(setProfileDataAC({orderData: null, orderItems: null}))
        }
    }, [])

    if (isLoading.includes("profile") || !orderData) {
        return <Preloader />
    }

    const reversedOrderItems = orderItems.slice().reverse()
    return (
        <div className={s.wrapper}>
            <div className={s.upper}>
                <img src={picture} alt="" className={s.picture}/>
                <div className={s.info}>
                    {email} <span className={s.name}>({name})</span>
                </div>
            </div>
            <div className={s.middle}>
                <OrderingForm
                    dispatch={dispatch}
                    orderData={orderData}
                    loading={isLoading.includes("form")}
                    email={email}
                    name={name}
                    active={!!toggleEditMode}
                />
            </div>
            <div className={s.lower}>
                {reversedOrderItems.map(order => {
                    return <OrderCard {...order} key={order.id}/>
                })}
            </div>
        </div>
      )
}

export default withoutAuthRedirect(React.memo(Profile))
