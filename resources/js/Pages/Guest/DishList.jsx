
import Contexts from "@/components/Contexts";
import Dish from "@/components/frontOffice/dishes/Dish";
import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function DishList(props) {
    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const [defaultPic, setDefaultPic]= useState('');
    const [asset, setAsset] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        setRestaurantDishes(props.dishes);
        setDefaultPic(props.defaultPic);
        setAsset(props.asset);
        setRestaurants(props.restaurants)
    }, []);

    
    return (
        <Contexts.FrontContext.Provider value={{setRestaurantDishes, defaultPic, asset, restaurants}}>
            <GuestLayout>
                <Head title="Dishes"/>
                <div className="py-12 dishes-list">
                    <div className="max-w-7xl mx-auto sm:px-0 ">
                        <div className="container">
                            <div className="row justify-content-center">
                                <SortFilterSearch/>
                            </div>
                            <div>
                                <div className="card-header">
                                    <h2>Our dishes</h2>
                                </div>
                                <div className="card-body">
                                    <ul className="dish-list-grid">
                                        {
                                            restaurantDishes.map((dish, index) => <Dish key={index} dish={dish}></Dish>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </Contexts.FrontContext.Provider>
    )
}
export default DishList;