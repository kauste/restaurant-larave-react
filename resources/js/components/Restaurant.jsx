function Restaurant({restaurant}){
    return(
        <ul class="restaurant-list-grid">
            <li class="restaurant-name">{restaurant.restaurant_name}</li>
            <li>{restaurant.city}</li>
            <li>{restaurant.adress}</li>
            <li>From {restaurant.work_starts}h to {restaurant.work_ends}h</li>
            <li className="controls">
                <form method="post" action="{route('restaurant-delete', restaurant)}">
                    {/* @csrf
                    @method('delete') */}
                    <button className="btn btn-outline-danger" type="submit">WANNA EAT</button>
                </form>
            </li>
        </ul>
    )
}
export default Restaurant;