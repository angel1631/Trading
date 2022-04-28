import { Sequelize, Model, DataTypes } from 'sequelize';

const orm = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});


export default async function start_orm(){
    let schemes = await cargar_schemes();
    schemes.map(cast_scheme_sequelize);
    schemes.map(relate_schemes);
    orm.sync({force:false});
    return orm;
}

async function cargar_schemes(){
    let schemes = [];
    schemes.push((await import("../modulos/trading/schemes/Coin")).default);
    schemes.push((await import("../modulos/trading/schemes/TypeCoin")).default);
    schemes.push((await import("../modulos/trading/schemes/Trade")).default);
    schemes.push((await import("../modulos/trading/schemes/TradeDetail")).default);
    schemes.push((await import("../modulos/trading/schemes/Exchange")).default);
    return schemes;
}


function cast_scheme_sequelize({name, fields}){
    if(!name) throw "El scheme no es compatible necesita tener campo name.";
    if(!fields) throw "El scheme no es compatible necesita tener campo fields";
    let fields_sequelize = {};
    fields.map((field)=>{
        if(field.type!='select')
            fields_sequelize[field.id] = {  type: field.typeDB || types_sequelize[field.type], 
                                            allowNull: field.allowNull || false,
                                            unique: field.unique || false};
    });
    orm.define(name,fields_sequelize,{freezeTableName: true});
}

function relate_schemes({name, fields}){
    fields.map(field=>{
        if(field.type=='select'){
            if(!field.foreign_scheme) throw `El campo ${field.id}, es de tipo select y necesita el campo foreign_scheme`;
            let options = {foreignKey: {allowNull: field.allowNull || false, name: field.id}};
            orm.models[name].belongsTo(orm.models[field.foreign_scheme],options);
        }
    });
}
let types_sequelize = {
    text: DataTypes.STRING,
    number: DataTypes.INTEGER,
    decimal: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    moneda: DataTypes.DECIMAL(10,2)
}




/*
let sCoin = cast_scheme_sequelize(Coin);


function cast_scheme_sequelize({name, fields}){
    if(!name) throw "El scheme no es compatible necesita tener campo name.";
    if(!fields) throw "El scheme no es compatible necesita tener campo fields";
    let fields = {};
    scheme.fields.map((field)=>{
        fields[field] = {type: types_sequelize[field.type]};
    });
    console.log("--------ejecuto");
    return orm.define(scheme.name,fields);
}

cargar_schemes();



async function cargar_schemes(){
    let sfs = "fs";
    const fs = await import(`fs`);
    
    console.log("mostrame");
    let path_modulos = path.join(__dirname, '..', '..', '..', '..', 'modulos');
    let modulos = [];
    fs.readdirSync(path_modulos)
    .filter(function(file) {
        return (file.indexOf(".") < 0);
      }).map(async (value, index)=>{
        let path_schemes = path.join(path_modulos,value,"schemes");
        try{
            fs.readdirSync(path_schemes).map((name_scheme)=>{
                let path_scheme = path.join(path_schemes,name_scheme);
                //let scheme = require(path_scheme);
                if(true)
                modulos.push(path_scheme);
            });
        }catch(error){
            //console.log("...........error",error);
            //console.log("Error con: ",error);
        }   
    });
    let u = 'C:\\proyectos\\proyectos_cripto\\Trading\\modulos\\trading\\schemes\\Coin.js';
    const Coin = await dynamic(()=>import(u).then((mod)=>console.log(mod.default)));
    console.log("..............coin",Coin);
    //console.log("..........ms", ms);
    //let s = require(modulos[0]);

    /*const cache = {};

    function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
    }

    importAll(require.context('C:\\proyectos\\proyectos_cripto\\Trading\\modulos\\trading\\schemes\\', false, /\.js$/));
    console.log("........cahce", cache);
    console.log("---------path_pruebas", modulos);
     /*
      .map(async function(file) {
        let path_schemes = path.join(path_modulos,file,"schemes");
        let exist_file = await existe_archivo(path_schemes,false); 
        if(exist_file){
            modulos.push(path_schemes);
            
            console.log("----------file", file);
            fs.readdirSync(path_schemes)
            .forEach((file_2 )=>{
                let pth_sch = path.join(path_schemes,file_2);
                console.log(".........path archivo", pth_sch);
               
                path_prueba = pth_sch;
               let scheme = require(pth_sch);
                if(scheme.name){
                    let fields = {};
                    scheme.fields.map((field)=>{
                        fields[field] = {type: types_sequelize[field.type]};
                    });
                    console.log("--------ejecuto");
                    orm.define(scheme.name,fields);
                }
            })
            orm.sync({alter:true});
            
        }
        
      });*/
      
//}

