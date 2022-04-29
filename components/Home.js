
import {useEffect, useState} from 'react';
import Almacen from './Almacen';
export default ()=>{
    let almacenes = useState([]);
    let recargar = useState(false);
    
    async function actualizar_almacenes(){
        try{
            let out = [];
            let res_api_almacenes = await fetch(`/api/almacenes`);
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
                
                if(a.type_coin>b.type_coin) return 1;
                if(a.type_coin<b.type_coin) return -1;
                return 0;
            });
            almacenes[1](almacenes_api);
            return out;
        }catch(error){
            console.log(error);
            //alert("Error con la api");
        }
        
    }
    useEffect(()=>{
        actualizar_almacenes();
    },[]);
    useEffect(()=>{
        if(recargar[0]){
            actualizar_almacenes();
            recargar[1](false);
        }
    },[recargar[0]])
    return (
        
        <div>
            <div onClick={()=>{recargar[1](true)}}>Recargar</div>
            <div className='w-full contenedor_almacen grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-6'>
            {almacenes[0].map((item,index)=>{
                return( <Almacen almacen = {item} key={index}/>) 
            })}
        </div>
        </div>
            
    );
}