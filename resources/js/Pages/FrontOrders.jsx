import FrontOrder from "@/components/frontOffice/order/FrontOrder";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";

function FrontOrders(props) {
    const[orders, setOrders] = useState([]);
    const [changeContactOrder, setChangeContactOrder] = useState(null);
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        setOrders(props.orders);
        const forBgColor = document.querySelector('.authentificated-layout');
        forBgColor.style.background = 'rgb(236,202,88)';
        forBgColor.style.background = 'linear-gradient(204deg, rgba(86,67,14,1) 0%, rgba(236,202,88,1) 50%, rgba(86,67,14,1) 100%)';
    }, [])
    window.addEventListener('storage', () => {
        if(localStorage.getItem('message')){
            setMessage(localStorage.getItem('message'))
            localStorage.removeItem('message');
            setTimeout(()=> {
                setMessage(null)
            }, 20000)
        }
    })
    return (
        <Authenticated auth={props.auth} message={message} changeContactOrder={changeContactOrder} setChangeContactOrder={setChangeContactOrder} updateAdressUrl={props.updateAdressUrl}>
            <Head title="Restaurants" />
            <div className="py-12 order">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="card-header">
                            <h2>Your Orders</h2>
                        </div>
                        {
                            orders.map((order, index) => <FrontOrder key={index} order={order} setChangeContactOrder={setChangeContactOrder} statuses={props.statuses} asset={props.asset} deliveryPrice={props.deliveryPrice} deliveryChoices={props.deliveryChoices} getInvoiceUrl={props.getInvoiceUrl}></FrontOrder>)
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default FrontOrders;