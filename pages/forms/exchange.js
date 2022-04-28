import { useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import Exchange from "../../modulos/trading/schemes/Exchange"; 


export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: Exchange.fields});
    return(
        <div className="w-full">
            <GenericForm title={Exchange.title_form} fields={Exchange.fields} url_enviar='/api/Exchange/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}