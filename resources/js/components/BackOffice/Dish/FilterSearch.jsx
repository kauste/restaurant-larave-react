import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useState } from "react";

function FilterSearch() {
    const { restaurants, setDishes, changePg, filteValue, setFilterValue, searchValue, setSearchValue} = useContext(Contexts.BackContext);

    const doSortAndFilter = () => {
        axios.get(route('back-search-and-filter-dish') + '?filter=' + filteValue + '&search=' + searchValue)
        .then(res => {
            setDishes(allDishes => allDishes.map(dish => {
                res.data.dishesIds.includes(dish.id) ? dish.searchedAndFiltered = true : dish.searchedAndFiltered = false;
                return dish;
            }).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered || a.index - b.index))
            changePg(0)
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
            <button className="one-color-btn black-btn"onClick={doSortAndFilter}>Go!</button>
        </div>
     );
}
export default FilterSearch;