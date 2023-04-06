import Contexts from "@/components/Contexts";
import { useContext } from "react";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish}) {
    const {asset, defaultPic} = useContext(Contexts.FrontContext);
    return (
        <li className="align-center one-dish-box">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + defaultPic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}<h1>{dish.index}</h1></li>
                <li>{dish.price} eu.</li>
                <li>
                    <span className="bold">At: </span>
                    {
                        (dish.restaurants).map((restaurant, index) => <RestaurantInDish key={index} restaurant={restaurant} index={index} allRestaurants={dish.restaurants}></RestaurantInDish>)
                    }
                </li>
            </ul>
        </li>
    )



}
export default Dish;
