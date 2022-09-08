import { useContext, useEffect, useState} from 'react';
import { Loading } from '../Loading';
import {Modal} from '../Modal';
import catchError from '../../services/ErrorCatcher';
import cardStyle from '../../assets/css/cards/UserCard.module.css'
import UserContext from '../context/UserProvider';
import { UserCardProvider } from '../context/UserCardProvider';
import { UserCard } from "../cards/UserCard"
import ListModeChanger from '../list/ListModeChanger';
import { RegisterForm } from '../authentication/RegisterForm';
import { useSearchParams } from "react-router-dom";
import ListContext from '../context/ListProvider';
import FootersList from './FooterList';
import {AiOutlineUserAdd as AddIcon } from 'react-icons/ai'
import { getUserList } from '../../services/UserService';

export function UserList(){
    const {user} = useContext(UserContext)
    const {setPagination} = useContext(ListContext)
    const [isLoading, setIsLoading ]=useState(true);
    const [ users, setUsers ] = useState([])
    const [ error, setError ] = useState("")
    const [modalForm,setModalForm] = useState(false)
    const [pagePath, setPagePath] = useSearchParams();
    const page_in_path=pagePath.get("page")

    useEffect(()=>{
        console.log('rendered')
    })

    const loadUsers=async (page) =>{
        try{
			const response= await getUserList(page)
			if(response){
                const page_info={
                    "current":response.number+1,
                    "total_pages":response.totalPages,
                    "total_items":response.totalElements,
                    "showing":response.numberOfElements,
                    "last":response.last,
                    "first":response.first
                }
                setPagination(page_info)
                setUsers(response)
			}
		}catch(er){
			setError(catchError(er))
		}
        setIsLoading(false);
    }
    
    useEffect(()=>{
        const pagenumber=page_in_path? page_in_path:1;
        setIsLoading(true);
        loadUsers(pagenumber)
    },[page_in_path,user])

    if(isLoading){
        return <Loading/>
    }
    
    if(error!==""){
        return <div>
             <br/><br/>
            <center><h1>{error}</h1></center>
        </div>
    }

    return (
        <div>
            <ListModeChanger icon={<AddIcon size={30}/>} text_icon='Add user' action={()=>setModalForm(true)}/>
            <ul className={`${cardStyle.container_card}`}>
                {
                    users?.content?.map((user) =>(
                        <div key={user.id}>
                            <UserCardProvider>
                                <UserCard parameter={user}/>
                            </UserCardProvider>
                        </div>
                    ))
                }
            </ul>
            <FootersList/>
            {modalForm&&
                <Modal title={"Add a new account"} setClose={()=>setModalForm(false)}><RegisterForm/></Modal>
            }
        </div>
    );
}