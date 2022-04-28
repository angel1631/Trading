export default {
    name: 'TradeDetail',
    title_form: 'Detalle del Trade',
    fields: [
        {id: 'TradeId', type: 'select', description: 'Trade al que pertenece el movimiento', foreign_scheme: 'Trade'},
        {id: 'CoinId', type: 'select', description: 'Divisa', foreign_scheme: 'Coin', list: {url:'/api/Coin/list'}},
        {id: 'precio', typeDB: 'decimal(65,16)', type: 'moneda', description: 'El precio en dolares de la divisa a transaccionar', def: '0'},
        {id: 'cantidad', typeDB: 'decimal(65,16)', type: 'decimal', description: 'Cantidad de la transaccion', def: '0'}
        
    ],
}