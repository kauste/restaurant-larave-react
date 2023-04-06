import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useState } from "react";

function DishInRestaurant({dish, setShouldShowModal}) {

    const {asset, setMessage, defaultPic, restaurantId, userId} = useContext(Contexts.FrontContext);
    const [amount, setAmount] = useState(1);

    function addToCart(){
        if(userId !== null){
            axios.post(route('user-add-to-cart'), {id:dish.id, dish_name:dish.dish_name, amount:amount, restaurant_id:restaurantId})
            .then(res => {
                setMessage(res.data.message);
            })
        }
        else {
            setShouldShowModal(true);
        }
    }

    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + defaultPic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li className="form">
                        <input className="amount-input" type="number" min="1" max="50" value={amount} onChange={e => setAmount(e.target.value)}/>
                        <button className="one-color-btn green-btn" type="button" onClick={addToCart}>Add to cart</button>
                </li>
            </ul>
        </li>
    )



}
export default DishInRestaurant;