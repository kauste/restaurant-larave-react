import Contexts from "@/components/Contexts";
import Restaurant from "@/components/frontOffice/restaurants/Restaurant";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setRestaurantList(props.restaurants);
    }, [])

    return (
        <Contexts.FrontContext.Provider value={{message, setMessage}}>
            <Authenticated auth={props.auth}>
                <Head title="Restaurants"/>
                <div className="py-12 restaurant-list-front">
                    <div className="max-w-10xl mx-auto  lg:px-8">
                        <div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Our restaurants</h2>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li className="restaurant-list-grid">
                                                    {
                                                        restaurantList.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}></Restaurant>)
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </Contexts.FrontContext.Provider>
    )
}
export default RestaurantList;
