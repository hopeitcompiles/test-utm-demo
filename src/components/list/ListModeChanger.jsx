import { useContext } from "react";
import { BsFillGridFill as GridOption, BsListUl as ListOption } from 'react-icons/bs';
import cardStyle from '../../assets/css/list/ListMode.module.css'
import ListContext from "../context/ListProvider";

const ListModeChanger=({icon='',text_icon='',action})=>{

    const {list,setList} = useContext(ListContext)
    return (
        <div className={cardStyle.option_container}>
            <div onClick={action} className={cardStyle.left_option}><a>{icon}&nbsp;{text_icon}</a></div>
        <div className={cardStyle.option_list} onClick={()=>setList(!list)}>
            {list?
            <GridOption size={30} />   
            :
            <ListOption size={30} />
        }</div></div>
    )
}
export default ListModeChanger;