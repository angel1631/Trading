import {getDateShort} from '../Core/functions/date';
export default ({trades, state_show})=>{
    let orden = [
        "trade",["symbol",'coin'],"precio","cantidad","acumulado","invertido",["precio_promedio", "precio promedio"],
        ["margen_trade","margen"],["margen_trade_usd", "margen usd"],["margen_acumulado", "margen acumulado"], 
        ["margen_acumulado_usd", "margen acumulado usd"], ['fecha','fecha',getDateShort]
    ];
    return(
        <div className="mt-5 px-4">
            <div className="text-xl font-bold text-white bg-red-500 mt-2 w-8 h-8 rounded-full text-center relative float-right" onClick={()=>state_show[1](false)}>x</div>
            <table className={` w-full table-auto`}>
                <thead>
                {
                orden.map((item,index)=>{
                    if(Array.isArray(item)) return <th key={index}>{item[1].toUpperCase()}</th>;
                    else return <th key={index}>{item.toUpperCase()}</th>
                })
                }
                </thead>
                <tbody>
            {
                trades.map((trade,index)=>{
                    let bg_l = parseFloat(trade.margen_trade)<0 ? ' bg-red-400' : parseFloat(trade.margen_trade)==0 ? 'bg-blue-400': 'bg-green-400';
                    return (<tr className={bg_l}>{
                    orden.map((i_orden,index)=>{
                        if(Array.isArray(i_orden)){
                            let dato = trade[i_orden[0]];
                            if(i_orden[2]) {
                                dato = i_orden[2](dato);
                            }
                            return <td key={index}>{dato}</td>
                        } 
                        else return <td key={index}>{trade[i_orden]}</td>
                    })
                    }</tr>)
                })
            }
                </tbody>
            </table>
        </div>
    );
}