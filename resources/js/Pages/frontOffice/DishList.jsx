
import Dish from "@/components/frontOffice/dishes/Dish";
import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function DishList(props) {
    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const defaultPic = props.defaultPic;

    useEffect(() => {
        setRestaurantDishes(props.dishes);
    }, [])

    
    return (
        <Authenticated auth={props.auth}>
            <Head title="Dishes"/>
            <div className="py-12 dishes-list">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="container">
                        <div className="row justify-content-center">
                            <SortFilterSearch setRestaurantDishes={setRestaurantDishes} restaurants={props.restaurants}/>
                        </div>
                        <div>
                            <div className="card-header">
                                <h2>Our dishes</h2>
                            </div>
                            <div className="card-body">
                                <ul className="dish-list-grid">
                                    {
                                        restaurantDishes.map((dish, index) => <Dish key={index} dish={dish} defaultPic={defaultPic} asset={props.asset} orderUrl={props.orderUrl}></Dish>)
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
export default DishList;