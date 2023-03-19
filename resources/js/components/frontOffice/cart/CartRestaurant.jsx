import axios from "axios";
import CartDish from "./CartDish";
import { useEffect, useState } from "react";

function CartRestaurant({restaurant, asset, deliveryPrice, setModalInfo, setComfirmModalInfo, cart, setMessage, setCart, zoomDOM}){
    
    const [cartData, setCartData] = useState(restaurant.cartInfo);


    const cancelCart = () => {
        axios.delete(route('delete-cart') + '/' + restaurant.cartInfo[0].restaurant_id)
        .then(res => {
            setCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== restaurant.cartInfo[0].restaurant_id));
            setModalInfo(null);
            setMessage(res.data.message)
        })
    }
    const showModal = () => {
        setModalInfo({'text':'Are you sure you want to delete this cart?', 'confirm': cancelCart, 'zoomDOM':zoomDOM});
    }

    const confirmOrderModal =() => {
        setComfirmModalInfo({'deliveryPrice':deliveryPrice, 'restaurantId': restaurant.cartInfo[0].restaurant_id, 'setMessage':setMessage});
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
                        <li>One dish price</li>
                        <li>All units price</li>
                        <li></li>
                    </ul>
                    {
                        cartData.map((cartDish, index) => <CartDish key={index} cartDish={cartDish} asset={asset} setModalInfo={setModalInfo} cartData={restaurant.cartInfo} setCartData={setCartData} setCart={setCart} cart={cart} restaurant={restaurant} setMessage={setMessage} zoomDOM={zoomDOM}></CartDish>)
                    }
                    <ul className="grid-for-extra">
                        <li></li>
                        <li><b>Total price:</b></li>
                        <li>{restaurant.totalPrice} eu.</li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end gap-3 p-4">
                    <button className="cancel-btn" type="button" onClick={showModal}>Cancel</button>
                    <button className="pattern-btn order-btn" type="button" onClick={confirmOrderModal}>Order</button>
                </div>
            </div>
    )
}
 export default CartRestaurant;