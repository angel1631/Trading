import ORM from '../../../../config/sequelize';

export default async function detalle(req,res){
    try{
        let orm = await ORM();
    
        let [resultado, metadata] = await orm.query(`
            SELECT t.id, c.symbol, c.name, td.precio, td.cantidad
            FROM Trade t
            JOIN TradeDetail td ON td.TradeId = t.id
            JOIN Coin c ON td.CoinId = c.id
            WHERE td.CoinId = '${req.query.CoinId}'
            ORDER BY t.fecha, td.id ASC
        `);
        let trades=[];
        resultado.map((trade,index)=>{
            let mov = {
                trade: trade.id,
                symbol: trade.symbol,
                precio: parseFloat(trade.precio),
                cantidad: parseFloat(trade.cantidad),
                margen_trade:0,
                margen_acumulado:0, 
                margen_trade_usd:0,
                margen_acumulado_usd:0
            }
            if(trades.length==0){
                mov = {...mov,
                    acumulado: parseFloat(trade.cantidad),
                    invertido: parseFloat(trade.cantidad)*parseFloat(trade.precio),
                    precio_promedio:parseFloat(trade.precio)
                };
            }else{
                let last_trade = trades[trades.length-1]; 
                mov.acumulado = last_trade.acumulado+parseFloat(trade.cantidad);
                if(parseFloat(trade.cantidad)<0){
                    mov.margen_trade = (Math.abs(parseFloat(trade.precio)*parseFloat(trade.cantidad))-Math.abs(parseFloat(trade.cantidad)*parseFloat(last_trade.precio_promedio)))/last_trade.invertido;
                    mov.margen_trade_usd = mov.margen_trade*last_trade.invertido;
                    mov.margen_acumulado = last_trade.margen_trade+mov.margen_trade;
                    mov.margen_acumulado_usd = last_trade.margen_trade_usd+mov.margen_trade_usd;
                    mov.invertido = mov.acumulado*last_trade.precio_promedio;
                }else{
                    mov.invertido = last_trade.invertido + (parseFloat(trade.precio)*parseFloat(trade.cantidad));
                }
                mov.precio_promedio = mov.invertido/mov.acumulado || 0;
            }
            trades.push(mov);
        });
        res.status(200).json({data: trades});
    }catch(error){
        console.log(error);
        res.status(409).json({error});
    }
}