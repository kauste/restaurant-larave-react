import axios from "axios";
import { useEffect, useState } from "react";

function CartDish({cartDish, asset, deleteCartItemUrl, setMessage, message}){
    const [amount, setAmount] = useState(cartDish.amount);
    // window.addEventListener('load', () => {
    //     if(localStorage.getItem('message')){
    //         setMessage(localStorage.getItem('message'));
    //         localStorage.removeItem('message');
    //         if(message !== null){
    //             setTimeout(()=> {
    //                 setMessage(null)
    //                 }, 20000)
    //         }
    //     }
    // });
    const deleteItem = () => {
        axios.delete(deleteCartItemUrl + '/' + cartDish.dish_id + '/' + cartDish.restaurant_id)
        .then(res => 
            // localStorage.setItem('message', res.data.message)
            window.location.href = window.location.href
    )}
    return(
        <ul className="cart-grid">
            <li>
                <img className="cart-dish-img" src={asset + '/' + cartDish.dish_info.picture_path} alt={cartDish.dish_info.dish_name}></img>
            </li>
            <li>{cartDish.dish_info.dish_name}</li>
            <li>
                <input className="amount-input" type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
            </li>
            <li>{cartDish.dish_info.price} eu.</li>
            <li>{(cartDish.dish_info.price * cartDish.amount).toFixed(2)} eu.</li>
            <li>
                <button type="button" className="btn btn-danger" onClick={deleteItem}>Delete</button>
            </li>
        </ul>
    )
}
export default CartDish;