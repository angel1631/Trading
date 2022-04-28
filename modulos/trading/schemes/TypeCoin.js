export default {
    name: 'TypeCoin',
    title_form: 'Tipo de moneda',
    fields: [
        {id: 'name', type: 'text', description: 'Tipo de moneda', unique: true},
        {id: 'clave', type: 'text', description: 'Clave interna', unique: true}
    ]
}