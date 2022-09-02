import { useContext, useEffect, useState } from 'react';
import { Loading } from './Loading';
import {useQuery} from './../hooks/useQuery'
import {Modal} from './Modal';
import catchError from '../services/ErrorCatcher';
import { getUsers } from '../utils/ApiClient';
import cardStyle from '../assets/css/UserCard.module.css'
import UserContext from './authentication/UserProvider';
import { UserCardProvider } from './cards/UserCardProvider';
import { AuthForm } from './authentication/AuthForm';
import { UserCard } from "./cards/UserCard"
import ListModeChanger from './context/ListModeChanger';
import { RegisterForm } from './authentication/RegisterForm';

export function UserList(){
    const {user} = useContext(UserContext)

    const [isLoading, setIsLoading ]=useState(true);
    const [ users, setUsers ] = useState([]);
    const [ error, setError ] = useState("");
    const [form,setForm] = useState(false)
    const query = useQuery();
    const search=query.get("search");

    const loadUsers=async () =>{
        try{
			const response= await getUsers()
			if(response){
                setUsers(response)
			}
		}catch(er){
			setError(catchError(er))
		}
        setIsLoading(false);
    }
    
    useEffect(()=>{
        setIsLoading(true);
        loadUsers()
    },[search])

    if(isLoading){
        return <div>
                <Loading/>
            </div>
    }
    
    if(error!==""){
        return <div>
             <br/><br/>
            <center><h1>{error}</h1></center>
        </div>
    }

    if(users?.length === 0){
        return <div>
             <br/><br/>
            <center><h1>Nothing to show</h1></center>
        </div>
    }
    return (
        <div>
            {!user?
                <AuthForm/>
            :(
                    <div>
                        <div >
                            <button className='col-2' onClick={()=>setForm(!form)}>Agregar miembro</button>
                            <h5 >Mode: <span className={`${user?.role}`}>{user?.role}</span></h5>
                        </div>
                        <ListModeChanger/>
                        <ul className={cardStyle.container_card}>
                            {
                                users?.map((user) =>(
                                    <div key={user.id}>
                                        <UserCardProvider>
                                            <UserCard parameter={user}/>
                                        </UserCardProvider>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
            )}
            {form&&
                <Modal><RegisterForm/></Modal>
            }
        </div>
    );
}