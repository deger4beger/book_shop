import React from 'react'
import cn from "classnames"

import s from './styles.module.css'


const CustomCheckbox = ({checked, onClick}) => {
  return (
    	<div className={checked ? cn(s.wrapper, s.checked) : s.wrapper} onClick={onClick}>
    		<div className={s.inner}>
    			✓
    		</div>
    	</div>
  	)
}

export default CustomCheckbox
