import { useState, useEffect } from "react";
import {useStateForm} from "../../Core/hooks/useStateForm";
import { GenericForm } from "../../Core/components/GenericForm";
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
]
export default ()=>{
    let show_form = useState(false);
    let form_state = useStateForm({fields});
    useEffect(()=>{
        let b_form_state={...form_state[0]};
        b_form_state.cantidad_compra = (parseFloat(b_form_state.cantidad_venta) * parseFloat(b_form_state.precio_venta)) / parseFloat(b_form_state.precio_compra ) || 0;
        form_state[1](b_form_state);
    },[form_state[0].precio_compra, form_state[0].cantidad_venta, form_state[0].precio_venta]);
    return(
        <div className="w-full">
            <GenericForm title="Trade" fields={fields} url_enviar='/api/Trade/insert' state_show_form={show_form} form_state={form_state}/>
        </div>
    );
}
/*
export default ()=>{
    let state_fields = useState(fields);
    let show_form = useState(false);
    useEffect(()=>{
        state_fields[0].map(async (field,index)=>{
            if(field.type=='select' && field.list.url){
                console.log("**************ejecuto api");
                const url = field.list.url;
                let res_api = await fetch(`${url}`);
                res_api = await res_api.json();
                let b_fields = [...state_fields[0]];
                b_fields[index].list.options = res_api.data;
                state_fields[1](b_fields);
            }
        })
    },[]);
    let [form,setForm] = useStateForm({fields});
    
    function onChange({e,id,value}){
        let new_value = {...form};
        new_value[id] = value; 
        setForm(new_value);
        if(id=='CoinEntregaId'){
            let option = state_fields[0].filter(item=>(item.id=='CoinEntregaId'))[0].list.options.filter(item=>(item.id==value))[0];
            if(option.TypeCoin.name=='Estable'){
                set_fields_visible({all: false});
            }else{
                set_fields_visible({all: true});
            }
        }
    }
    
    
    function set_fields_visible({all}){
        console.log("visible");
        if(all){}
    }
    return(
        <div className="w-full">
            <form onSubmit={(e)=>{e.preventDefault();}}>
                {state_fields[0].map((field,index)=>(
                    <GenericField field={field} state={form[field.id]} onChange={onChange} />
                ))}
                
            </form>
            
        </div>
    );

    //<GenericForm title={Trade.title_form} fields={Trade.fields} url_enviar='/api/Trade/insert' state_show_form={show_form} form_state={form_state}/>
}*/