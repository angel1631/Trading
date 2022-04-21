import { useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import TypeCoin from "../../modulos/trading/schemes/TypeCoin"; 


export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: TypeCoin.fields});
    return(
        <div className="w-full">
            <GenericForm title={TypeCoin.title_form} fields={TypeCoin.fields} url_enviar='/api/TypeCoin/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}