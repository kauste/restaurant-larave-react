import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import DishInRestaurant from "@/components/frontOffice/DishInRestaurant";
import { useState } from "react";

function RestaurantDishes(props){
    const [message, setMessage] = useState(null);

    return (
        <Authenticated auth={props.auth}
                    message={message}>
            <Head title="Restaurants"/>
            <div className="py-12 dishes-list one-restaurant-dishes">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="about-restaurant">
                            <div className="card-header">
                                <h2>{props.restaurant.restaurant_name}</h2>
                            </div>
                            <div className="restaurant-info">
                                <p>Our dishes is made with love. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit tempora quis ad placeat facilis repellat numquam totam, optio ipsa maxime tenetur. Eos rerum voluptate tempore consequatur id magni similique assumenda?</p>
                                <div><span className="bold">Find us at : </span>{props.restaurant.adress}, {props.restaurant.city}</div>
                                <div><span className="bold">Working hours : </span>{props.restaurant.work_starts}h - {props.restaurant.work_ends}h</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-header">
                                <h2>Our dishes</h2>
                            </div>
                            <div className="card-body">
                                <ul className="dish-list-grid">
                                    {
                                        (props.dishes).map((dish, index) => <DishInRestaurant key={index} dish={dish} default_pic={props.default_pic} orderUrl={props.orderUrl} asset={props.asset} setMessage={setMessage}></DishInRestaurant>)
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