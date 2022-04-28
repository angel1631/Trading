import { useState, useEffect } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
import { GenericList } from "../../Core/components/GenericList";
import {getDateShort} from '../../Core/functions/date';
let fields = [
        {id: 'ExchangeId', type: 'select', description: 'Exchange donde se realizo el Trade', list: {url: '/api/Exchange/list'}},
        {id: 'CoinCompraId', type: 'select', description: 'Divisa a comprar', foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'precio_compra', typeDB: 'decimal(65,16)', type: 'moneda', description: 'Valor de divisa a comprar en USD', def: '0'},
        {id: 'CoinVentaId', type: 'select', description: 'Divisa a vender',  foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'precio_venta', typeDB: 'decimal(65,16)', type: 'moneda', description: 'Valor de divisa a vender en USD', def: '0'},
        {id: 'cantidad_venta', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de divisa que entregara', def: '0'},
        {id: 'cantidad_compra', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad que comprara', def:'0', disabled:true},
        {id: 'fecha', type:'date', description: 'Fecha del trade', def: ()=>{let now = new Date(); now = getDateShort(now); return now}},
];
let fields_display=[
    {col: 'trade', wid:'1/6'},
    {col: 'name', wid:'1/6'},
    {col: 'symbol', wid:'1/6'},
    {col: 'precio', wid:'1/6'},
    {col: 'cantidad', wid:'1/6'},
    {col: 'fecha', wid:'1/6'}
    
];
export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields});
    let list_state = useState([]);
    async function refresh_list(){
        let api_list = await fetch(`/api/Trade/list`);
        if(api_list.status!=200) throw respuesta;
        let list = (await api_list.json()).data;
        list_state[1](list);
    }
    useEffect(()=>{
        refresh_list();
    },[]);

    useEffect(()=>{
        let b_form_state={...form_state[0]};
        b_form_state.cantidad_compra = (parseFloat(b_form_state.cantidad_venta) * parseFloat(b_form_state.precio_venta)) / parseFloat(b_form_state.precio_compra ) || 0;
        form_state[1](b_form_state);
    },[form_state[0].precio_compra, form_state[0].cantidad_venta, form_state[0].precio_venta]);
    return(
        <div className="w-full">
            <GenericForm title="Trade" fields={fields} url_enviar='/api/Trade/insert' state_show_form={show_form} form_state={form_state}/>
            <GenericList title="Trade" state_show_form={show_form} state_list ={list_state} fields_display={fields_display} state_form={form_state} />
        </div>
    );
}
