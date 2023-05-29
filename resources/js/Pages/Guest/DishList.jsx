
import Contexts from "@/components/Contexts";
import Dish from "@/components/frontOffice/dishes/Dish";
import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import Paginator from "@/components/Paginator";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function DishList(props) {
    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const [defaultPic, setDefaultPic]= useState('');
    const [asset, setAsset] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [amountOfPages, setAmountOfPages] = useState(1);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPg, setPerPg] = useState(1);

    useEffect(() => {
        setRestaurantDishes(props.dishes.map((dish, i) => ({...dish, index:i, show:(i < props.perPage ? true : false), searchedAndFiltered:true})));
        setDefaultPic(props.defaultPic);
        setAsset(props.asset);
        setRestaurants(props.restaurants)
        setPerPg(props.perPage);
        setAmountOfPages(Math.ceil(Object.keys(props.dishes).length / props.perPage));

    }, []);
    const changePage = (page) => {
        setRestaurantDishes(rD => rD.map((dish, i) => ({...dish, show: (i < (page + 1) * perPg && i >=  page * perPg && dish.searchedAndFiltered == true) ? true : false})));
        setRequiredPage(page);
    }

    
    return (
        <Contexts.FrontContext.Provider value={{setRestaurantDishes, defaultPic, asset, restaurants, restaurantDishes, perPg, changePage, setRequiredPage, setAmountOfPages}}>
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
                                            restaurantDishes.map((dish, index) => dish.show ?  <Dish key={index} dish={dish}></Dish> : null)
                                        }
                                    </ul>
                                </div>
                                <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </Contexts.FrontContext.Provider>
    )
}
export default DishList;