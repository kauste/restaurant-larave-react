import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import DishInRestaurant from "@/components/frontOffice/dishes/DishInRestaurant";
import { useEffect, useRef, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import GoLoginModal from "@/components/Guest/GoLoginModal";

function RestaurantDishes(props){
    const [dishes, setDishes] = useState([]);
    const [defaultPic, setDefaultPic] = useState('')
    const [restaurant, setRestaurant] = useState({});
    const [asset, setAsset] = useState('');
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [zoomDOM, setZoomDOM] = useState(null);
    const zoomContainer = useRef();
    useEffect(() =>{
        setDishes(props.dishes);
        setDefaultPic(props.defaultPic);
        setRestaurant(props.restaurant);
        setAsset(props.asset);
        setZoomDOM(zoomContainer.current);
    }, [])
    return (
        <GuestLayout>
            <Head title={restaurant.restaurant_name}/>
                <GoLoginModal shouldShowModal={shouldShowModal} setShouldShowModal={setShouldShowModal} zoomDOM={zoomDOM}></GoLoginModal>
            <div className="py-12 dishes-list one-restaurant-dishes" ref={zoomContainer}>
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
                                        dishes.map((dish, index) => <DishInRestaurant key={index} dish={dish} defaultPic={defaultPic} restaurantId={restaurant.id} asset={asset} userId={props.userId} setShouldShowModal={setShouldShowModal}></DishInRestaurant>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
export default RestaurantDishes;