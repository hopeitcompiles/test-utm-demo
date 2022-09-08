import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GrFormNext as Next, GrFormPrevious as Previous,GrUndo as Back } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Style from '../../assets/css/list/Pagination.module.css'
import ListContext from '../context/ListProvider';

const MAX_BUTTONS=5
const FootersList=()=>{
    const {pagination}=useContext(ListContext)
    const navigate = useNavigate();    
    const [buttons,setButtons]=useState([])

    const page_numbers=()=>{
        if(pagination.total_pages<=MAX_BUTTONS || pagination.current<(MAX_BUTTONS/2).toFixed() ){
            return [...Array(pagination.total_pages<MAX_BUTTONS?pagination.total_pages:MAX_BUTTONS).keys()]
        } if(pagination.current>pagination.total_pages-MAX_BUTTONS+MAX_BUTTONS/2){
            return Array.from({length: MAX_BUTTONS}, (_, index) => index + pagination.total_pages-MAX_BUTTONS);
        }
        return Array.from({length: MAX_BUTTONS}, (_, index) => index + pagination.current-(MAX_BUTTONS/2).toFixed());
    }

    useEffect(()=>{
        if(pagination){
            setButtons(page_numbers())
        }
    },[pagination])

    const handleclick=(value)=>{
        if(value === pagination?.current || value < 1 ||value >pagination?.total_pages){
            return;
        }
        navigate("?page="+value)
    }
    const handlelastpage=()=>{
        navigate("?page="+pagination.total_pages)
    }

    return (
        <section>
            {pagination?.total_pages>1&&
            <div className={Style.foot_list}>
                <div className={Style.pagination}>
                    <a 
                    onClick={()=>handleclick(pagination.current-1)} className={`${pagination.first&& Style.disabled}`}>
                        <Previous size={20} />
                    </a>
                    {
                        buttons?.map((number) =>(
                            <a onClick={()=>handleclick(number+1)} key={number} className={`${pagination.current===(number+1)&&Style.active}`}
                            >{number+1}</a>
                        ))
                    }
                    <a onClick={()=>handleclick(pagination.current+1)}
                    className={`${pagination?.last&&'disabled'}`}><Next size={20}/></a>
                </div>
            </div>
            }
            <div className={Style.information}>
                {pagination?.current>pagination?.total_pages&&
                    <div>
                        <p>There's no page {pagination.current}</p>
                        <p className={Style.back} onClick={handlelastpage}><Back size={30}/>&nbsp; Go back to page {pagination.total_pages}</p>
                    </div>
                }
                <a>Displaying {pagination?.showing} of {pagination?.total_items} elements</a>
            </div>
        </section>
    )
}
export default FootersList;