import { format_currency } from '../Core/functions/number';
export default ({almacen})=>{
    let {symbol,acumulado, invertido, valor, margen, margen_USD, name, price, future_USD, future_margin, future_result} = almacen;
    let bg_historico = margen>0 ? "bg-green-400" : margen==0 ? "bg-blue-400": "bg-red-400";
    let bg_futuro = future_margin>0 ? "bg-green-400" : future_margin==0 ? "bg-blue-400": "bg-red-400";
    return(
        <div className={`text-center pt-2 px-4 shadow-xl rounded-lg `} >
            <div className='text-4xl py-2'>{symbol.toUpperCase()}</div>
            <div className='bg-stone-200 px-3 pt-2'>
                <div className=''>Poseo: {acumulado}</div>
                <div>Se ha invertido: {format_currency({val:(invertido).toFixed(2)})}</div>
                <div>Precio actual: {format_currency({val:(price).toFixed(2)})}</div>
                <div className='text-left pl-2 font-bold mt-2'>Actual</div>
                <div className={`${bg_historico} py-2 rounded-md`}>
                    <div className="flex flex-row">
                        <div className="w-1/2">Valor</div><div className='w-1/2'>$. {format_currency({val:(valor).toFixed(2)})}</div>
                    </div>
                    <div className="flex flex-row">
                        <div className='w-1/2'>Margen</div><div className="w-1/2">{(margen*100).toFixed(2)}%</div>
                    </div>
                    <div className="flex flex-row">
                        <div className='w-1/2'>Resultado</div><div className="w-1/2"> $. {(margen_USD).toFixed(2)}</div>
                    </div>
                        
                </div>
                <div className='text-left pl-2 font-bold mt-2'>Si liquido</div>
                <div className={`${bg_futuro} py-2 rounded-sm`}>
                    <div>magen: {(future_margin*100).toFixed(2)}%</div>
                    <div>recibiria: {format_currency({val:(future_USD).toFixed(2)})}</div>
                    <div>Resultado: $ {format_currency({val:(future_result).toFixed(2)})}</div>
                </div>
            </div>
            
            
        </div>
    )
}