import { useEffect, useState } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import Trade from "../../modulos/trading/schemes/Trade"; 


export default ()=>{
    let fields_bc = Trade.fields;
    let show_form = useState(false);
    let form_state = useStateForm({fields: fields_bc});
    let fields = [
        {id: 'CoinCompraId', type: 'select', description: 'Divisa a comprar', foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'CoinEntregaId', type: 'select', description: 'Divisa con que paga',  foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'precio_compra', typeDB: 'decimal(65,16)', type: 'moneda', description: 'El precio en dolares de la divisa a comprar', def: '0'},
        {id: 'precio_entrega', typeDB: 'decimal(65,16)', type: 'moneda', description: 'Precio en dolares de la divisa que entregar', def: '0'},
        {id: 'cantidad_entrega', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de divisa que entregara', def: '0'},
        {id: 'cantidad_recibe', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de divisa que recibe', def:'0'},
        {id: 'fecha', type:'date', description: 'Fecha del trade', def: ()=>{let now = new Date(); now = getDateShort(now); return now}}
    ];
    useEffect(()=>{
        fields.map(async (field,index)=>{
            if(field.type=='select' && field.list.url){
                const url = field.list.url;
                let res_api = await fetch(`${url}`);
                res_api = await res_api.json()
                fields[index].list.options = res_api.data;
            }
        })
    },[]);
    useEffect(()=>{
        let b_form_state={...form_state[0]};
        b_form_state.cantidad_recibe = parseFloat(b_form_state.cantidad_entrega ) / parseFloat(b_form_state.precio_compra) || 0;
        form_state[1](b_form_state);
    },[form_state[0].precio_compra, form_state[0].cantidad_entrega])
    return(
        <div className="w-full">
            <form onSubmit={(e)=>{send_form({e,url_enviar})}} className="formulario_base">
                
            </form>
            <GenericForm title={Trade.title_form} fields={Trade.fields} url_enviar='/api/Trade/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}