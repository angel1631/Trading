import { useState, useEffect } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import { GenericList } from "../../Core/components/GenericList";
import Exchange from "../../modulos/trading/schemes/Exchange"; 


export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: Exchange.fields});
    let list_scheme = useState([]);
    async function refresh_list(){
        let api_list = await fetch(`/api/Exchange/list`);
        if(api_list.status!=200) throw respuesta;
        let list = (await api_list.json()).data;
        list_scheme[1](list);
    }
    useEffect(()=>{
        refresh_list();
    },[]);
    return(
        <div className="w-full">
            <GenericForm title={Exchange.title_form} fields={Exchange.fields} url_enviar='/api/Exchange/insert' state_show_form={show_form} form_state={form_state}/>
            <GenericList title={Exchange.title_form} state_show_form={show_form} state_list ={list_scheme} fields_display={Exchange.fields_display} state_form={form_state} />
        </div>
    );
}