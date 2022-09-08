import { createContext, useState } from "react";
const ListContext=createContext();

const ListProvider=({children})=>{
    const [list,setList] = useState(false)
    const [pagination,setPagination]=useState([])
    const data = {list,setList,pagination,setPagination}

    return (
        <ListContext.Provider value={data}>
            {children}
        </ListContext.Provider>
    )
}
export {ListProvider}
export default ListContext;