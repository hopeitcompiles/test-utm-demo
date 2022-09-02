import { useContext } from "react";
import { BsFillGridFill as GridOption, BsListUl as ListOption } from 'react-icons/bs';
import cardStyle from '../../assets/css/ListMode.module.css'
import ListContext from "./ListProvider";

const ListModeChanger=()=>{

    const {list,setList} = useContext(ListContext)
    return (
        <div className={cardStyle.option_container}>
        <div className={cardStyle.option_list} onClick={()=>setList(!list)}>
            {list?
            <GridOption size={30} />   
            :
            <ListOption size={30} />
        }</div></div>
    )
}
export default ListModeChanger;