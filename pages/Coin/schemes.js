
/*
    fields_movimiento.push({id: 'id', description: 'Id del movimiento', type:'number', required:false, invisible:true});
    fields_movimiento.push({id: 'fecha', description: 'Fecha de referencia', type:'date'})
    fields_movimiento.push({id: 'descripcion', description: 'Descripcion del movimiento', type:'text'});
    fields_movimiento.push({id: 'monto', description: 'Monto del movimiento', type:'number'});
    fields_movimiento.push({id: 'ingreso', description: 'Es un ingreso', type:'switch'});
    fields_movimiento.push({id: 'periodico', description: 'Desea repetir este movimiento varias veces', type: 'switch'});
    fields_movimiento.push({id: 'repeticiones', description: 'Cuantas veces desea repetir el movimiento:', type:'number', required: false, depende: 'periodico'});
    fields_movimiento.push({id: 'cambiar_frecuencia', description: 'Desea cambiar el día que se repetira el movimiento?', type: 'switch', required: false, depende: 'periodico'});
    fields_movimiento.push({id: 'frecuencia', description: 'Cada cuantos días desea repetir el movimiento:', type:'number', required: false, depende: 'cambiar_frecuencia'});
*/