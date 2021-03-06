
import {useEffect, useState} from 'react';
import Almacen from './Almacen';
import {HiRefresh} from 'react-icons/hi';
import Detalle from './Detalle';
export default ()=>{
    let almacenes = useState([]);
    let recargar = useState(false);
    let loading = useState(false);
    let detalle_trades = useState([]);
    let state_show_detalle = useState(false);
    
    async function get_trades_almacen(CoinId){
        try{
            loading[1](true);
            let out = [];
            let api_trades_almacen = await fetch(`/api/almacenes/trades/${CoinId}`);
            if(api_trades_almacen.status!=200) throw api_trades_almacen;
            let trades_almacen = (await api_trades_almacen.json()).data;
            detalle_trades[1](trades_almacen);
            state_show_detalle[1](true);
            loading[1](false);
        }catch(error){
            console.log(error);
            loading[1](false);
        }
        
    }

    async function actualizar_almacenes(){
        try{
            if(!state_show_detalle[0]){
                loading[1](true);
                let out = [];
                let res_api_almacenes = await fetch(`/api/almacenes/list`);
                if(res_api_almacenes.status!=200) throw respuesta;
                let almacenes_api = (await res_api_almacenes.json()).data;
                for(let x = 0; x<almacenes_api.length;x++){
                    let almacen = almacenes_api[x];
                    if(almacen.type_coin=='otra'){
                        let price_api = await fetch(`https://api3.binance.com/api/v3/ticker/price?symbol=${(almacen.symbol).toUpperCase()}USDT`);
                        let price = (await price_api.json()).price;
                        almacen.price = parseFloat(price);
                        almacen.future_USD = almacen.acumulado*almacen.price;
                        almacen.future_margin = almacen.margen+((almacen.future_USD-almacen.invertido)/almacen.invertido);
                        almacen.future_result = (almacen.future_USD-parseFloat(almacen.invertido))+almacen.margen_USD
                    }else{
                        almacen.price = 1;
                        almacen.future_USD = 0;
                        almacen.future_margin = 0;
                        almacen.future_result = parseFloat(almacen.invertido)
                    }
                }
                almacenes_api.sort((a,b)=>{
                    if(a.type_coin<b.type_coin) return 1;
                    if(a.type_coin>b.type_coin) return -1;
                    return 0;
                });
                almacenes[1](almacenes_api);
                loading[1](false);
                return out;
            }
        }catch(error){
            console.log(error);
            loading[1](false);
            //alert("Error con la api");
        }
    }
    useEffect(()=>{
        actualizar_almacenes();
        setInterval(actualizar_almacenes, 60000);
    },[]);
    useEffect(()=>{
        if(recargar[0]){
            actualizar_almacenes();
            recargar[1](false);
        }
    },[recargar[0]]);
    console.log("---------state detalle", state_show_detalle[0]);
    return (
        
        <div>
            <div className='w-full flex flex-row-reverse align-' onClick={()=>{recargar[1](true)}}>
                <div className=' mt-2  mr-2 bg-green-400 text-gray-100 font-bold px-4 flex py-2 rounded-md cursor-pointer hover:bg-green-300'>
                    <div>Recargar </div>
                    <div className='ml-3 mt-1 text-lg'>< HiRefresh /></div> 
                </div>
            </div>
            {loading[0] ? 
                <img src={'/media/loading.gif'} />
                :
                state_show_detalle[0] ?
                    <div>
                        <Detalle trades={detalle_trades[0]} state_show={state_show_detalle}/>
                    </div>
                    :
                    <div className='w-full contenedor_almacen grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-6'>
                        {almacenes[0].map((item,index)=>{
                            return( <Almacen almacen = {item} key={index} onClick={get_trades_almacen}/>) 
                        })}
                    </div>    
            }
            
        </div>
            
    );
}