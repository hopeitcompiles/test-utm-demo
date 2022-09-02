import style from './../assets/css/Modal.module.css'
export function Modal({children}){
    return (
        <div className={style.overlay}>
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Agregar miembro</h1>
                </div>
                <button  className={style.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                {children}
            </div>
        </div>
    );
}
