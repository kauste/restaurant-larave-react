import Contexts from "@/components/Contexts";
import Restaurant from "@/components/frontOffice/restaurants/Restaurant";
import Paginator from "@/components/Paginator";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [message, setMessage] = useState(null);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPage, setPerPage] = useState(0);

    useEffect(() => {
        setRestaurantList(props.restaurants.map((dish, i) => ({...dish, show:i < props.perPage ? true : false})));
        setAmountOfPages(props.amountOfPages)
        setPerPage(props.perPage)
    }, [])
    function changePage(page){
        setRestaurantList(rL => rL.map((dish, i) => ({...dish, show: i < (page + 1) * perPage && i >=  page * perPage ? true : false})));
        setRequiredPage(page)
    }

    return (
        <Contexts.FrontContext.Provider value={{message, setMessage}}>
            <Authenticated auth={props.auth}>
                <Head title="Restaurants"/>
                <div className="restaurant-list-front">
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
                                                        restaurantList.map((restaurant, index) => restaurant.show === true ? <Restaurant key={index} restaurant={restaurant}></Restaurant> : null)
                                                    }
                                                </li>
                                            </ul>
                                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
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
