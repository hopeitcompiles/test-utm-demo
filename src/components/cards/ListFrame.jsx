import { ListProvider } from "../context/ListProvider";
import cardStyle from '../../assets/css/ListMode.module.css'
 



export function ListFrame(parameter) {

    return (
        <section className={cardStyle.container_list}>
             <ListProvider>
                {parameter.parameter}
            </ListProvider>
        </section>
    )
}