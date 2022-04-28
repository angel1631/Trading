import {getDateShort} from '../../../Core/functions/date';

export default {
    name: 'Trade',
    title_form: 'Trade',
    fields: [
        {id: 'fecha', type:'date', description: 'Fecha del trade', def: ()=>{let now = new Date(); now = getDateShort(now); return now}},
        {id: 'ExchangeId', type: 'select', description: 'Exchange', foreign_scheme: 'Exchange', list: {url: {url:'/api/Exchange/list'}}}
    ],
}