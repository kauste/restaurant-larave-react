
import Dish from "@/components/frontOffice/dishes/Dish";
import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Contexts from '@/components/Contexts';

function DishList(props) {

    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const [defaultPic, setDefaultPic]= useState('');
    const [asset, setAsset] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [requiredPage, setRequiredPage] = useState(1);
    const perPage = 16;

    useEffect(() => {
        setRestaurantDishes(props.dishes.map((dish, index) => ({...dish, index:index + 1})));
        setDefaultPic(props.defaultPic);
        setAsset(props.asset);
        setRestaurants(props.restaurants)
        setAmountOfPages(props.amountOfPages)
    }, [])

    
    return (
        <Contexts.FrontContext.Provider value={{setRestaurantDishes, defaultPic, asset, restaurants}}>
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
                                        restaurantDishes.map((dish) => dish.index > (requiredPage - 1) * perPage && dish.index <= requiredPage * perPage ? <Dish key={dish.index} dish={dish}></Dish> : null)
                                    }
                                </ul>
                            </div>
                            <div className="paginator-box">
                                {
                                    Array.from({ length: (amountOfPages)}, (_, i) => 1 + i).map((page) => <div onClick={() => setRequiredPage(page)} className={requiredPage == page ? 'active one-color-btn orange-outline-btn' : 'one-color-btn orange-outline-btn'}key={page}>{page}</div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
        </Contexts.FrontContext.Provider>

    )
}
export default DishList;