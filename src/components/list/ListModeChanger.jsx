import { useContext } from "react";
import { MdOutlineGrid4X4 as GridOption, 
    MdSelectAll as SelectOption,
    MdClear as NoSelectOption } from 'react-icons/md'
import { HiOutlineViewList as ListOption} from 'react-icons/hi'
import { RiDeleteBin5Line as DeleteOption} from 'react-icons/ri'
import cardStyle from '../../assets/css/list/ListMode.module.css'
import ListContext from "../../context/ListProvider"

const ListModeChanger=({icon='',text_icon='',action})=>{

    const {listMode,setListMode,selecting,setSelecting} = useContext(ListContext)
    return (
        <div className={cardStyle.option_container}>
            <div onClick={action} className={cardStyle.left_option}><a>{icon}&nbsp;{text_icon}</a></div>
        <div className={cardStyle.option_list} >
            <div onClick={()=>setSelecting(!selecting)}>
                {selecting?
                <span>
                <NoSelectOption  size={30}/>
                </span>
                :<SelectOption size={30}/>
                }&nbsp;&nbsp;
            </div>
            <div onClick={()=>setListMode(!listMode)}>
            {listMode?
            <GridOption size={30} />   
            :
            <ListOption size={30} />}
            </div>
        </div></div>
    )
}
export default ListModeChanger;