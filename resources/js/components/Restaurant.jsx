function Restaurant({restaurant}){
    return(
        <ul class="restaurant-list-grid">
            <li class="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.city}</li>
            <li>{restaurant.adress}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">
                <a className="btn btn-outline-danger" href="" title="Show restaurant dishes">Show dishes</a>
            </li>
        </ul>
    )
}
export default Restaurant;