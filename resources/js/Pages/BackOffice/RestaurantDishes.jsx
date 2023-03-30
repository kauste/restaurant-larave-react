import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";
import Contexts from "@/components/Contexts";
import DishInRestaurant from "@/components/BackOffice/DishInRestaurant/DishInRestaurant";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import AreYouSureModal from "@/components/AreYouSureModal";

function RestaurantDishes(props){

    const [message, setMessage] = useState(null);
    const [dishes, setDishes] = useState([]);

    const [defaultPic, setDefaultPic] = useState('')
    const [restaurant, setRestaurant] = useState({});
    const [asset, setAsset] = useState('');
    const [modalInfo, setModalInfo] = useState(null);
    const [zoomDOM, setZoomDOM] = useState(null);
    const zoomContainer = useRef();

    const backgroundZoomTiming = {
        duration: 300,
        iterations: 1,
        fill:'forwards',
        easing: 'ease'
      };
      
    useEffect(() =>{
        setZoomDOM(zoomContainer.current);
        setDishes(props.dishes);
        setDefaultPic(props.defaultPic);
        setRestaurant(props.restaurant);
        setAsset(props.asset);
    }, [])
    const zoomBack = () => {
        zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    },[message])

    return (
        <Contexts.BackContext.Provider value={{defaultPic, asset, restaurant, setMessage, message, setModalInfo, zoomDOM, zoomBack}}>
        <AuthenticatedBack auth={props.auth}>
            <Head title={restaurant.restaurant_name}/>
            <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
            <div className="py-12 dishes-list one-restaurant-dishes">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container" ref={zoomContainer}>
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
                                <ul className=" dish-list-grid back-restaurant-dish-list-grid">
                                    {
                                        dishes.map((dish, index) => <DishInRestaurant key={index} dish={dish}/>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedBack>
        </Contexts.BackContext.Provider>
    )
}
export default RestaurantDishes;