import axios from "axios";
import CartDish from "./CartDish";
import { useContext, useEffect, useState } from "react";
import Contexts from "@/components/Contexts";

function CartRestaurant({restaurant}){
    
    const {deliveryPrice, setModalInfo, setComfirmModalInfo, cart, setMessage, setCart, zoomDOM, rearangeOrder} = useContext(Contexts.FrontContext);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(Infinity);

    useEffect(() => {
        setCartData(restaurant.cartInfo);
        setTotalPrice(restaurant.totalPrice)
    }, [cart])

    const showModal = () => {
        setModalInfo({'text':['Are you sure you want to delete this ', <b key={0}>cart?</b>, '?'], 'confirm': cancelCart, 'zoomDOM':zoomDOM});
    }

    const confirmOrderModal =() => {
        setComfirmModalInfo({'deliveryPrice':deliveryPrice, 'restaurantId': restaurant.cartInfo[0].restaurant_id});
    }
    
    const cancelCart = () => {
        axios.delete(route('delete-cart') + '/' + restaurant.cartInfo[0].restaurant_id)
        .then(res => {
            const newCart = cart.filter((r) => r.cartInfo[0].restaurant_id !== restaurant.cartInfo[0].restaurant_id)
            setCart(newCart)
            rearangeOrder(newCart);
            setModalInfo(null);
            setMessage(res.data.message)
        })
    }

    return(
            <div className="card cart-restaurant">
                <div className="card-header">
                    <h3><b>{restaurant['restaurantName']}</b></h3>
                </div>
                <div className="card-body">
                    <ul className="bold cart-grid">
                        <li></li>
                        <li>Dish</li>
                        <li>Amount ordered</li>
                        <li className="one-dish-price">One dish price</li>
                        <li>All units price</li>
                        <li></li>
                    </ul>
                    {
                        cartData.map((cartDish, index) => <CartDish key={index} cartDish={cartDish} cartData={cartData} setCartData={setCartData} restaurant={restaurant} setTotalPrice={setTotalPrice} showCancelCartModal={showModal}></CartDish>)
                    }
                    <ul className="grid-for-extra">
                        <li></li>
                        <li><b>Total price:</b></li>
                        <li>{totalPrice} eu.</li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end gap-3 p-4">
                    <button className="buttons gray-outline-btn" type="button" onClick={showModal}>Cancel</button>
                    <button className="one-color-btn green-btn btn-lg" type="button" onClick={confirmOrderModal}>Order</button>
                </div>
            </div>
    )
}
 export default CartRestaurant;