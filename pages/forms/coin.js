import { useEffect, useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import { GenericList } from "../../Core/components/GenericList";
import Coin from "../../modulos/trading/schemes/Coin"; 

export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: Coin.fields});
    let list_scheme = useState([]);
    async function refresh_list(){
        let api_list = await fetch(`/api/Coin/list`);
        if(api_list.status!=200) throw respuesta;
        let list = (await api_list.json()).data;
        list_scheme[1](list);
    }
    useEffect(()=>{
        refresh_list();
    },[]);
    return(
        <div className="w-full">
            <GenericForm title={Coin.title_form} fields={Coin.fields} url_enviar='/api/Coin/insert' state_show_form={show_form} form_state={form_state}/>
            <GenericList title={Coin.title_form} state_show_form={show_form} state_list ={list_scheme} fields_display={Coin.fields_display} state_form={form_state} />
            
        </div>
    );
}