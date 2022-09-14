import { useRef,useState, useEffect, useContext } from "react"
import Style from "../../assets/css/Form.module.css"
import { convertDate } from "../../utils/Convertions"
import catchError from "../../services/ErrorCatcher"
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UserProvider"
import { LoginUser, RegisterUser } from "../../services/UserService";

export function AuthForm(){
    const location=useLocation().pathname
    const [registerPanelActive,setRegisterPanelActive] = useState(
        location==='/register'?true:false)

	const [name,setName] = useState('')
	const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [birthday,setBirthday] = useState(convertDate(new Date()))

    const [error, setError] =useState('')
    const [isSigning, setIsSigning] = useState(false)

    const {login,sessionUser} = useContext(UserContext)

    const navigate=useNavigate()
	const dateRef=useRef()
    const emailRef=useRef()
    const nameRef=useRef()
    let timer

    const handleLogin=async (e) =>{
        setIsSigning(true)
        setError("")
		e?.preventDefault();
		try{
            const response=await LoginUser(email,password)
            const newToken=response.headers['authorization']
            if(newToken.startsWith('Bearer ')){
                login(newToken)
                setError('Logged in!')
            }else{
                setError('Wrong email or password')
            }
            setPassword("")
		}catch(er){
			setError(catchError(er))
		}
        setIsSigning(false)
	}

    const handleRegister=async (e) =>{
		e.preventDefault();
		setIsSigning(true)
		let user={
			'name':name,
			'lastName':lastName,
			'email':email,
			'password':password,
			'birthday':birthday
		}
		try{
           
            const response=await RegisterUser(user)
            if(response?.status===200){
                setError('Signed up!')
                handleLogin()
            }else if(response?.status===208){
                setError('This email is already registered')
            }
		}catch(er){
			setError(catchError(er))
		}
		setIsSigning(false)
	}

    useEffect(()=>{
        if(error!==''){
            clearTimeout(timer)
            timer = setTimeout(function() {
                setError('')
            }, 5000);
        }
	},[error])

    const handleRightPanel=(state)=>{
        if(location==='/register' || location==='/login'){
            navigate(state?'/register':'/login')
            return;
        }
        setRegisterPanelActive(state)
    }

    useEffect(()=>{
        setIsSigning(false)
        setError("")
        if(!(location==='/register' || location==='/login')){
            return;
        }
        if(location==='/register'){
            nameRef.current.focus()
            setRegisterPanelActive(true)
            return;
        }
        if(location==='/login'){
            emailRef.current.focus()
            setRegisterPanelActive(false)
            return;
        }
    },[location])

    useEffect(()=>{
        if(sessionUser!==null && (location==='/login' ||location==='/register')){
            navigate('/profile')
        }
    },[sessionUser])

    return (
        <div className={Style.body}>
            <div className={`${Style.container_all} ${registerPanelActive?Style.right_panel_active:''}`} id="container">
                <div className={`${Style.form_container} ${Style.sign_up_container}`}>
                    <form className={Style.form} onSubmit={handleRegister}>
                        <h1 className={Style.title}>Register</h1>
                        <span className={Style.span}>use your email to create an account</span>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Name" 
                            ref={nameRef}
                            onChange={(e) => setName(e.target.value)}
                            value={name} required/>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName} required/>
                        <input className={Style.input_form} 
                            type="email" 
                            placeholder="Email" 
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            value={email} required/>
                        <input className={Style.input_form} 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} required/>
                        <input className={Style.input_form} 
                            type="date" 
                            ref={dateRef}
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}/>
                        <button type="submit" className={Style.btn_form}
                            disabled={isSigning}>Sign Up
                        </button>
                        <a className={Style.show_on_small} onClick={()=>handleRightPanel(false)}>Have already an account?</a>
                        <h6 className={Style.error} >{error}</h6>
                    </form>
                </div>
                <div className={`${Style.form_container} ${Style.sign_in_container}`}>
                    <form className={Style.form} onSubmit={handleLogin}>
                        <h1 className={Style.title}>Sign in</h1>
                        <span className={Style.span}>with your email</span>
                        <input className={Style.input_form} 
                            type="email" 
                            placeholder="Email" 
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            value={email} required/>
                        <input className={Style.input_form} 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} required/>
                        <a className={Style.link} >Forgot your password?</a>
                        <button type="submit" className={Style.btn_form}
                            disabled={isSigning}>Sign In
                        </button>
                        <a className={Style.show_on_small} onClick={()=>handleRightPanel(true)}>Don't have an account?</a>
                        <div className={Style.m2}></div>
                        <h6 className={Style.error} >{error}</h6>
                    </form>
                </div>
                <div className={Style.overlay_container}>
                    <div className={Style.overlay_form}>
                        <div className={`${Style.overlay_panel} ${Style.overlay_left}`}>
                            <h1 className={Style.title}>Have already an account?</h1>
                            <p className={Style.paragraph}>To keep connected with us please login with your personal info that Facebook has sold</p>
                            <button className={`${Style.btn_form} ${Style.ghost}`}  
                                onClick={()=>handleRightPanel(false)} >Sign In</button>
                        </div>
                        <div className={`${Style.overlay_panel} ${Style.overlay_right}`}>
                            <h1 className={Style.title}>Don't have an account?</h1>
                            <p className={Style.paragraph}>Enter your personal details and the embarrassing email you had created when you were a child</p>
                            <button className={`${Style.btn_form} ${Style.ghost}`} 
                            onClick={()=>handleRightPanel(true)} >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}