import validator from "validator"

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required= value => {

	if (value) return undefined
	return "Required"
}

export const maxLenghtCreator = (maxLength) => (value) => {
	if (!value) return undefined
	if (value.length > maxLength) return `Max length is ${maxLength} symbols`
}

export const isEmail = value => {
	if (!value) return undefined
	if (validator.isEmail(value)) {
		return undefined
	}
	return "Incorrect email"
}

export const isPhone = value => {
	if (!value) return undefined
	if (validator.isMobilePhone(value)) {
		return undefined
	}
	return "Incorrect phone number"
}

export const isPostalCode = value => {
	if (!value) return undefined
	if (validator.isPostalCode(value, "RU")) {
		return undefined
	}
	return "Incorrect postal code"
}