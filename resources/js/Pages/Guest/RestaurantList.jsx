import Restaurant from "@/components/frontOffice/restaurants/Restaurant";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    useEffect(() => {
        setRestaurantList(props.restaurants);
    }, [])
    return (
        <GuestLayout>
                <Head title="Restaurants"/>
                <div className="py-12 restaurant-list-front">
                    <div>
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
        </GuestLayout>
    )
}
export default RestaurantList;
