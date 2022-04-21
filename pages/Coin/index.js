import { useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import Coin from "../../modulos/trading/schemes/Coin"; 


export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: Coin.fields});
    return(
        <div className="w-full">
            <GenericForm title={Coin.title_form} fields={Coin.fields} url_enviar='/api/Coin/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}