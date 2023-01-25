import axios from "axios";
import CartDish from "./CartDish";
import { router } from "@inertiajs/react";

function CartRestaurant({restaurant, asset, deliveryPrice, deleteCartItemUrl, editCartItemUrl, setModalInfo, cancelCartUrl, confirmCartUrl, setComfirmModalInfo}){
    const cancelCart = () => {
        axios.delete(cancelCartUrl + '/' + restaurant.cartInfo[0].restaurant_id)
        .then(res => {
            localStorage.setItem('message', res.data.message)
            router.reload()
        })
    }
    const confirmCart = () => {
        axios.post(confirmCartUrl, {restaurantId:restaurant.cartInfo[0].restaurant_id})
        .then(res => {
            localStorage.setItem('message', res.data.message)
            router.reload()
        })
    }
    const showModal = () => {
        setModalInfo({'text':'Are you sure you want to delete this cart?', 'confirm': cancelCart});
    }
    const confirmOrderModal =() => {
        setComfirmModalInfo({'deliveryPrice':deliveryPrice, 'confirm': confirmCart});
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
                        restaurant.cartInfo.map((cartDish, index) => <CartDish key={index} cartDish={cartDish} asset={asset} deleteCartItemUrl={deleteCartItemUrl} editCartItemUrl={editCartItemUrl} setModalInfo={setModalInfo}></CartDish>)
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