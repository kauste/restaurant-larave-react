import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useState } from "react";

function FilterSearch() {
    const { restaurants, setDishes } = useContext(Contexts.BackContext);
    const [filteValue, setFilterValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const doSortAndFilter = () => {
        axios.get(route('back-search-and-filter-dish') + '?filter=' + filteValue + '&search=' + searchValue)
        .then(res => {
            setDishes(allDishes => allDishes.map(dish => res.data.dishesIds.includes(dish.id) ? ({...dish, show:true}) : ({...dish, show:false})).sort((a, b) => b.id - a.id))
        })
    }
     return (
        <div className="back-filter-and-search">
            <div className="back-filter">
                <label htmlFor="filter">Filter:</label>
                <select id="filter" name="filter" value={filteValue} onChange={(e) => setFilterValue(e.target.value)}>
                    <option key="default" value="0">All</option>
                    {
                        restaurants.map((restaurant, index) => <option key={index} value={restaurant.id}>{restaurant.restaurant_name}</option>)
                    }
                </select>
            </div>
            <div className="back-search">
                <label htmlFor="search">Search:</label>
                <input id="search" placeholder="Search by dish name or price..." onChange={(e) => setSearchValue(e.target.value)}></input>
            </div>
            <button className="simple-button"onClick={doSortAndFilter}>Go!</button>
        </div>
     );
}
export default FilterSearch;