import axios from "axios";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish, asset, default_pic, restaurantDishesUrl}) {

    // let restaurantDishes = (restaurantId) => {
    //     axios.get(sortAndFilterUrl + '?price_sort=default&filter=' + restaurantId)
    //     .then(res => {setRestaurantDishes(res.data.dishes) });
    // }
    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + default_pic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li>
                    <span className="bold">At: </span>
                    {
                        (dish.restaurants).map((restaurant, index) => <RestaurantInDish key={index} restaurant={restaurant} index={index} allRestaurants={dish.restaurants} restaurantDishesUrl={restaurantDishesUrl}></RestaurantInDish>)
                    }
                </li>
            </ul>
        </li>
    )



}
export default Dish;
