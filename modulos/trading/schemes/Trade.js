import {getDateShort} from '../../../Core/functions/date';

export default {
    name: 'Trade',
    title_form: 'Trade',
    fields: [
        {id: 'CoinCompraId', type: 'select', description: 'Divisa a comprar', foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'CoinEntregaId', type: 'select', description: 'Divisa con que paga',  foreign_scheme: 'Coin', list: {type: 'internal-url', url:'/api/Coin/list'}},
        {id: 'precio_compra', typeDB: 'decimal(65,16)', type: 'moneda', description: 'El precio en dolares de la divisa a comprar', def: '0'},
        {id: 'precio_entrega', typeDB: 'decimal(65,16)', type: 'moneda', description: 'Precio en dolares de la divisa que entregar', def: '0'},
        {id: 'cantidad_entrega', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de divisa que entregara', def: '0'},
        {id: 'cantidad_recibe', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de divisa que recibe', def:'0'},
        {id: 'fecha', type:'date', description: 'Fecha del trade', def: ()=>{let now = new Date(); now = getDateShort(now); return now}}
    ],
}