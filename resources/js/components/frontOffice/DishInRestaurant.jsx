import axios from "axios";
function DishInRestaurant({dish, asset, setMessage, default_pic, orderUrl}) {


    function doOrder(){
        axios.post(orderUrl, {id:dish.id, dish_name:dish.dish_name})
        .then(res => {
            setMessage(res.data.message);
            setTimeout(()=> {
            setMessage(null)
            }, 10000)
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
                <li className="controls">
                        <button className="btn btn-outline-danger" type="button" onClick={doOrder}>Lets eat</button>
                </li>
            </ul>
        </li>
    )



}
export default DishInRestaurant;