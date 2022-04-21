import React, { useEffect } from "react"
import { FaLine } from "react-icons/fa";
import { AutoComplete } from "./AutoComplete";
import { GenericField } from "./GenericField";

function GenericForm({title="Formulario", children, fields, url_enviar, function_send, state_show_form, form_state}){
    
    let [form,setForm] = form_state;
    useEffect(()=>{
        fields.map(async (field,index)=>{
            if(field.type=='select' && field.list.url){
                const url = field.list.url;
                let res_api = await fetch(`${url}`);
                res_api = await res_api.json()
                fields[index].list.options = res_api.data;
            }
        })
    },[]);
    let change_input = ({e, id, value})=>{
        let new_value = {...form};
        new_value[id] = value; 
        setForm(new_value);
    }
    async function send_form({e, url_enviar}){
        try{
            e.preventDefault();
            let new_item = {};
            fields.map((field)=>{
                if(!form[field.id] && field.required != false && field.type !='switch') throw `Error no se lleno el campo ${field.id}`;
                else {new_item[field.id] = form[field.id];}
                return true;
            });
            if(url_enviar){
                let response = await fetch(url_enviar, {
                    method: "POST",
                    body: JSON.stringify(new_item),
                });
                if(response.status==404 || response.status==500) throw "El api al que desea enviar el formulario no existe o no esta disponible";
                let respuesta_json = await response.json();
                if(response.status==200){
                    alert(respuesta_json.data);
                    clear_form();
                }else{
                    alert(`Error 1: ${respuesta_json.error.message}`);
                }  
            }else{
                function_send(new_item);
                clear_form();
            }
        }catch(error){
            alert(error);
            console.log("------------error", error);
        }
    }
    function clear_form(){
        let new_form = {};        
        fields.map((field)=>{
            new_form[field.id] = '';
            return true;
        });
        setForm(new_form);
        state_show_form[1](false);
    }
    
    return (
        <div className="w-full px-2 my-4">
            {!state_show_form[0] ? <div onClick={()=>{state_show_form[1](true)}}>Agregar {title}</div>:
            <form className=" px-2 bg-gray-200 rounded-lg shadow-lg divide-slate-400/25" onSubmit={(e)=>{send_form({e,url_enviar})}}>
                <div className="flex mb-4">
                    <div className="title_form justify-center w-full font-bold text-2xl py-2 ">{title}</div>
                    <div className="text-xl font-bold text-white bg-red-500 mt-2 w-8 h-8 rounded-full text-center relative float-left" onClick={()=>state_show_form[1](false)}>x</div>
                </div>
                {
                    fields.map(field=>(
                        <div className={(field.depende && form[field.depende]==false) && 'hidden' || 'form-line'} key={field.id}>
                            <GenericField field={field} state={form[field.id]} onChange={change_input} />
                            {field.autoComplete && <AutoComplete list={field.autoComplete} form_state={form_state} id={field.id}/>}
                        </div>
                    ))
                }
                {children}
                <button className="w-full my-4 bg-sky-400 py-2 rounded-lg shadow-lg font-bold" type="submit">Guardar</button>
            </form> 
            }
        </div>
    );
}

export {GenericForm}