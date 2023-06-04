import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

function CartDish({cartDish, cartData, setCartData, restaurant, setTotalPrice, showCancelCartModal}){
    
    const { normalBackground, asset, setModalInfo, setCart, setMessage, zoomDOM } = useContext(Contexts.FrontContext);
    const [amount, setAmount] = useState(0);
    const [oneDishTotalPrice, setOneDishTotalPrice] = useState(0);

    useEffect(() => {
        setOneDishTotalPrice((cartDish.dish_info.price * cartDish.amount).toFixed(2));
        setAmount(cartDish.amount)
    }, [cartData])

    const deleteItem = () => {
        axios.delete(route('delete-cart-item') + '/' + cartDish.dish_id + '/' + cartDish.restaurant_id)
        .then(res => {
                setCartData(cD => cD.filter((dish) => dish.restaurant_id !== cartDish.restaurant_id || dish.dish_id !== cartDish.dish_id));
                setTotalPrice(res.data.totalPrice);
            normalBackground();
            setModalInfo(null);
            setMessage(res.data.message)
        })
    }

    const editAmount = () => {
        if(amount == 0  && cartData.length === 1) return showCancelCartModal();
        if(amount == 0) return showModal();
        axios.put(route('edit-cart-item') + '/' + cartDish.dish_id + '/' + cartDish.restaurant_id, {'amount':amount})
            .then(res => {
                setCartData(cD => cD.map(item => {
                    if(item.dish_id == cartDish.dish_id && item.restaurant_id == cartDish.restaurant_id) item.amount = amount;
                    return item;
                }))
                setTotalPrice(res.data.totalPrice);
                setMessage(res.data.message);
            })
    }

    const showModal = () => {
        setModalInfo({'text':['Are you sure you want to delete this ', <b key={0}>item</b>, '?'], 'confirm': deleteItem, 'zoomDOM':zoomDOM});
    }
        return(
            <ul className="cart-grid">
                <li>
                    <img className="small-dish-img" src={asset + '/' + cartDish.dish_info.picture_path} alt={cartDish.dish_info.dish_name}></img>
                </li>
                <li>{cartDish.dish_info.dish_name}</li>
                <li className="d-flex gap-2 amount-edit-form">
                    <input className="amount-input" type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
                    <button type="button" className="one-color-btn green-btn" onClick={editAmount}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                         viewBox="0 0 405.272 405.272"
                            xmlSpace="preserve">
                        <g>
                            <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
                                c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
                                c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
                        </g>
                        </svg>
                    </button>
                </li>
                <li className="one-dish-price">{cartDish.dish_info.price} eu.</li>
                <li>{oneDishTotalPrice} eu.</li>
                <li>
                    <button type="button" className="buttons gray-outline-btn" onClick={cartData.length === 1 ? showCancelCartModal : showModal}>Delete</button>
                </li>
            </ul>
        )

}
export default CartDish;