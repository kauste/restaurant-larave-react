import axios from "axios";
function Dish({dish, asset, default_pic, orderUrl}) {

    function doOrder(){
        axios.post(orderUrl, dish)
        .then(res => {
            console.log(res.data.message);
        })
    }
    return (
        <li className="align-center">
            <ul className="one-dish">
                <li>
                    <img src={asset + dish.picture_path ?? asset + default_pic} className="img"/>
                </li>
                <li className="dish-name">{dish.dish_name}</li>
                <li>{dish.price} eu.</li>
                <li><span>At :</span> {dish.restaurant_name}</li>
                <li className="controls">
                        <button className="btn btn-outline-danger" type="button" onClick={doOrder}>Lets eat</button>
                </li>
            </ul>
        </li>
    )



}
export default Dish;
