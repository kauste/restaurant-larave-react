import CartDish from "./CartDish";

function CartRestaurant({restaurant, asset, deliveryPrice, deleteCartItemUrl, setMessage, message}){
    return(
            <div className="card cart-restaurant">
                <div className="card-header">
                    <h3><b>{restaurant['restaurantName']}</b></h3>
                </div>
                <div className="card-body">
                    <ul className="bold cart-grid">
                        <li></li>
                        <li>Dish</li>
                        <li>Amount ordered</li>
                        <li>One dish price</li>
                        <li>All units price</li>
                        <li></li>
                    </ul>
                    {
                        restaurant.cartInfo.map((cartDish, index) => <CartDish message={message} setMessage={setMessage} key={index} cartDish={cartDish} asset={asset} deleteCartItemUrl={deleteCartItemUrl}></CartDish>)
                    }
                    <ul className="grid-for-extra">
                        <li></li>
                        <li><b>Delivery price:</b></li>
                        <li>{deliveryPrice} eu.</li>
                    </ul>
                    <ul className="grid-for-extra">
                        <li></li>
                        <li><b>Total price:</b></li>
                        <li>{restaurant.totalPrice} eu.</li>
                    </ul>
                </div>
            </div>
    )
}
 export default CartRestaurant;