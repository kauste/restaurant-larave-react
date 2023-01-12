import Dish from "@/components/Dish";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";

function DishList(props) {
    const [restaurantDishes, setRestaurantDishes] = useState([]);
    const [selectValue, setSelectValue] = useState('default');
    const [restaurant, setRestaurant] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setRestaurantDishes(props.dishes);
    }, [])

  let sortAndFilter = () => {
        console.log(restaurant)
        axios.get(props.sortAndFilterUrl + '?price_sort='+ selectValue +'&filter=' + restaurant)
        .then(res => { setRestaurantDishes(res.data.dishes) });
    }
    let doSearch = () => {
        axios.get(props.searchUrl +'?dish=' + search)
        .then(res => { setRestaurantDishes(res.data.dishes) });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Sort, filter, search</h2>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <label className="mr-2" htmlFor="priceSort">Sort by price</label>
                                            <select id="priceSort" name="priceSort" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                                                <option value="asc">Smallest first</option>
                                                <option value="desc">Biggest first</option>
                                                <option value="default">Default</option>
                                            </select>
                                            <label className="ml-5 mr-2"htmlFor="filterRestaurant">Filter by restaurant</label>
                                            <select id="filterRestaurant" name="filterRestaurant" value={restaurant.id} onChange={e => {setRestaurant(e.target.value)}}>
                                                <option key="default">All</option>
                                                {
                                                    props.restaurants.map((restaurant)=> <option value={restaurant.id} key={restaurant.id}>{restaurant.restaurant_name}</option>)
                                                }
                                            </select>
                                            <button className="btn btn-outline-info ml-2" onClick={sortAndFilter}>SORT</button>
                                        </div>
                                        <div className=" d-flex ml-2 mt-5">
                                            <label htmlFor="search">Search</label>
                                            <input className="form-control"  value={search}onChange={e => setSearch(e.target.value)}></input>
                                            <button className="btn btn-outline-info ml-2" onClick={doSearch}>SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Our dishes</h1>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th cope="col"></th>
                                                    <th scope="col">Dish Name</th>
                                                    <th scope="col">Dish Price</th>
                                                    <th scope="col">Restaurant</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    restaurantDishes.map((dish, index) => <Dish key={index} dish={dish} default_pic={props.default_pic} orderUrl={props.orderUrl}></Dish>)
                                                }
                                            </tbody>
                                        </table>
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
export default DishList;