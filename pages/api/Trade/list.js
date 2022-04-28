import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    
    let orm = await ORM();
    let [resultado, metadata] = await orm.query(`
        SELECT t.id trade, c.symbol, c.name, td.precio, td.cantidad
        FROM TradeDetail td
        JOIN Coin c ON td.CoinId = c.id
        JOIN Trade t ON td.TradeId = t.id
        ORDER BY t.fecha,td.id ASC
    `);
    res.status(200).json({data: resultado});
}