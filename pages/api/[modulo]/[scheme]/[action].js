//import ORM from '../../../config/sequelize';

export default async function handler(req,res){
    
    
    console.log("--------------------req,",req.query);
    let actions = {};
    actions.form = ()=>{
        
    }
    // try{
    //     let orm = await ORM();
    //     let body = JSON.parse(req.body)
    //     await orm.models.Coin.create(body);
    //     res.status(200).json({data: 'Todo Ok'});    
    // }catch(error){
    //     let mensaje = error.message;
    //     res.status(409).json({error:{message:mensaje}});
    // }
    res.status(200).json({ok: 'ok'});
    
}