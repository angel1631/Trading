import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    
    let orm = await ORM();
    
    let types = await orm.query(`
        SELECT c.name, c.symbol, SUM()
        FROM Trade t
        JOIN COIN c ON t.CoinCompraId = c.id
        GROUP BY c.id`);
    res.status(200).json({data: types});
}