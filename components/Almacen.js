import { format_currency } from '../Core/functions/number';
export default ({almacen})=>{
    let {symbol,acumulado, invertido, valor, margen, margen_USD, name, price, future_USD, future_margin, future_result} = almacen;
    let bg_historico = margen>0 ? "bg-green-400" : margen==0 ? "bg-blue-400": "bg-red-400";
    let bg_futuro = future_margin>0 ? "bg-green-400" : future_margin==0 ? "bg-blue-400": "bg-red-400";
    return(
        <div className={`text-center py-2 px-4 shadow-xl rounded-lg `} >
            <div className='text-4xl py-4'>{name}</div>
            <div className=' px-3 py-2 '>
                <div className='bg-stone-200 py-2 rounded-md'>
                    <div className='py-2 font-bold'> {symbol.toUpperCase()} {acumulado}</div>
                    <div className='grid grid-cols-2'>
                        <div>He invertido:</div><div> {format_currency({val:(invertido).toFixed(2)})}</div>
                        <div>Precio actual:</div><div> {format_currency({val:(price).toFixed(2)})}</div>    
                    </div>    
                </div>
                <div className='text-left pl-2 font-bold mt-2'>Actual</div>
                <div className={`${bg_historico} py-2 rounded-md grid grid-cols-2`}>
                    <div>Valor</div><div>$. {format_currency({val:(valor).toFixed(2)})}</div>
                    <div>Margen</div><div>{(margen*100).toFixed(2)}%</div>
                    <div>Resultado</div><div> $. {(margen_USD).toFixed(2)}</div>
                </div>
                <div className='text-left pl-2 font-bold mt-2'>Si liquido</div>
                <div className={`${bg_futuro} py-2 rounded-sm grid grid-cols-2`}>
                    <div>magen:</div><div> {(future_margin*100).toFixed(2)}%</div>
                    <div>recibiria:</div><div> {format_currency({val:(future_USD).toFixed(2)})}</div>
                    <div>Resultado: </div><div>$ {format_currency({val:(future_result).toFixed(2)})}</div>
                </div>
            </div>
            
            
        </div>
    )
}