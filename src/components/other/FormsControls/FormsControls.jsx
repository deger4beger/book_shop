import s from "./FormsControls.module.css"


export const Element = Element => ({input, meta, ...props}) => {
	const hasError = meta.touched && meta.error
	return (
		<div className={s.formControl + " " + (hasError ? s.error : "")}>
			<div>
				<Element {...input} {...props} />
			</div>
			<div className={s.errorMessage}>
				{ meta.touched && meta.error && <span>{meta.error}</span> }
			</div>
		</div>
	)
}