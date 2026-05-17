import { Link, useNavigate, useParams } from "react-router-dom";
import product1 from "../assets/images/product_1.png";
import { useEffect,useState } from "react";
import { api } from "../services/api";

export default function Details() {
    const [data, setData]= useState({}) as any
    const [quantity, setQuantity]  =useState(5)
    const [subtotal, setSubtotal]  =useState(0)
    const navigate = useNavigate()

    const { slug } = useParams()


    useEffect(()=>{
        getData()
    },[])
    const getData = async()=>{
        await api.get('/products/'+slug).then((res:any)=>{
            console.log(res.data)
            var calc =  parseFloat(res.data.data.price) * 1
            setSubtotal(calc)
            setData(res.data.data)
        }).catch((error:any)=>{
            console.log(error)
        })

    }
    const updateQuantity = (_quantity: any)=>{
        var calc = data.price * _quantity
        setSubtotal(calc)
        setQuantity(_quantity)
    }
    const addCart = ()=>{
        var array_cart = []
        const cartStr = localStorage.getItem("acme_cart")
        if(cartStr){
            array_cart = JSON.parse(cartStr)
        }
        array_cart.push({
            id:data.id,
            name:data.name,
            price:data.price,
            quantity:quantity,
            image:data.image,
            stock:data.stock
        })
        localStorage.setItem("acme_cart",JSON.stringify(array_cart))
        navigate("/carrito")


    }
   
    const url_assets = import.meta.env.VITE_API_ASSETS
    return (
        <div className="bg-light pt-5 pb-5 mt-5">
            
            <div className="container mt-5">
                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/#productos" className="text-decoration-none text-muted">Catálogo</Link></li>
                        <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">Residencia Minimalista</li>
                    </ol>
                </nav>

                <div className="row g-5">
                    {/* Product Image */}
                    <div className="col-lg-7">
                        <div className="bg-white p-2 shadow-sm">
                            <img src={`${url_assets}/images/${data.image}`} alt="Residencia Minimalista" className="img-fluid w-100" />
                        </div>
                        <div className="row g-2 mt-2">
                            <div className="col-3">
                                <img src={product1} alt="Thumb 1" className="img-fluid border border-2 border-accent" />
                            </div>
                            {/* In a real app, these would be different gallery images */}
                            <div className="col-3 opacity-50">
                                <img src={product1} alt="Thumb 2" className="img-fluid border" />
                            </div>
                            <div className="col-3 opacity-50">
                                <img src={product1} alt="Thumb 3" className="img-fluid border" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-5">
                        <div className="ps-lg-4">
                            <span className="product-category mb-2 d-block">Planos Ejecutivos</span>
                            <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{data.name}</h1>
                            <div className="h3 fw-light text-accent mb-4">${data.price} USD</div>
                            <div className="h5 fw-light text-accent mb-4">SUBTOTAL: ${subtotal} USD</div>
                            
                            <p className="text-muted mb-5 leading-relaxed">
                                {data.description}
                            </p>

                            <div className="d-flex align-items-center mb-5">
                                <div className="input-group me-3" style={{ width: "130px" }}>
                                    <button className="btn btn-outline-secondary rounded-0" type="button" 
                                        onClick={()=>{
                                            if(quantity >1){
                                                updateQuantity(quantity-1)
                                            }
                                        }}>-</button>
                                    <input type="text" className="form-control text-center border-secondary border-start-0 border-end-0 w-12" 
                                        value={quantity} onChange={(evt:any)=>{updateQuantity(evt.target.value)}} readOnly />
                                    <button className="btn btn-outline-secondary rounded-0" type="button" 
                                         onClick={()=>{
                                            if(quantity <= data.stock){
                                                updateQuantity(quantity+1)
                                            }
                                        }}
                                    >+</button>
                                </div>
                                <button className="btn btn-custom w-100 py-3" onClick={addCart}>
                                    <i className="fa-solid fa-bag-shopping me-2"></i> Añadir al Carrito
                                </button>
                            </div>

                            <hr className="my-5 opacity-10" />

                            <div className="specs mt-4">
                                <h5 className="fw-bold mb-3">Especificaciones Técnicas</h5>
                                <ul className="list-unstyled text-muted">
                                    <li className="mb-2"><i className="fa-solid fa-check text-accent me-2"></i> Área: 245 m² construidos</li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-accent me-2"></i> Formatos: PDF, DWG (AutoCAD), Revit</li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-accent me-2"></i> Niveles: 2 Plantas</li>
                                    <li className="mb-2"><i className="fa-solid fa-check text-accent me-2"></i> Habitaciones: 3 Dormitorios + Estudio</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Info Tabs */}
                <div className="row mt-5 pt-5">
                    <div className="col-12">
                        <ul className="nav nav-tabs border-bottom-0 mb-4" id="productTabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active border-0 bg-transparent fw-bold text-dark px-4 py-3" style={{ borderBottom: "2px solid var(--accent-color) !important" }}>Descripción Detallada</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link border-0 bg-transparent text-muted px-4 py-3">Licencia de Uso</button>
                            </li>
                        </ul>
                        <div className="bg-white p-5 shadow-sm">
                            <p>El diseño de la **Residencia Minimalista** busca la pureza formal a través de la eliminación de elementos superfluos. El programa arquitectónico se desarrolla en torno a un patio central que funciona como pulmón verde y regulador térmico. La planta baja alberga las áreas sociales en un concepto de "open plan" que fluye hacia la terraza, mientras que la planta alta se reserva para el área privada, garantizando la intimidad de los habitantes.</p>
                            <p className="mb-0">Todos nuestros planos cumplen con estándares internacionales de representación técnica, facilitando su interpretación por parte de constructores y autoridades locales.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
