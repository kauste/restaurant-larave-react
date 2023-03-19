import axios from "axios";
import { useState } from "react";
function SortFilterSearch({sortAndFilterUrl, setRestaurantDishes, restaurants}){
    const [selectValue, setSelectValue] = useState('default');
    const [restaurant, setRestaurant] = useState(0);
    const [search, setSearch] = useState('');
    const [activenessState, setActivenessState] = useState('d-none');

    const sortAndFilter = () => {
        axios.get(route('sort-and-filter') + '?price_sort='+ selectValue +'&filter=' + restaurant)
        .then(res => {setRestaurantDishes(res.data.dishes) });
    }
    const doSearch = () => {
        axios.get(route('search-dish') +'?dish=' + search)
        .then(res => {setRestaurantDishes(res.data.dishes) });
    }
    const displayToggle = () => {
        let toggle = activenessState === 'd-none' ? '' : 'd-none';
        setActivenessState(toggle);
    }

    return(
        <div className="sort-filter-search">
        <div className="card-header d-flex align-items-center" onClick={displayToggle}>
            <h3 className="p-0 m-0">Sort, filter, search</h3>
            <span className="p-0 sfs-chevron">
                <svg className="ml-2 -mr-0.5 h-7 w-7 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
            </span>
        </div>
        <div className={`card-body ${activenessState} mt-5 d-flex flex-column align-items-center`}>
            <div className="sort-filter">
                <div>
                    <label className="mr-2 " htmlFor="priceSort">Sort by price</label>
                    <select className="sort-select" id="priceSort" name="priceSort" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option value="asc">Smallest first</option>
                        <option value="desc">Biggest first</option>
                        <option value="default">Default</option>
                    </select>
                </div>
                <div>
                    <label className="mr-2" htmlFor="filterRestaurant">Filter by restaurant</label>
                        <select className="filter-select" id="filterRestaurant" name="filterRestaurant" value={restaurant.id} onChange={e => {setRestaurant(e.target.value)}}>
                        <option key="default" value="0">All</option>
                        {
                            restaurants.map((rest)=> <option value={rest.id} key={rest.id}>{rest.restaurant_name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <button className="simple-button ml-2" onClick={sortAndFilter}>SORT AND FILTER</button>
                </div>
            </div>
            <div className="d-flex align-items-center ml-2 mt-5">
                <label className="mr-2" htmlFor="search">Search</label>
                <input className="search-input"  value={search} onChange={e => setSearch(e.target.value)}></input>
                <button className="simple-button ml-2" onClick={doSearch}>SEARCH</button>
            </div>
        </div>
    </div>
    )
}
export default SortFilterSearch;