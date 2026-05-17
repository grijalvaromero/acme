import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { apiAuth } from "../services/api";

export default function Checkout() {
    const [data, setData] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [paypalConfig, setPaypalConfig] = useState<{ clientId: string; currency: string } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const url_assets = import.meta.env.VITE_API_ASSETS;
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/");
    };

    useEffect(() => {
        const cartStr = localStorage.getItem("acme_cart");
        if (cartStr) {
            const items = JSON.parse(cartStr);
            let calculo = 0;
            items.forEach((item: any) => {
                calculo += (parseFloat(item.price) * parseFloat(item.quantity));
            });
            setSubtotal(calculo);
            setData(items);

            const total = (calculo * 1.16).toFixed(2);
            apiAuth.get(`/payment/${total}`)
                .then(response => {
                    setPaypalConfig({
                        clientId: response.data.client_id,
                        currency: response.data.currency || "MXN"
                    });
                })
                .catch(error => {
                    console.error("Error al obtener la configuración de PayPal:", error);
                });
        }
    }, []);

    const handleCreateOrder = async () => {
        try {
            const total = (subtotal * 1.16).toFixed(2);
            const response = await apiAuth.post("/paypal/create-order", {
                amount: total
            });
            const orderData = response.data;
            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail ?
                    `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` :
                    JSON.stringify(orderData);
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error al crear la orden: ${error.message || error}`);
            throw error;
        }
    };

    const handleApprove = async (data: any, actions: any) => {
        try {
            const response = await apiAuth.post("/paypal/capture-order", {
                orderID: data.orderID
            });
            const orderData = response.data;
            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (orderData.status === 'COMPLETED') {
                localStorage.removeItem("acme_cart");
                setData([]);
                setSubtotal(0);
                setShowModal(true);
            } else {
                throw new Error('El pago no pudo ser completado');
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error al capturar el pago: ${error.message || error}`);
        }
    };
    return (
        <div className="bg-light pt-5 pb-5 mt-5 min-vh-100">
            <div className="container mt-5">
                <h1 className="display-6 fw-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Finalizar Pedido</h1>

                <div className="row g-5">
                    {/* Checkout Form */}
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm rounded-0 bg-white mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4 border-bottom pb-3">Información de Contacto</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted text-uppercase fw-bold">Nombre</label>
                                        <input type="text" className="form-control rounded-0 border-light bg-light" placeholder="Juan" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted text-uppercase fw-bold">Apellido</label>
                                        <input type="text" className="form-control rounded-0 border-light bg-light" placeholder="Pérez" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small text-muted text-uppercase fw-bold">Correo Electrónico</label>
                                        <input type="email" className="form-control rounded-0 border-light bg-light" placeholder="juan.perez@ejemplo.com" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small text-muted text-uppercase fw-bold">Teléfono</label>
                                        <input type="tel" className="form-control rounded-0 border-light bg-light" placeholder="+52 (55) 1234-5678" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method - Only PayPal */}
                        <div className="card border-0 shadow-sm rounded-0 bg-white">
                            <div className="card-body p-4 text-center py-5">
                                <h5 className="fw-bold mb-4 text-start border-bottom pb-3">Método de Pago</h5>
                                <div className="py-4">
                                    <div className="mb-4">
                                        <i className="fa-brands fa-paypal text-primary display-1"></i>
                                    </div>
                                    <h4 className="fw-bold mb-2">Pagar con PayPal</h4>
                                    <p className="text-muted px-lg-5 mb-4">
                                        Puedes pagar de forma segura con tu saldo de PayPal, tarjeta de crédito o débito.
                                    </p>
                                    
                                    <div className="mt-4 d-flex justify-content-center">
                                        <div style={{ width: "100%", maxWidth: "400px" }}>
                                            {paypalConfig ? (
                                                <PayPalScriptProvider options={{ clientId: paypalConfig.clientId, currency: paypalConfig.currency }}>
                                                    <PayPalButtons
                                                        style={{ layout: "vertical", shape: "pill" }}
                                                        createOrder={handleCreateOrder}
                                                        onApprove={handleApprove}
                                                        onError={(err) => {
                                                            console.error("PayPal Error:", err);
                                                            alert("Error al procesar el pago con PayPal");
                                                        }}
                                                        onCancel={() => {
                                                            alert("Pago cancelado por el usuario");
                                                        }}
                                                    />
                                                </PayPalScriptProvider>
                                            ) : (
                                                data.length > 0 ? (
                                                    <div className="d-flex flex-column align-items-center py-3">
                                                        <div className="spinner-border text-primary mb-2" role="status">
                                                            <span className="visually-hidden">Cargando PayPal...</span>
                                                        </div>
                                                        <span className="text-muted small">Cargando botones de PayPal...</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-danger small fw-bold">
                                                        <i className="fa-solid fa-triangle-exclamation me-1"></i> Agrega productos al carrito para proceder con el pago
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-sm rounded-0 bg-white sticky-top" style={{ top: "120px" }}>
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">Resumen del Pedido</h5>
                                
                                <div className="order-items mb-4">
                                    {data.length > 0 ? (
                                        data.map((item: any) => (
                                            <div className="d-flex align-items-center mb-3" key={item.id}>
                                                <div className="position-relative">
                                                    <img 
                                                        src={`${url_assets}/images/${item.image}`} 
                                                        alt={item.name} 
                                                        className="img-fluid rounded border" 
                                                        style={{ width: "64px", height: "64px", objectFit: "cover" }} 
                                                    />
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 fw-bold small">{item.name}</h6>
                                                    <span className="text-muted extra-small">Producto Digital</span>
                                                </div>
                                                <div className="text-end fw-bold small">
                                                    ${(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)} USD
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-muted small text-center py-3">
                                            Tu carrito está vacío.
                                        </div>
                                    )}
                                </div>

                                <hr className="my-4 opacity-10" />

                                <div className="d-flex justify-content-between mb-2 text-muted small">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)} USD</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2 text-muted small">
                                    <span>Impuestos (Estimado)</span>
                                    <span>${(subtotal * 0.16).toFixed(2)} USD</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 text-muted small">
                                    <span>Envío (Digital)</span>
                                    <span className="text-success">Gratis</span>
                                </div>

                                <div className="d-flex justify-content-between h4 fw-bold pt-3 border-top">
                                    <span>Total</span>
                                    <span className="text-accent">${(subtotal * 1.16).toFixed(2)} USD</span>
                                </div>

                                <div className="mt-4 p-3 bg-light text-muted extra-small">
                                    <i className="fa-solid fa-circle-info me-2 text-accent"></i>
                                    Tus archivos digitales estarán disponibles para descarga inmediata tras la confirmación del pago.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Pago Exitoso */}
            {showModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-0 border-0 shadow">
                            <div className="modal-header border-0 pb-0 justify-content-end">
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body text-center py-4">
                                <div className="mb-3 text-success">
                                    <i className="fa-solid fa-circle-check display-3"></i>
                                </div>
                                <h4 className="fw-bold mb-2">¡Pago Completado con Éxito!</h4>
                                <p className="text-muted small px-3">
                                    Tu transacción ha sido procesada de manera segura. Tus archivos digitales de diseño y planos estarán disponibles para descarga en tu panel.
                                </p>
                            </div>
                            <div className="modal-footer border-0 pt-0 justify-content-center">
                                <button type="button" className="btn btn-dark rounded-0 px-4 py-2" onClick={handleCloseModal}>
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .extra-small { font-size: 0.75rem; }
                .letter-spacing-1 { letter-spacing: 1px; }
                .text-accent { color: var(--accent-color); }
            `}} />
        </div>
    );
}
