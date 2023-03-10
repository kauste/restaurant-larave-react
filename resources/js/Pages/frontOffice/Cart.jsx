import Authenticated from "@/Layouts/Authenticated";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import CartRestaurant from "@/components/frontOffice/cart/CartRestaurant";

function Cart(props){
    const [message, setMessage] = useState(null);
    const [cart, setCart] = useState([]);
    const [newCart, setNewCart] = useState(props.cartInfo);
    const [modalInfo, setModalInfo] = useState(null);
    const [comfirmModalInfo, setComfirmModalInfo] = useState(null);
    const [thisRestaurant, setThisRestaurant] = useState(null)

    useEffect(() => {
        const forBgColor = document.querySelector('.authentificated-layout');
        forBgColor.style.background = 'rgb(236,202,88)';
        forBgColor.style.background = 'linear-gradient(204deg, rgba(86,67,14,1) 0%, rgba(236,202,88,1) 50%, rgba(86,67,14,1) 100%)';
    }, [])

    useEffect(()=> {
        setCart(newCart)
    }, [newCart])
    
    useEffect(() => {
        setTimeout(()=> {
                setMessage(null)
            }, 20000)
    }, [message])


    return(
        <Authenticated auth={props.auth} message={message} modalInfo={modalInfo} setModalInfo={setModalInfo} comfirmModalInfo={comfirmModalInfo} setComfirmModalInfo={setComfirmModalInfo} cart={cart} setNewCart={setNewCart}>
                        <Head title="Cart"/>
            <div className="py-12 cart">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="card-header">
                            <h2>Dishes in Cart</h2>
                        </div>
                        {
                            cart.map((restaurant, index)=> <CartRestaurant key={index} deliveryPrice={props.deliveryPrice} asset={props.asset} restaurant={restaurant} setModalInfo={setModalInfo} setComfirmModalInfo={setComfirmModalInfo} setNewCart={setNewCart} cart={cart} setMessage={setMessage}></CartRestaurant>)
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default Cart;