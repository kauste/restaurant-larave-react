import Restaurant from "@/components/Restaurant";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    console.log(props);
    const [RestaurantList, setRestaurantList] = useState([]);
    useEffect(() => {
        setRestaurantList(props.restaurants);
    }, [])
    return (
        <Authenticated auth={props.auth}>
            <Head title="Restaurants"/>
            <div className="py-12 restaurant-list-front">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Our restaurants</h1>
                                    </div>
                                    <div className="card-body">
                                        <ul className="restaurant-list">
                                            <li>
                                                <ul class="restaurant-list-grid headings">
                                                    <li>Restaurant Name</li>
                                                    <li>City</li>
                                                    <li>Adress</li>
                                                    <li>Working Hours</li>
                                                    <li></li>
                                                </ul>
                                            </li>
                                            <li>
                                                {
                                                    RestaurantList.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}></Restaurant>)
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
    )
}
export default RestaurantList;
