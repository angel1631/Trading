import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {ContainerList} from './ContainerList';
import {ordenar_list} from '../functions/list';
import {FaEdit} from 'react-icons/fa';

function GenericList({title, lineOnClick, state_show_form, state_list = [], fields_display, children, order, state_form}){
    
    let [list,setList] = state_list;
    let delete_buy = (index)=>{
        let c_list = [...list];
        c_list.splice(index,1);
        setList(c_list);
    }
    let editar_item = (index)=>{
        let item = {...lista_ordenada[index]};
        state_form[1](item);
        state_show_form[1](true);
    }
    let lista_ordenada = useState([]);
    useEffect(()=>{
        if(list){
            lista_ordenada[1]([...list]);
            if(order){
                let {by, asc=true, type} = order;
                lista_ordenada[1](ordenar_list({list, by, asc, type}));
            }
        }
            
    },[list]);
    
    
    
    return(
        <ContainerList title={title} onClickAdd={()=>state_show_form[1](true)} >
            <div className='divide-y divide-stone-300 shadow-md flex flex-col mt-4'>
                {lista_ordenada[0].map((line,index)=>
                    (<div className='w-full flex bg-slate-50 py-1' key={index}>
                        <div className='w-10/12 py-1 flex' onClick={()=>{if(lineOnClick)lineOnClick({line,index})}}>
                            
                            {fields_display.map((field,index)=>{
                                if(field.col.indexOf('.')<0)
                                    return <span className={"px-2 w-"+field.wid} key={index}>{field.mask ? field.mask(line[field.col]) : line[field.col]}</span>
                                else{
                                    let new_col = field.col.split('.');
                                    let new_value = line;
                                    for(let y =0;y<new_col.length;y++){
                                        new_value = new_value[new_col[y]];
                                    }
                                    return <span className={"px-2 w-"+field.wid} key={index}>{field.mask ? field.mask(new_value) : new_value}</span>;
                                }
                            }
                            )}
                        </div>
                        <div className="w-1/12 px-1 ">
                            <FaEdit onClick={()=>{editar_item(index)}} className=" text-blue-400 text-xl" />
                        </div>
                        <div className="w-1/12 px-1 py-2" onClick={()=>{if(window.confirm("Esta seguro de eliminar el item")) delete_buy(index)}}>
                            <FaTrash className='text-red-400 ' />
                        </div>
                    </div>
                ))}
            </div>
            {children}
        </ContainerList>
    );
}
export {GenericList}
