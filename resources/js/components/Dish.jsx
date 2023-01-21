import axios from "axios";
import RestaurantInDish from "./RestaurantInDish";
function Dish({dish, asset, default_pic, orderUrl, sortAndFilterUrl, setRestaurantDishes}) {

    function doOrder(){
        axios.post(orderUrl, dish)
        .then(res => {
            console.log(res.data.message);
        })
    }
    let restaurantDishes = (restaurantId) => {
        axios.get(sortAndFilterUrl + '?price_sort=default&filter=' + restaurantId)
        .then(res => {setRestaurantDishes(res.data.dishes) });
    }
    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + default_pic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li>
                    <span class="at-restaurant">At: </span>
                    {
                        (dish.restaurants).map((restaurant, index) => <RestaurantInDish key={index} restaurant={restaurant} index={index} allRestaurants={dish.restaurants} restaurantDishes={restaurantDishes}></RestaurantInDish>)
                    }
                </li>
                <li className="controls">
                        <button className="btn btn-outline-danger" type="button" onClick={doOrder}>Lets eat</button>
                </li>
            </ul>
        </li>
    )



}
export default Dish;
