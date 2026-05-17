import { useEffect, useState } from "react"

interface  Props{
    item:any,
    onUpdateQuantity:(item:any,quantity:any)=>void,
    onDeleteItem:(item:any)=>void
}
export default function CartItemComponent({item, onUpdateQuantity,onDeleteItem}:Props){
    const url_assets = import.meta.env.VITE_API_ASSETS
    const [quantity, setQuantity]  =useState(1)
    const [subtotal, setSubtotal]  =useState(0)
    
    useEffect(()=>{
        setQuantity(item.quantity)
        setSubtotal(item.price * item.quantity)
    },[])
    const updateQuantity = (_quantity: any)=>{
        var calc = item.price * _quantity
        setSubtotal(calc)
        setQuantity(_quantity)
        onUpdateQuantity(item,_quantity)

    }
    
    return( <tr className="border-bottom">
            <td className="px-4 py-4">
                <div className="d-flex align-items-center">
                    <img src={`${url_assets}/images/${item.image}`} alt="Product" className="img-fluid rounded-0 me-3" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                    <div>
                        <h6 className="mb-1 fw-bold">Residencia Minimalista</h6>
                        <span className="text-muted small">{item.name}</span>
                        <div className="mt-2">
                            <button className="btn btn-link text-danger p-0 small text-decoration-none" 
                            onClick={()=>{onDeleteItem(item)}}
                            ><i className="fa-regular fa-trash-can me-1"></i> Eliminar</button>
                        </div>
                    </div>
                </div>
            </td>
            <td className="py-4">
                <div className="input-group input-group-sm mx-auto" style={{ width: "100px" }}>
                    <button className="btn btn-outline-secondary rounded-0" type="button" 
                    onClick={()=>{
                        if(quantity >1){
                            updateQuantity(quantity-1)
                        }
                    }}>-</button>
                    <input type="text" className="form-control text-center border-secondary border-start-0 border-end-0" readOnly 
                         value={quantity} onChange={(evt:any)=>{updateQuantity(evt.target.value)}} />
                    <button className="btn btn-outline-secondary rounded-0" type="button"  
                        onClick={()=>{
                        if(quantity <= item.stock){
                            updateQuantity(quantity+1)
                        }
                    }}>+</button>
                </div>
            </td>
            <td className="py-4 text-end px-4 fw-bold">${subtotal} USD</td>
        </tr>)
}