import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    
    let orm = await ORM();
    
    let types = await orm.models.Trade.findAll();
    res.status(200).json({data: types});
}