import Authenticated from "@/Layouts/Authenticated";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import CartDish from "@/components/frontOffice/CartDish";
import CartRestaurant from "@/components/frontOffice/CartRestaurant";

function Cart(props){
    const [message, setMessage] = useState(null);
    const [cart, setCart] = useState([]);
    console.log(props.cartInfo);
    useEffect(() => {
        setCart(props.cartInfo)
    }, [])
    
    return(
        <Authenticated auth={props.auth} message={message}>
                        <Head title="Restaurants"/>
            <div className="py-12 cart">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="card-header">
                            <h2>Dishes in Cart</h2>
                        </div>
                        {
                            cart.map((restaurant, index)=> <CartRestaurant key={index} setMessage={setMessage} message={message} deliveryPrice={props.deliveryPrice} asset={props.asset} restaurant={restaurant} deleteCartItemUrl={props.deleteCartItemUrl}></CartRestaurant>)
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default Cart;