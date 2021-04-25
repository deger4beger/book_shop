import s from "./Modal.module.css"

export default function Modal({active, setActive, children}) {
    return (
    	<div className={active ? s.modal + " " + s.active : s.modal} onClick={ () => setActive(false) }>
    		<div className={active ? s.modal__content + " " + s.active : s.modal__content}
                onClick={e => e.stopPropagation()}>
                <span href="#" class={s.close} onClick={ () => setActive(false) } />
                {children}
            </div>
    	</div>
 	);
}