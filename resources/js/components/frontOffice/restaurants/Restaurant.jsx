import axios from "axios";

function Restaurant({ restaurant }) {

    return (
        <ul className="restaurant-list">
            <li className="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.adress}, {restaurant.city}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">

                <a className="buttons black-btn" href={route('restaurant-dishes') + '/' + restaurant.id} title="Show restaurant dishes">

                    Show dishes</a>
            </li>
        </ul>
    )
}
export default Restaurant;