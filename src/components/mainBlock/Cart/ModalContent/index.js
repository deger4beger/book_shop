import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import cn from "classnames"

import s from './styles.module.css'
import { MainButton } from '../../../other/Button/Button';
import { confirmOrderAC } from '../../../../redux/sagas/cartSaga';
import { getIsLoading, getSelectedItems } from '../../../../redux/selectors/cartSelectors';


const ModalContent = ({orderData}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedItems = useSelector(getSelectedItems)
    const isLoading = useSelector(getIsLoading)

    const confirmBtnLoading = isLoading.includes("confirmOrder")

    return (
       <React.Fragment>
           {orderData && (
            <div className={s.orderInfo}>
                <div className={s.orderData}>
                    <div className={s.orderTitle}>
                        Order details
                    </div>
                    {orderData.orderData ? (
                        <div>
                            <div className={s.orderElem}>
                                <span className={cn(s.orderBig, s.distinct)}>✔ Name:</span> {orderData.orderData.name}
                            </div>
                            <div className={s.orderElem}>
                                <span className={cn(s.orderBig, s.distinct)}>✔ Email:</span> {orderData.orderData.email}
                            </div>
                            <div className={s.orderElem}>
                                <span className={cn(s.orderBig, s.distinct)}>✔ Mobile phone:</span> {orderData.orderData.phone}
                            </div>
                            <div className={s.orderElem}>
                                <span className={cn(s.orderBig, s.distinct)}>✔ Postal code:</span> {orderData.orderData.postalCode}
                            </div>
                        </div>
                    ) : (
                        <div style={{textAlign: "center"}}>
                            You must fill your order details
                            <Link className={s.link} to="/profile:toggle">Fill</Link>
                        </div>
                    )
                }
                </div>
                <div className={s.orderPrice}>
                    <div>Total count: <span className={s.distinct}>{orderData.totalCount}</span></div>
                    <div>Total price: {
                        orderData.totalDiscountPrice ?
                            (
                                <span>
                                    <span className={s.distinct}>{orderData.totalDiscountPrice.toFixed(2)} $</span>
                                    <del className={s.orderDiscount}>{orderData.totalPrice.toFixed(2)}</del>
                                </span>
                            ) :
                            (
                                <span className={s.distinct}>
                                    {orderData.totalPrice.toFixed(2)}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className={s.confirmOrderButton}>
                    <MainButton
                        content={"Confirm"}
                        icon={null}
                        isLoading={confirmBtnLoading}
                        disabled={!orderData.orderData}
                        onClick={() => dispatch(confirmOrderAC(selectedItems, history))}
                    />
                </div>
                <Link className={s.link} to="/profile:toggle">
                    {orderData.orderData && (
                        <div className={s.changeOrderButton}>
                            <MainButton
                                content={"Change"}
                                icon={null}
                                isLoading={false}
                                disabled={false}
                                onClick={null}
                                styles={{
                                    width: "105px"
                                }}
                            />
                        </div>)
                    }
                </Link>
            </div>)}
        </React.Fragment>
    )
}

export default ModalContent
