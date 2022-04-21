const fs = require('fs');

let fn = {};
fn.existe_archivo = (path,retornar)=>{
    if(retornar==undefined) retornar = "si";
    return new Promise((success, fail) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    success(false);
                } else { // en caso de otro error
                    fail(err);
                }
            }
            if(retornar=="si"){
                // devolvemos el resultado de `isFile`.
                fs.readFile(path, 'utf-8', (err, data) => {
                    if(err) {
                        fail(err);
                    } else {
                        success({file: data, ruta: path});
                    }
                });
            }else{
                success(true);
            }
        });
    });
}
fn.crear_archivo = (ruta,data)=>{
    return new Promise((success,fail)=>{
        fs.appendFile(ruta, data, (err) => {
            if (err) fail(err);
            success('Todo Ok');
        });
    });
}
module.exports = fn;