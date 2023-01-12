function Restaurant({restaurant}){
    return(
        <tr>
        <th scope="row">{restaurant.restaurant_name}</th>
        <td>{restaurant.city}</td>
        <td>{restaurant.adress}</td>
        <td>From {restaurant.work_starts}h to {restaurant.work_ends}h</td>
        <td className="controls">
            <form method="post" action="{route('restaurant-delete', restaurant)}">
                {/* @csrf
                @method('delete') */}
                <button className="btn btn-outline-danger" type="submit">WANNA EAT</button>
            </form>
        </td>
    </tr>
    )
}
export default Restaurant;