import FrontOrder from "@/components/frontOffice/order/FrontOrder";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect, useRef } from "react";

function FrontOrders(props) {
    const[orders, setOrders] = useState([]);
    const [changeContactOrder, setChangeContactOrder] = useState(null);
    const [message, setMessage] = useState(null);
    const zoomContainer = useRef();
    const [zoomDOM, setZoomDOM] = useState(null);

    useEffect(() => {
        setOrders(props.orders);
        setZoomDOM(zoomContainer.current);
        const forBgColor = document.querySelector('.authentificated-layout');
        forBgColor.style.background = 'rgb(236,202,88)';
        forBgColor.style.background = 'linear-gradient(204deg, rgba(86,67,14,1) 0%, rgba(236,202,88,1) 50%, rgba(86,67,14,1) 100%)';
    }, [])
    // window.addEventListener('storage', () => {
    //     if(localStorage.getItem('message')){
    //         setMessage(localStorage.getItem('message'))
    //         localStorage.removeItem('message');
    //         setTimeout(()=> {
    //             setMessage(null)
    //         }, 20000)
    //     }
    // })
    useEffect(() => {
        setTimeout(()=> {
                setMessage(null)
            }, 20000)
    }, [message])
    return (
        <Authenticated auth={props.auth} message={message} changeContactOrder={changeContactOrder} setChangeContactOrder={setChangeContactOrder}>
            <Head title="Orders" />
            <div className="py-12 order">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container" ref={zoomContainer}>
                        <div className="card-header">
                            <h2>Your Orders</h2>
                        </div>
                            <div className="all-orders">
                            {
                                orders.map((order, index) => <FrontOrder key={index} order={order} zoomDOM={zoomDOM} setChangeContactOrder={setChangeContactOrder} statuses={props.statuses} asset={props.asset} deliveryPrice={props.deliveryPrice} deliveryChoices={props.deliveryChoices} setMessage={setMessage}></FrontOrder>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default FrontOrders;