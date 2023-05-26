import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import DishInRestaurant from "@/components/frontOffice/dishes/DishInRestaurant";
import { useEffect, useRef, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import GoLoginModal from "@/components/Guest/GoLoginModal";
import Contexts from "@/components/Contexts";
import Paginator from "@/components/Paginator";

function RestaurantDishes(props){
    const [dishes, setDishes] = useState([]);
    const [defaultPic, setDefaultPic] = useState('')
    const [restaurant, setRestaurant] = useState({});
    const [restaurantId, setRestaurantId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [asset, setAsset] = useState('');    
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [requiredPage, setRequiredPage] = useState(1);
    const [perPage, setPerPage] = useState(1);


    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [zoomDOM, setZoomDOM] = useState(null);

    const zoomContainer = useRef();
    useEffect(() =>{
        setDishes(props.dishes.map((dish, i) => ({...dish, index:i, show:(i < props.perPage ? true : false)})));
        setDefaultPic(props.defaultPic);
        setRestaurant(props.restaurant);
        setRestaurantId(props.restaurant.id);
        setAsset(props.asset);
        setUserId(props.userId);
        setZoomDOM(zoomContainer.current);
        setPerPage(props.perPage);
        setAmountOfPages(props.amountOfPages);
    }, [])

    const changePage = (page) => {
        setDishes(rD => rD.map((dish, i) => ({...dish, show:(i < perPage * page && i >= perPage * (page - 1) ? true : false)})));
        setRequiredPage(page);
    }
    return (
        <Contexts.FrontContext.Provider value={{defaultPic, restaurantId, asset, userId, shouldShowModal, setShouldShowModal, zoomDOM}}>
            <GuestLayout>
                <Head title={restaurant.restaurant_name}/>
                    <GoLoginModal></GoLoginModal>
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
                                            dishes.map((dish, index) => dish.show === true ? <DishInRestaurant key={index} dish={dish} setShouldShowModal={setShouldShowModal}></DishInRestaurant> : null)
                                        }
                                    </ul>
                                    <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </Contexts.FrontContext.Provider>
    )
}
export default RestaurantDishes;