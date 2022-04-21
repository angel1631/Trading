import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    
    let orm = await ORM();
    
    let types = await orm.models.Coin.findAll();
    res.status(200).json({data: types});
}