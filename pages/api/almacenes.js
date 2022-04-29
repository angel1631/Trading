import ORM from '../../config/sequelize';

export default async function handler(req,res){
    
    try{
        let orm = await ORM();
    
        let [resultado, metadata] = await orm.query(`
            SELECT t.id, c.symbol, c.name, td.precio, td.cantidad, tp.clave type_coin
            FROM Trade t
            JOIN TradeDetail td ON td.TradeId = t.id
            JOIN Coin c ON td.CoinId = c.id
            JOIN TypeCoin tp ON c.TypeCoinId = tp.id
            ORDER BY t.fecha, td.id ASC
        `);
        let almacenes = [];
        resultado.map((trade,index)=>{
            let almacen = almacenes.filter(i=>(trade.symbol==i.symbol))[0];
            if(!almacen){ 
                almacen = {
                    type_coin: trade.type_coin,
                    symbol: trade.symbol, 
                    name: trade.name,
                    acumulado: parseFloat(trade.cantidad),
                    invertido: parseFloat(trade.cantidad)*parseFloat(trade.precio),
                    valor:parseFloat(trade.precio),
                    margen:0, 
                    margen_USD:0};
                almacenes.push(almacen);
            }else{
                almacen.acumulado += parseFloat(trade.cantidad);
                if(parseFloat(trade.cantidad)<0){
                    let margen_trade = (Math.abs(parseFloat(trade.precio)*parseFloat(trade.cantidad))-Math.abs(parseFloat(trade.cantidad)*parseFloat(almacen.valor)))/almacen.invertido;
                    let margen_trade_usd = margen_trade*almacen.invertido;
                    almacen.margen += margen_trade;
                    almacen.margen_USD += margen_trade_usd;
                    almacen.invertido = almacen.acumulado*almacen.valor;
                }else{
                    almacen.invertido += parseFloat(trade.precio)*parseFloat(trade.cantidad);
                }
                almacen.valor = almacen.invertido/almacen.acumulado || 0;
            }
        });
        res.status(200).json({data: almacenes});
    }catch(error){
        console.log(error);
        res.status(409).json({error});
    }
    
}