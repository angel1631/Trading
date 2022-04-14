import { useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";

export default ()=>{
    const fields_coin = [
        {id: 'id', description: 'Id del activo', type: 'number', required: false, invisible: true},
        {id: 'name', description: 'Nombre del activo', type: 'text'},
        {id: 'symbol', description: 'Simbolo del activo', type: 'text'},
        {id: 'typeCoin', description: 'Tipo de moneda', type: 'select', list: [{id:'1', name: 'Estable Coin'}, {id:'2', name:'Fiat'}, {id:'3', name:'Otras'}]}
    ];
    let show_form = useState(false);
    let form_state = useStateForm({fields: fields_coin});
    return(
        <div className="w-full">
            <GenericForm title="Coin" fields={fields_coin} url_enviar='/Coin/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}