
export default {
    name: 'Coin',
    title_form: 'Cripto Moneda',
    fields: [
        {id: 'name', type: 'text', description: 'Nombre de la moneda', unique: true},
        {id: 'symbol', type: 'text', description: 'Simbolo de la moneda', unique: true},
        {id: 'TypeCoinId', type:'select', description: 'Tipo de moneda', foreign_scheme: 'TypeCoin', list: {type: 'internal-url', url:'/api/TypeCoin/list'}}
    ],
    fields_display:[
        {col: 'name', wid:'1/4'},
        {col: 'symbol', wid: '1/4'},
        {col:'TypeCoin.name', wid:'1/4'}
    ]
}