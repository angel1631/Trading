import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    let orm = await ORM();
    let {Trade, TradeDetail} = orm.models;
    let transaction = await orm.transaction();
    try{
        let {ExchangeId,
            CoinCompraId, 
            precio_compra, 
            cantidad_compra, 
            CoinVentaId,
            precio_venta,
            cantidad_venta,
            fecha} = await JSON.parse(req.body);
        let calculo_cantidad_compra = ((parseFloat(precio_venta)*parseFloat(cantidad_venta))/precio_compra);
        if(calculo_cantidad_compra !=cantidad_compra) throw `la cantidad de compra con la de venta no cuadran, debe de ser ${calculo_cantidad_compra}`;
        let trade = await Trade.create({ExchangeId,fecha},{transaction});
        if(!trade.id) throw "Error 1: Error al crear el Trade";
        let compra = await TradeDetail.create({TradeId: trade.id, CoinId: CoinCompraId, precio: precio_compra, cantidad: cantidad_compra}, { transaction });
        if(!compra.id) throw "Error 2: Error al agregar compra del trade";
        let venta = await TradeDetail.create({TradeId: trade.id, CoinId: CoinVentaId, precio: precio_venta, cantidad: (parseFloat(cantidad_venta)*-1)}, {transaction});
        if(!venta.id) throw "Error 3: Error al agregar compra del trade";
        await transaction.commit();
        res.status(200).json({data: 'Todo Ok'});    
    }catch(error){
        await transaction.rollback();
        let mensaje = error.message;
        res.status(409).json({error:{message:mensaje}});
    }
    
}