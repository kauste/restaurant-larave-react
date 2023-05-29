
import Dish from "@/components/frontOffice/dishes/Dish";
import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Contexts from '@/components/Contexts';
import Paginator from "@/components/Paginator";

function DishList(props) {

    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const [defaultPic, setDefaultPic]= useState('');
    const [asset, setAsset] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [requiredPage, setRequiredPage] = useState(0);
    const [message, setMessage] = useState(null);
    const [perPg, setPerPg] = useState(1);

    useEffect(() => {
        setPerPg(props.perPage);
        setRestaurantDishes(props.dishes.map((dish, i) => ({...dish, index:i, show:(i < props.perPage ? true : false), searchedAndFiltered:true})));
        setDefaultPic(props.defaultPic);
        setAsset(props.asset);
        setRestaurants(props.restaurants);
        setAmountOfPages(Math.ceil(Object.keys(props.dishes).length / props.perPage));
    }, [])

    const changePage = (page) => {
        setRestaurantDishes(rD => rD.map((dish, i) => ({...dish, show: (i < (page + 1) * perPg && i >=  page * perPg && dish.searchedAndFiltered == true) ? true : false})));
        setRequiredPage(page);
    }

    
    return (
        <Contexts.FrontContext.Provider value={{setRestaurantDishes, message, setMessage, defaultPic, asset, restaurants, perPg, changePage, setRequiredPage, setAmountOfPages, restaurantDishes}}>
        <Authenticated auth={props.auth}>
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
                                        restaurantDishes.map((dish) => dish.show ? <Dish key={dish.index} dish={dish}></Dish> : null)
                                    }
                                </ul>
                            </div>
                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}/>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
        </Contexts.FrontContext.Provider>

    )
}
export default DishList;