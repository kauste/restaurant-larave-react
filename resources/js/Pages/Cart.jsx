import Authenticated from "@/Layouts/Authenticated";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import CartRestaurant from "@/components/frontOffice/CartRestaurant";

function Cart(props){
    const [message, setMessage] = useState(null);
    const [cart, setCart] = useState([]);
    const [modalInfo, setModalInfo] = useState(null);
    const [comfirmModalInfo, setComfirmModalInfo] = useState(null);
    useEffect(() => {
        if(localStorage.getItem('message')){
            setMessage(localStorage.getItem('message'))
            localStorage.removeItem('message');
            setTimeout(()=> {
                setMessage(null)
            }, 20000)
        }
        setCart(props.cartInfo)
    }, [])

    return(
        <Authenticated auth={props.auth} message={message} modalInfo={modalInfo} setModalInfo={setModalInfo} comfirmModalInfo={comfirmModalInfo} setComfirmModalInfo={setComfirmModalInfo}>
                        <Head title="Restaurants"/>
            <div className="py-12 cart">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="card-header">
                            <h2>Dishes in Cart</h2>
                        </div>
                        {
                            cart.map((restaurant, index)=> <CartRestaurant key={index} deliveryPrice={props.deliveryPrice} asset={props.asset} restaurant={restaurant} deleteCartItemUrl={props.deleteCartItemUrl} editCartItemUrl={props.editCartItemUrl} setModalInfo={setModalInfo} setComfirmModalInfo={setComfirmModalInfo} cancelCartUrl={props.cancelCartUrl} confirmCartUrl={props.confirmCartUrl}></CartRestaurant>)
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default Cart;