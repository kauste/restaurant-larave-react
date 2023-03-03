function OrderDish({asset, orderDish}){


    return(
        <ul className="order-grid">
            <li>
                <img className="small-dish-img" src={asset + '/' + orderDish.picture_path} alt={orderDish.dish_name}></img>
            </li>
            <li>{orderDish.dish_name}</li>
            <li>{orderDish.amount}</li>
            <li>{orderDish.price} eu.</li>
            <li>{(orderDish.price * orderDish.amount).toFixed(2)} eu.</li>
            {/* <li>
                <button type="button" className="btn btn-danger" onClick={showModal}>Delete</button>
            </li> */}
        </ul>
    )
}
export default OrderDish;