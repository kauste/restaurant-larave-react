import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import DishInRestaurant from "@/components/frontOffice/DishInRestaurant";
import { useEffect, useState } from "react";

function RestaurantDishes(props){
    const [message, setMessage] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [defaultPic, setDefaultPic] = useState('')
    const [addToCartUrl, setAddToCartUrl] = useState('');
    const [restaurant, setRestaurant] = useState({});
    const [asset, setAsset] = useState('');
    useEffect(() =>{
        console.log();
        setDishes(props.dishes);
        setDefaultPic(props.defaultPic);
        setAddToCartUrl(props.addToCartUrl);
        setRestaurant(props.restaurant);
        setAsset(props.asset);
    }, [])
    return (
        <Authenticated auth={props.auth}
                    message={message}>
            <Head title="Restaurants"/>
            <div className="py-12 dishes-list one-restaurant-dishes">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="about-restaurant">
                            <div className="card-header">
                                <h2>{restaurant.restaurant_name}</h2>
                            </div>
                            <div className="restaurant-info">
                                <p>Our dishes is made with love. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit tempora quis ad placeat facilis repellat numquam totam, optio ipsa maxime tenetur. Eos rerum voluptate tempore consequatur id magni similique assumenda?</p>
                                <div><span className="bold">Find us at : </span>{restaurant.adress}, {restaurant.city}</div>
                                <div><span className="bold">Working hours : </span>{restaurant.work_starts}h - {restaurant.work_ends}h</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-header">
                                <h2>Our dishes</h2>
                            </div>
                            <div className="card-body">
                                <ul className="dish-list-grid">
                                    {
                                        dishes.map((dish, index) => <DishInRestaurant key={index} dish={dish} defaultPic={defaultPic} addToCartUrl={addToCartUrl} restaurantId={restaurant.id} asset={asset} setMessage={setMessage}></DishInRestaurant>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default RestaurantDishes;