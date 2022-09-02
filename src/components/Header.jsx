import   {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useQuery } from '../hooks/useQuery';
import { useEffect } from 'react';
import navicon from '../assets/images/icon-index2.svg'
import UserContext from './authentication/UserProvider';
import { Button } from 'react-bootstrap';
import Style from '../assets/css/Header.module.css'
import { baseUserImgUrl } from '../utils/BaseUrls';

const base_url = baseUserImgUrl()

export function Header() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate(); //de React Router, agregar elemento a la ruta
    const query=useQuery();
    const searchInPath=query.get("search");
    const {user,logout} = useContext(UserContext)
    const [image,setImage]=useState(`${base_url}${user?.id}`)

    useEffect(()=>{
        setImage(`${base_url}${user?.id}`)
    },[user])

    useEffect(() => {
        setSearchText(searchInPath || ""); //si searchInPath es null, set empty ""
    }, [searchInPath]);

    const submitSearch = (e) => {
        e.preventDefault();
        navigate("/?search="+searchText);//agrega a la ruta
    }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${Style.orange_bg}`}>
        <div className="container">
            <Link to="/" className="navbar-brand">
                <img src={navicon} height="30" className="d-inline-block align-top" alt=""/>
            </Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav ">
                <Link to="/" className="nav-item nav-link active text-white">Inicio</Link>
                <Link to="/game" className="nav-item nav-link text-white">Pruebas</Link>
                    <div className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Quick Access</Link>
                    <div className="dropdown-menu">
                        <Link to="/users"  className="dropdown-item">Miembros</Link>
                        <Link to="/capacitaciones"  className="dropdown-item">Capacitaciones</Link>
                        <Link to="/game"  className="dropdown-item">Pruebas</Link>
                    </div>
                    </div>
                </div>
                <form className="d-flex" role="search" onSubmit={submitSearch}>
                    <input className="form-control me-2" type="search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder="Buscar" name="searching" required/>
                    
                </form>
                {user?<div className="navbar-nav ">   
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                            <img className={[Style.profile_picture ]} src={image} 
                            alt={user.name}/>{user.name}</Link>
                        <div className="dropdown-menu">
                            <Link to="/profile"  className="dropdown-item">Profile</Link>
                            <Link to="/payments"  className="dropdown-item">Payments</Link>
                            <Button onClick={logout}  className="dropdown-item text-danger">Log out</Button>
                        </div>
                    </div>
                </div>
                :
                    <div className="navbar-nav">
                        <Link to="/login" className="nav-item nav-link text-white" id="login">Log in</Link>
                        <Link to="/register" className="nav-item nav-link text-white" id="login">Sign up</Link>
                    </div>
                }
            </div>
        </div>
    </nav>
  );
}
