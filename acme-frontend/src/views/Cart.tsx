import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import CartItemComponent from "../components/CartItemComponent";

export default function Cart() {
    const [data, setData]= useState<any[]>([])
    const [subtotal, setSubtotal] = useState(0)
    useEffect(()=>{
        const cartStr = localStorage.getItem("acme_cart")
        if(cartStr){
            var items = JSON.parse(cartStr)
            var calculo = 0
            items.map((item:any)=>{
                calculo+= ( parseFloat(item.price) * parseFloat(item.quantity) )
                
            })
            
            setSubtotal(calculo)
            setData(items)
        }
    },[])
    const onUpdateQuantity = (item: any, quantity: any)=>{
        var calculo = 0
        
        const data_copy = data.map((_item:any)=>{
            if(_item.id == item.id){
                return {
                    ..._item,
                    quantity:quantity
                }
            }
            return _item
        })

        data_copy.map((_item:any)=>{
            calculo+= ( parseFloat(_item.price) * parseFloat(_item.quantity) )
            
        })
        setSubtotal(calculo)
        setData(data_copy)
        localStorage.setItem("acme_cart",JSON.stringify(data_copy))
    }
    const onDeleteItem = (item:any)=>{
        var calculo = 0
        console.log(item)
        //const index = data.findIndex((_item:any)=>_item.id === item.id)
     
        //const data_copy  = data.splice(index,1)
        const data_copy= data.filter((_item:any) => _item.id !== item.id)
        console.log(data_copy)
        data_copy.map((_item:any)=>{
            calculo+= ( parseFloat(_item.price) * parseFloat(_item.quantity) )
            
        })
        setSubtotal(calculo)
        setData(data_copy)
        localStorage.setItem("acme_cart",JSON.stringify(data_copy))
    }
    return (
        <div className="bg-light pt-5 pb-5 mt-5 min-vh-100">
            <div className="container mt-5">
                <h1 className="display-6 fw-bold mb-5 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Tu Carrito de Compra</h1>

                <div className="row g-4">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-0">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="bg-white border-bottom">
                                            <tr>
                                                <th className="px-4 py-3 border-0 text-uppercase small tracking-wider fw-bold">Producto</th>
                                                <th className="py-3 border-0 text-uppercase small tracking-wider fw-bold text-center">Cantidad</th>
                                                <th className="py-3 border-0 text-uppercase small tracking-wider fw-bold text-end px-4">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item:any)=> <CartItemComponent item={item} key={item.id} 
                                                    onUpdateQuantity={onUpdateQuantity}  
                                                    onDeleteItem={onDeleteItem}
                                                /> )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link to="/" className="btn btn-outline-dark rounded-0 px-4 py-2">
                                <i className="fa-solid fa-arrow-left me-2"></i> Seguir Comprando
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-0 bg-white">
                            <div className="card-body p-4">
                                <h4 className="fw-bold mb-4">Resumen</h4>
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)} USD</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>IVA (16%)</span>
                                    <span>${ (subtotal * 0.16).toFixed(2)} USD</span>
                                </div>
                                <hr className="my-4 opacity-10" />
                                <div className="d-flex justify-content-between mb-5 h4 fw-bold">
                                    <span>Total</span>
                                    <span className="text-accent">${ (subtotal * 1.16).toFixed(2)} USD</span>
                                </div>
                                
                                <Link to="/checkout" className="btn btn-custom w-100 py-3 rounded-0 fw-bold letter-spacing-1">
                                    FINALIZAR COMPRA <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Link>
                                
                                <div className="mt-4 text-center text-muted small">
                                    <i className="fa-solid fa-lock me-2"></i> Pago 100% Seguro
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="card border-0 shadow-sm rounded-0 mt-4">
                            <div className="card-body p-4">
                                <div className="mb-3 fw-bold">¿Tienes un cupón?</div>
                                <div className="input-group">
                                    <input type="text" className="form-control rounded-0 border-secondary" placeholder="Código de descuento" />
                                    <button className="btn btn-outline-dark rounded-0" type="button">Aplicar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
