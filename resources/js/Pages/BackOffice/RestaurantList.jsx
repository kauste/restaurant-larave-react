import BackRestaurant from "@/components/BackOffice/BackRestaurant";
import RestaurantCreate from "@/components/BackOffice/RestaurantCreate";
import RestaurantEdit from "@/components/BackOffice/RestaurantEdit";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurants, setRestaurants] = useState(props.restaurants)
    const [shouldCreate, setShouldCreate] = useState(false);
    const [forEditRestaurant, setForEditRestaurant] = useState(null);
    useEffect(() => {
        setRestaurantList(restaurants);
    }, [restaurants])

    return (
        <AuthenticatedBack auth={props.auth}>
            <Head title="Restaurants"/>
            <RestaurantCreate shouldCreate={shouldCreate} setShouldCreate={setShouldCreate} storeRestaurantUrl={props.storeRestaurantUrl} setRestaurants={setRestaurants}></RestaurantCreate>
            <RestaurantEdit restaurants={restaurants} forEditRestaurant={forEditRestaurant} setForEditRestaurant={setForEditRestaurant} updateRestaurantUrl={props.updateRestaurantUrl} setRestaurants={setRestaurants}></RestaurantEdit>
            <div className="py-12 restaurant-list-back">
                <div className="max-w-7xl mx-auto  lg:px-8">
                    <div>
                        <div className="w-100 d-flex justify-content-end">
                            <div className="btn btn-success btn-lg m-3" onClick={()=> setShouldCreate(true)}>Create new restaurant</div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Our restaurants</h2>
                                    </div>
                                    <div className="card-body">
                                        <ul className="restaurant-list">
                                            <li>
                                                <ul className="restaurant-list-grid headings">
                                                    <li>Restaurant Name</li>
                                                    <li>City</li>
                                                    <li>Adress</li>
                                                    <li>Working Hours</li>
                                                    <li></li>
                                                </ul>
                                            </li>
                                            <li>
                                                {
                                                    restaurantList.map((restaurant, index) => <BackRestaurant key={index} restaurant={restaurant} showRestaurantDishesUrl={props.showRestaurantDishesUrl} deleteRestaurantUrl={props.deleteRestaurantUrl} setForEditRestaurant={setForEditRestaurant}></BackRestaurant>)
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
        </AuthenticatedBack>
    )
}
export default RestaurantList;