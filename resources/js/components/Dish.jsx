import axios from "axios";
function Dish({dish, default_pic, orderUrl}) {

    function doOrder(){
        axios.post(orderUrl, dish)
        .then(res => {
            console.log(res.data.message);
        })
    }
    return (
        <tr className="align-center">
            <td>
                <img src={dish.picture_path ?? default_pic} className="img"/>
            </td>
            <td scope="row">{dish.dish_name}</td>
            <td>{dish.price} eu.</td>
            <td>{dish.restaurant_name}</td>
            <td className="controls">
                    <button className="btn btn-outline-danger" type="button" onClick={doOrder}>WANNA EAT</button>
            </td>
        </tr>
    )



}
export default Dish;
