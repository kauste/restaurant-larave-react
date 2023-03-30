import Contexts from "@/components/Contexts";
import FrontOrder from "@/components/frontOffice/order/FrontOrder";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect, useRef } from "react";

function FrontOrders(props) {
    //props
    const[orders, setOrders] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [asset, setAsset] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryChoices, setDeliveryChoices] = useState([]);
    //for modal
    const [changeContactOrder, setChangeContactOrder] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    // messages
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    //dom
    const [zoomDOM, setZoomDOM] = useState(null);
    const zoomContainer = useRef();
    // animate
    const backgroundZoomTiming = {
        duration: 300,
        iterations: 1,
        fill:'forwards',
        easing: 'ease'
      };
    const smallerBackground = () => {
        zoomDOM?.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming);
    }
    const normalBackground = () => {
        zoomDOM?.animate([{ transform:'scale(1)'}], backgroundZoomTiming);
    };
    //first render
    useEffect(() => {
        setZoomDOM(zoomContainer.current);
        setOrders(props.orders);
        setStatuses(props.statuses)
        setAsset(props.asset)
        setDeliveryChoices(props.deliveryChoices)
        setDeliveryPrice(props.deliveryPrice)
    }, [])

    useEffect(() => {
        setTimeout(()=> {
                setMessage(null)
            }, 20000)
    }, [message])

    return (
        <Contexts.FrontContext.Provider value={{message, setMessage, orders, setOrders, changeContactOrder, setChangeContactOrder, zoomDOM, statuses, asset, deliveryPrice, deliveryChoices, setModalInfo, smallerBackground, normalBackground, messages, setMessages}}>
            <Authenticated auth={props.auth} modalInfo={modalInfo} setModalInfo={setModalInfo}>
                <Head title="Orders" />
                <div className="py-12 order">
                    <div className="max-w-7xl mx-auto sm:px-0 ">
                        <div className="container" ref={zoomContainer}>
                            <div className="card-header">
                                <h2>Your Orders</h2>
                            </div>
                                <div className="all-orders">
                                {
                                    orders.map((order, index) => <FrontOrder key={index} order={order}></FrontOrder>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </Contexts.FrontContext.Provider>
    )
}
export default FrontOrders;