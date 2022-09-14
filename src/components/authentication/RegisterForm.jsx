import { useEffect } from "react"
import { useState } from "react"
import Style from "../../assets/css/Form.module.css"
import catchError from "../../services/ErrorCatcher"
import { RegisterUser } from "../../services/UserService"
import { convertDate } from "../../utils/Convertions"

export function RegisterForm({user_edit,on_success}){
    const [name,setName] = useState(user_edit?user_edit?.name:'')
	const [lastName,setLastName] = useState(user_edit?user_edit?.lastName:'')
    const [email,setEmail] = useState(user_edit?user_edit?.email:'')
    const [password, setPassword] =useState('')
    const [rol,setRol] = useState(user_edit?user_edit?.rol:'MEMBER')
    const [birthday,setBirthday] = useState(user_edit? convertDate(user_edit?.birthday):convertDate(new Date()))
    const [error,setError] = useState('')

    const handleRegister=async (e) =>{
		e.preventDefault();
        if(
            name===user_edit?.name &&
            lastName===user_edit?.lastName &&
            email===user_edit?.email &&
            birthday===convertDate(user_edit?.birthday)&&
            rol===user_edit?.rol
        ){
            setError("Nothing to change")
            return;
        }
		let user={
            'id':user_edit?user_edit?.id:null,
			'name':name,
			'lastName':lastName,
			'email':email,
			'password':password,
			'birthday':birthday,
            'rol':rol
		}
        console.log(user)
		try{
            const response=await RegisterUser(user)
            if(response?.status===200){
                setError(user_edit?'Updated!':'Registered!')
            }else if(response?.status===208){
                setError('Email is already registered')
            }
		}catch(er){
			setError(catchError(er))
		}
	}
    useEffect(()=>{
        return ()=>{
            if(on_success){
                on_success()
            }
        }
    },[])
    return (<form className={Style.form} onSubmit={handleRegister}>
        <input type="hidden"
            value={user_edit?user_edit.id:''}/>
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
        <select className={Style.input_form} 
            type={`${user_edit?'text':'hidden'}`} 
            onChange={(e) => setRol(e.target.value)}
            value={rol}>
                <option value='MEMBER'>MEMBER</option>
                <option value='STAFF'>STAFF</option>
                <option value='ADMIN'>ADMIN</option>
        </select>
        <input className={Style.input_form} 
            type={`${user_edit?'hidden':'password'}`} 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
        <input className={Style.input_form} 
            type="date" 
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}/>
        <h6 className={Style.error} >{error}</h6>
        <button type="submit" className={Style.btn_form}
            >{user_edit?'Update':'Register'}
        </button>
    </form>
    )
}