import { Link } from "react-router-dom"
interface  Props{
    item:any
}
export default function ProductComponent({item}:Props){
    const url_assets = import.meta.env.VITE_API_ASSETS

    
    return ( <div className="col-lg-4 col-md-6">
        <div className="product-card">
            <div className="product-img-wrapper">
                <Link to="/detalles">
                    <img src={`${url_assets}/images/${item.image}`} alt={item.name} className="product-img" />
                </Link>
                <div className="product-overlay">
                    <button className="btn-quick-add">
                        <i className="fa-solid fa-cart-plus me-2"></i> Añadir
                    </button>
                </div>
            </div>
            <div className="product-body">
                <span className="product-category">Planos</span>
                <Link to={"/detalles/"+item.slug} className="text-decoration-none">
                    <h3 className="product-title">{item.name}</h3>
                </Link>
                <div className="product-price">${item.price} USD</div>
            </div>
        </div>
    </div>)
}