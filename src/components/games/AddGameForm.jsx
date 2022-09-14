import { useEffect, useState } from "react"
import Style from "../../assets/css/Form.module.css"
import catchError from "../../services/ErrorCatcher"
import { RegisterGame } from "../../services/GameService"

export function AddGameForm({game_edit,on_success}){

    const [title,setTitle] = useState(game_edit?game_edit?.title:'')
    const [description,setDescription] = useState(game_edit?game_edit?.description:'')

    const [error,setError] = useState('')

    const handleRegister=async (e) =>{
		e.preventDefault();
        if(
            title===game_edit?.title &&
            description===game_edit?.description
        ){
            setError("Nothing to change")
            return;
        }
		let game={
            'id':game_edit?game_edit?.id:null,
			'title':title,
			'description':description,
		}
		try{
            const response=await RegisterGame(game)
            if(response?.status===200){
                setError(game_edit?'Updated!':'Registered!')
            }else if(response?.status===208){
                setError('Title game is already registered')
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
                    value={game_edit?game_edit.id:''}/>
                <input className={Style.input_form} 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}/>
                <input className={Style.input_form} 
                    type="text" 
                    placeholder="Description" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}/>
                <h6 className={Style.error} >{error}</h6>
                <button type="submit" className={Style.btn_form}
                    >{game_edit?'Update':'Register'}
                </button>
            </form>
    )
}