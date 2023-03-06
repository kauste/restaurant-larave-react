import axios from "axios";
import { useState } from "react";

function CartDish({cartDish, asset, deleteCartItemUrl, editCartItemUrl, setModalInfo, cartData, cart, setNewCart, setNewCartInfo, restaurant, setMessage}){
    const [amount, setAmount] = useState(cartDish.amount);
    const deleteItem = () => {
        axios.delete(deleteCartItemUrl + '/' + cartDish.dish_id + '/' + cartDish.restaurant_id)
        .then(res => {
            let msg;
            if(cartData.length === 1){
                setNewCart(cart.filter((r) => r.cartInfo[0].restaurant_id !== restaurant.cartInfo[0].restaurant_id));
                msg ='There is no dishes in cart, therefore cart is deleted.';
            }
            else{
                setNewCartInfo(cartData.filter((dish) => dish.restaurant_id !== cartDish.restaurant_id || dish.dish_id !== cartDish.dish_id));
                msg = res.data.message;
            }
            setModalInfo(null);
            setMessage(msg)
        })
    }
    const editAmount = () => {
        axios.put(editCartItemUrl + '/' + cartDish.dish_id + '/' + cartDish.restaurant_id, {'amount':amount})
        .then(res => {
            setMessage(res.data.message);
        })
    }
    const showModal = () => {
        setModalInfo({'text':'Are you sure you want to delete this item?', 'confirm': deleteItem});
    }

    return(
        <ul className="cart-grid">
            <li>
                <img className="small-dish-img" src={asset + '/' + cartDish.dish_info.picture_path} alt={cartDish.dish_info.dish_name}></img>
            </li>
            <li>{cartDish.dish_info.dish_name}</li>
            <li className="d-flex gap-2">
                <input className="amount-input" type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
                <button type="button" className="btn btn-danger" onClick={editAmount}>
                    <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        width="22px" height="22px" viewBox="0 0 405.272 405.272"
                        xmlSpace="preserve">
                    <g>
                        <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
                            c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
                            c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
                    </g>
                    </svg>
                </button>
            </li>
            <li>{cartDish.dish_info.price} eu.</li>
            <li>{(cartDish.dish_info.price * cartDish.amount).toFixed(2)} eu.</li>
            <li>
                <button type="button" className="btn btn-danger" onClick={showModal}>Delete</button>
            </li>
        </ul>
    )
}
export default CartDish;