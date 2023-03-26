import Authenticated from "@/Layouts/Authenticated";
import { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import CartRestaurant from "@/components/frontOffice/cart/CartRestaurant";
import Contexts from "@/components/Contexts";

function Cart(props){
    // props
    const [cart, setCart] = useState([]);
    const [deliveryPrice, setDeliveryPrice] = useState(null);
    const [asset, setAsset] = useState('');
    // modals
    const [modalInfo, setModalInfo] = useState(null);
    const [comfirmModalInfo, setComfirmModalInfo] = useState(null);
    //message
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);

    // confirm cart
    const [courier, setCurier] = useState(false);
    const [courierData, setCourierData] = useState(null);
    //references
    const [zoomDOM, setZoomDOM] = useState(null);
    const containerZoomRef = useRef();

    useEffect(() => {
        setCart(props.cartInfo);
        setDeliveryPrice(props.deliveryPrice);
        setAsset(props.asset);
        setZoomDOM(containerZoomRef.current);
    }, [])

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
    }


    return(
        <Contexts.FrontContext.Provider value={{deliveryPrice, asset, setModalInfo, setComfirmModalInfo, cart, setCart, message, setMessage, zoomDOM, smallerBackground, normalBackground, comfirmModalInfo, setComfirmModalInfo, cart, setCart, courier, setCurier, courierData, setCourierData, messages, setMessages}}>
            <Authenticated auth={props.auth} modalInfo={modalInfo} setModalInfo={setModalInfo}>
                            <Head title="Cart"/>
                <div className="py-12 cart">
                    <div className="max-w-7xl mx-auto sm:px-0 ">
                        <div className="container" ref={containerZoomRef}>
                            <div className="card-header">
                                <h2>Dishes in Cart</h2>
                            </div>
                            {
                                cart.map((restaurant, index)=> <CartRestaurant key={index} restaurant={restaurant}></CartRestaurant>)
                            }
                        </div>
                    </div>
                </div>
            </Authenticated>
        </Contexts.FrontContext.Provider>
    )
}
export default Cart;