import axios from "axios";

function Restaurant({restaurant, restaurantDishesUrl}){

    return(
        <ul className="restaurant-list-grid">
            <li className="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.city}</li>
            <li>{restaurant.adress}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">
                <a className="btn btn-outline-danger" href={restaurantDishesUrl + '/' + restaurant.id} title="Show restaurant dishes">Show dishes</a>
            </li>
        </ul>
    )
}
export default Restaurant;