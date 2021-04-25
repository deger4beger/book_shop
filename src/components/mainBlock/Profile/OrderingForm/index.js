import React, { useState } from 'react'
import cn from "classnames"

import s from './styles.module.css'
import { Element } from '../../../other/FormsControls/FormsControls';
import { composeValidators, isEmail, isPhone, isPostalCode, maxLenghtCreator, required } from '../../../other/Validators/Validator';
import { Field, Form } from 'react-final-form';
import editIcon from "assets/editIcon.png"
import cross from "assets/cross.png"
import { updateOrderDataTC } from '../../../../redux/reducers/profileReducer';


const Input = Element("input")
const length30 = maxLenghtCreator(30)


const OrderingForm = ({dispatch, orderData, loading, name, email, active}) => {
	const [editMode, setEditMode] = useState(active ? true : !orderData)
	const disabledElem = editMode && !loading
	const onSubmit = async (data, form) => {
		const res = await dispatch(updateOrderDataTC(data))
		setEditMode(false)
		return res
	}
	const onRedClick = (e, form) => {
		setEditMode(!editMode)
		if (editMode) {
			form.reset(orderData)
		}
	}
	const fillFormProf = (e, form) => {
		form.change("email", email)
		form.change("name", name)
	}

  	return (
  		<div>
  			<Form
				onSubmit={onSubmit}
				initialValues={orderData}>
				{({ handleSubmit, form }) => (
					<form onSubmit={(event) => {
						handleSubmit(event)?.then(res => !res && form.reset(orderData))
					}}>
						{
							<div
								className={disabledElem ? cn(s.bgDiv, s.active) : s.bgDiv}
						 		onClick={(e) => !loading && onRedClick(e, form)}>
							</div>
						}
						<div className={s.form} className={loading ? cn(s.form, s.disabled) : s.form}>
							<div className={s.title}>
								Order details
							</div>
							<div className={disabledElem ? s.inputs : cn(s.inputs, s.disabled)}>
								<div>
									<Field
										placeholder={"Full name"}
										name={"name"}
										className={s.input}
										component={Input}
										validate={composeValidators(required, length30)}
									/>
								</div>

								<div>
									<Field
										placeholder={"Email"}
										name={"email"}
										className={s.input}
										component={Input}
										validate={composeValidators(required, isEmail)}
										type="email"
									/>
								</div>

								<div>
									<Field
										placeholder={"Phone"}
										name={"phone"}
										className={s.input}
										component={Input}
										validate={composeValidators(required, isPhone)}
										type="text"
									/>
								</div>
								<div>
									<Field
										placeholder={"Postal code"}
										name={"postalCode"}
										className={s.input}
										component={Input}
										validate={composeValidators(required, isPostalCode)}
										type="text"
									/>
								</div>
							</div>
							<div className={s.buttons}>
								<div className={disabledElem ? s.buttonsBlock : cn(s.buttonsBlock, s.disabled)}>
									<div className={s.buttonBlock}>
										<button
											type="submit"
											className={cn(s.formButton, s.green)}>Confirm changed data</button>
									</div>
									<div className={s.buttonBlock}>
										<button
											type="button"
											onClick={() => form.reset({})}
											className={cn(s.formButton, s.reset)}>Reset data</button>
									</div>
								</div>
								<div className={s.buttonsBlock}>
									<div className={disabledElem ? s.buttonBlock : cn(s.buttonBlock, s.disabled)}>
										<button
											type="button"
											className={s.formButton}
											onClick={(e) => fillFormProf(e, form)}>Fill email & name from profile</button>
									</div>
									<div className={s.buttonBlock}>
										<button
											type="button"
											className={cn(s.formButton, s.iconButton)}
											onClick={(e) => onRedClick(e, form)}>
											<img src={disabledElem ? cross : editIcon} alt="" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</Form>
  		</div>
  	)
}

export default OrderingForm
