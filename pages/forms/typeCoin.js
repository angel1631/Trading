import { useState, useEffect } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import TypeCoin from "../../modulos/trading/schemes/TypeCoin"; 
import { GenericList } from "../../Core/components/GenericList";

export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields: TypeCoin.fields});
    let list_scheme = useState([]);
    async function refresh_list(){
        let api_list = await fetch(`/api/TypeCoin/list`);
        if(api_list.status!=200) throw api_list;
        let list = (await api_list.json()).data;
        list_scheme[1](list);
    }
    useEffect(()=>{
        refresh_list();
    },[]);
    return(
        <div className="w-full">
            <GenericForm title={TypeCoin.title_form} fields={TypeCoin.fields} url_enviar='/api/TypeCoin/insert' state_show_form={show_form} form_state={form_state}/>
            <GenericList title={TypeCoin.title_form} state_show_form={show_form} state_list ={list_scheme} fields_display={TypeCoin.fields_display} state_form={form_state} />
        </div>
    );
}