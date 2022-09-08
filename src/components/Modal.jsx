import { useEffect } from 'react';
import style from './../assets/css/Modal.module.css'
export function Modal({children,setClose,title}){
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = 'unset';
        }
    })
    return (
        <div onClick={setClose} className={style.overlay}>
            <div onClick={(e)=>{
                e.stopPropagation()
            }} className={style.container}>
                <div className={style.title}>
                    <h1>{title}</h1>
                </div>
                <button onClick={setClose} className={style.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                {children}
            </div>
        </div>
    );
}
