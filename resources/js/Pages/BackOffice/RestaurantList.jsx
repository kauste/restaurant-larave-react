import AreYouSureModal from "@/components/AreYouSureModal";
import BackRestaurant from "@/components/BackOffice/Restaurant/BackRestaurant";
import RestaurantCreate from "@/components/BackOffice/Restaurant/RestaurantCreate";
import RestaurantEdit from "@/components/BackOffice/Restaurant/RestaurantEdit";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurants, setRestaurants] = useState(props.restaurants)
    const [shouldCreate, setShouldCreate] = useState(false);
    const [forEditRestaurant, setForEditRestaurant] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setRestaurantList(restaurants);
    }, [restaurants])
    
    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    },[message])
    return (
        <AuthenticatedBack auth={props.auth} message={message}>
            <Head title="Restaurants"/>
            <RestaurantCreate restaurants={restaurants} shouldCreate={shouldCreate} setShouldCreate={setShouldCreate} storeRestaurantUrl={props.storeRestaurantUrl} setRestaurants={setRestaurants} setMessage={setMessage}></RestaurantCreate>
            <RestaurantEdit restaurants={restaurants} forEditRestaurant={forEditRestaurant} setForEditRestaurant={setForEditRestaurant} updateRestaurantUrl={props.updateRestaurantUrl} setRestaurants={setRestaurants} setMessage={setMessage}></RestaurantEdit>
            <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
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
                                                    restaurantList.map((restaurant, index) => <BackRestaurant key={index} setRestaurants={setRestaurants} restaurants={restaurants} restaurant={restaurant} showRestaurantDishesUrl={props.showRestaurantDishesUrl} deleteRestaurantUrl={props.deleteRestaurantUrl} setForEditRestaurant={setForEditRestaurant} setModalInfo={setModalInfo} setMessage={setMessage}></BackRestaurant>)
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