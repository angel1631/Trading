
import {useEffect, useState} from 'react';
export default ()=>{
    let almacenes = useState([]);
    useEffect(async()=>{
        const url = '/api/almacenes';
        let res_api = await fetch(`${url}`);
        res_api = await res_api.json();
        almacenes[1](res_api);
    },[])
    return (
        <div className='w-full contenedor_almacen'>
            {almacenes[0].map((item)=>{
                return(
                    <div className=' w-1/3'>
                        <div className=' text-center text-4xl'>item.symbol</div>
                        <div className=''>{item.total}</div>
                        <div className=''>Promedio Compra $ {item.valor}</div>
                    </div>
                )
            })}
        </div>
            
            );
}