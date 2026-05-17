import { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import { api } from "../services/api";
export default function Home() {
    const [data, setData]= useState<any[]>([])
   
    useEffect(()=>{
        getData()
    },[])
    const getData = async()=>{
        await api.get('/products').then((res:any)=>{
            console.log(res.data)
            setData(res.data.data)
        }).catch((error:any)=>{
            console.log(error)
        })

    }

    return (
        <>
            {/* Hero Section */}
            <header className="hero-section">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <span className="hero-subtitle">Diseño Excepcional</span>
                            <h1 className="hero-title">Espacios que Inspiran, Diseños que Perduran</h1>
                        </div>
                        <div className="col-lg-8 align-self-baseline mt-4">
                            <p className="text-white-50 mb-5 fs-5">
                                Descubre nuestra exclusiva colección de planos residenciales, visualizaciones 3D y maquetas a
                                escala para tus proyectos.
                            </p>
                            <a className="btn btn-custom" href="#productos">
                                Explorar Catálogo <i className="fa-solid fa-arrow-right ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section" id="servicios">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-box">
                                <i className="fa-solid fa-pen-ruler feature-icon"></i>
                                <h3 className="feature-title">Planos Detallados</h3>
                                <p className="feature-text">
                                    Diseños arquitectónicos completos con todas las especificaciones técnicas listas para
                                    ejecución de obra.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-box">
                                <i className="fa-solid fa-vr-cardboard feature-icon"></i>
                                <h3 className="feature-title">Renders Fotorrealistas</h3>
                                <p className="feature-text">
                                    Visualizaciones 3D de alta calidad para que puedas experimentar el espacio antes de
                                    construirlo.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-box">
                                <i className="fa-solid fa-cubes feature-icon"></i>
                                <h3 className="feature-title">Modelos a Escala</h3>
                                <p className="feature-text">
                                    Maquetas físicas artesanales construidas con precisión para presentaciones inmobiliarias de
                                    alto impacto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section" id="productos">
                <div className="container">
                    <h2 className="section-title">Colección Destacada</h2>

                    <div className="row g-5">
                        {/* Product 1 */}
                       {
                            data.map((item:any)=><ProductComponent item={item} key={item.id}  />)
                       }

                      
                    </div>

                    <div className="text-center mt-5 pt-4">
                        <a 
                            href="#" 
                            className="btn btn-outline-dark px-5 py-3 rounded-0 fw-medium" 
                            style={{ letterSpacing: '1px' }}
                        >
                            VER TODO EL CATÁLOGO
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}