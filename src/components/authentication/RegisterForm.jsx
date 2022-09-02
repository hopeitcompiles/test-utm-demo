import { useState } from "react"
import Style from "../../assets/css/Form.module.css"
import { convertDate } from "../../utils/Convertions"

export function RegisterForm(){
    const [name,setName] = useState('')
	const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [birthday,setBirthday] = useState(convertDate(new Date()))

    return (<form className={Style.form} >
                        <h1 className={Style.title}>Register</h1>
                        <span className={Style.span}>use your email to create an account</span>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}/>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}/>
                        <input className={Style.input_form} 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                        <input className={Style.input_form} 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                        <input className={Style.input_form} 
                            type="date" 
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}/>
                        <button type="submit" className={Style.btn_form}
                            >Sign Up
                        </button>
                    </form>
    )
}