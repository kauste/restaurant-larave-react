import Authenticated from "@/Layouts/Authenticated";
import { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import CartRestaurant from "@/components/frontOffice/cart/CartRestaurant";
import Contexts from "@/components/Contexts";
import Paginator from "@/components/Paginator";

function Cart(props){
    // props
    const [cart, setCart] = useState([]);
    const [deliveryPrice, setDeliveryPrice] = useState(null);
    const [asset, setAsset] = useState('');
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPage, setPerPage] = useState(0);
    // modals
    const [modalInfo, setModalInfo] = useState(null);
    const [comfirmModalInfo, setComfirmModalInfo] = useState(null);
;    //message
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);

    // confirm cart
    const [courier, setCurier] = useState(false);
    const [courierData, setCourierData] = useState(null);
    //references
    const [zoomDOM, setZoomDOM] = useState(null);

    const containerZoomRef = useRef();

    useEffect(() => {
        setCart(props.cartInfo.map((cartRestaurant, i) => ({...cartRestaurant, show:i < props.perPage ? true : false})));
        setAmountOfPages(props.amountOfPages)
        setPerPage(props.perPage)
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

    function changePage(page){
        setCart(crt => crt.map((oneRestCart, i) => ({...oneRestCart, show: i < (page + 1) * perPage && i >=  page * perPage ? true : false})));
        setRequiredPage(page)
    }
    const rearangeOrder = (newCart) => {
        const pagesCount = Math.ceil(Object.keys(newCart).length / perPage)
        changePage(pagesCount - 1 < requiredPage ? requiredPage - 1 : requiredPage)
        setAmountOfPages(pagesCount);
    }

    return(
        <Contexts.FrontContext.Provider value={{ deliveryPrice, asset, setModalInfo, setComfirmModalInfo, cart, setCart, message, setMessage, zoomDOM, smallerBackground, normalBackground, comfirmModalInfo, courier, setCurier, courierData, setCourierData, messages, setMessages, requiredPage, perPage, setAmountOfPages, changePage, rearangeOrder}}>
            <Authenticated auth={props.auth} modalInfo={modalInfo} setModalInfo={setModalInfo} fromCart={true}>
                            <Head title="Cart"/>
                <div className="cart">
                    <div className="max-w-7xl mx-auto sm:px-0 ">
                        <div className="container" ref={containerZoomRef}>
                            <div className="card-header">
                                <h2>Dishes in Cart</h2>
                            </div>
                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                            <div className="card-body">
                            {
                                cart.length !== 0 
                                ?  
                                    cart.map((restaurant, index)=> restaurant.show === true ? <CartRestaurant key={index} restaurant={restaurant}></CartRestaurant> : null)
                                :
                                    <div className="no-data">
                                        <p>No dishes added in cart yet.</p>
                                    </div>
                            }
                            </div>
                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                         </div>
                    </div>
                </div>
            </Authenticated>
        </Contexts.FrontContext.Provider>
    )
}
export default Cart;