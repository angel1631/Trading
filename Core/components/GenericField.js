function GenericField({field, state, onChange}){
    return(
        <div className="opcion w-full flex flex-col" style={field.invisible && {display: "none"}} >
            <label className="w-full pt-3 pb-1 pl-1">{field.description}</label>
            {field.type=='switch' ?
                <div className="form-check form-switch pl-1 py-2 flex ">
                    <input className="form-check-input appearance-none w-9 ml-2 rounded-full h-5 
                         align-top bg-gray-400 bg-no-repeat bg-contain text-zinc-800 focus:outline-none cursor-pointer shadow-sm" 
                        type="checkbox" checked={state} role="switch" onChange={(e)=>onChange({e, id:field.id, value: e.target.checked})}/>
                </div>
            :
                field.type=='select' ?
                <select className="p-2  rounded-lg shadow-md " value={state} onChange={(e)=>onChange({e, id:field.id, value: e.target.value})}>
                    <option value="none">Seleccione una opcion</option>
                    {field.list.options.map((el,index)=>(<option value={el.id} key={index}>{el.name}</option>))}
                </select>
                    
            :
                (field.type=='decimal' || field.type=='moneda') ?
                <input className="w-full rounded-lg shadow-md p-2 mb-2" placeholder={field.description} 
                    type="number" value={state} 
                    disabled={field.disabled}
                    onBlur={(e)=>{
                        if(field.onBlur)
                            field.onBlur(e);
                    }} 
                    onChange={(e)=>onChange({e, id:field.id, value:e.target.value})} />
                    
            :
                <input className="w-full rounded-lg shadow-md p-2 mb-2" placeholder={field.description} 
                    type={field.type} value={state} 
                    onBlur={(e)=>{
                        if(field.onBlur)
                            field.onBlur(e);
                    }} 
                    onChange={(e)=>onChange({e, id:field.id, value:e.target.value})} />
            }
        </div>
    );
}

export {GenericField};