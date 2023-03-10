import axios from "axios";
import CartDish from "./CartDish";
import { useEffect, useState } from "react";

function CartRestaurant({restaurant, asset, deliveryPrice, setModalInfo, setComfirmModalInfo, setNewCart, cart, setThisRestaurant, setMessage}){
    
    const [cartData, setCartData] = useState([]);
    const [newCartInfo, setNewCartInfo] = useState(restaurant.cartInfo);
    

    useEffect(()=> {
        setThisRestaurant(restaurant)
        setCartData(newCartInfo);
    }, [newCartInfo])

    const cancelCart = () => {
        axios.delete(route('delete-cart') + '/' + restaurant.cartInfo[0].restaurant_id)
        .then(res => {
            setNewCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== restaurant.cartInfo[0].restaurant_id));
            setModalInfo(null);
            setMessage(res.data.message)
        })
    }
    const showModal = () => {
        setModalInfo({'text':'Are you sure you want to delete this cart?', 'confirm': cancelCart});
    }
    const confirmOrderModal =() => {
        setComfirmModalInfo({'deliveryPrice':deliveryPrice, 'restaurantId': cartData[0].restaurant_id, 'setMessage':setMessage});
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
                        cartData.map((cartDish, index) => <CartDish key={index} cartDish={cartDish} asset={asset} setModalInfo={setModalInfo} cartData={cartData} setNewCartInfo={setNewCartInfo} setNewCart={setNewCart} cart={cart} restaurant={restaurant} setMessage={setMessage}></CartDish>)
                    }
                    <ul className="grid-for-extra">
                        <li></li>
                        <li><b>Total price:</b></li>
                        <li>{restaurant.totalPrice} eu.</li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end gap-3 p-4">
                    <button className="btn btn-outline-danger btn-lg" type="button" onClick={showModal}>Cancel</button>
                    <button className="btn btn-danger btn-lg" type="button" onClick={confirmOrderModal}>Order</button>
                </div>
            </div>
    )
}
 export default CartRestaurant;