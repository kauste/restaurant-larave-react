import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useState } from "react";
function SortFilterSearch(){
    
    const {setRestaurantDishes, restaurantDishes, restaurants, changePage, setRequiredPage, perPg, setAmountOfPages} = useContext(Contexts.FrontContext);

    const [sortValue, setSortValue] = useState('default');
    const [restaurant, setRestaurant] = useState(0);
    const [search, setSearch] = useState('');
    const [activenessState, setActivenessState] = useState('d-none');

    const sortDefaultFilterAll = () => {
        setRestaurantDishes(rD => [...rD].sort((a, b) => a.index - b.index).map(dish => ({...dish, searchedAndFiltered:true})));
        changePage(0);
        setAmountOfPages(Math.ceil(Object.keys(restaurantDishes).length /perPg));
    }
    const sort = () => {
        if(sortValue === 'asc'){
            setRestaurantDishes(rD => [...rD].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        } 
        else{
            setRestaurantDishes(rD => [...rD].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
        } 
        setAmountOfPages(Math.ceil(Object.keys(restaurantDishes).length /perPg));
        changePage(0);
    }

    const filter = () => {
        let countDishes = 0;
        restaurantDishes.map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ++countDishes : [].push())
        setRestaurantDishes(rD => [...rD].sort((a, b) => a.index - b.index).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ({...dish, searchedAndFiltered:true}) : ({...dish, searchedAndFiltered:false})).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered));
        setAmountOfPages(Math.ceil(countDishes / perPg));
        changePage(0);
    }

    const filterAndSort = () => {
        let countDishes = 0;
        restaurantDishes.map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ++countDishes : [].push())
        if(sortValue === 'asc'){
            setRestaurantDishes(rD => [...rD].sort((a,b) => parseInt(a.price) - parseInt(b.price)).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ({...dish, searchedAndFiltered:true}) : ({...dish, searchedAndFiltered:false})).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered));
        }
        else{
            setRestaurantDishes(rD => [...rD].sort((a,b) => parseInt(b.price) - parseInt(a.price)).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ({...dish, searchedAndFiltered:true}) : ({...dish, searchedAndFiltered:false})).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered));
        }
        setAmountOfPages(Math.ceil(countDishes / perPg));
        changePage(0);
    }

    const doSortAndFilter = () => {
        if(parseInt(restaurant) === 0 && sortValue === 'default'){
            sortDefaultFilterAll();
        }
        else if(parseInt(restaurant) === 0 && sortValue !== 'default'){
            sort();
        } 
        else if(parseInt(restaurant) !== 0 && sortValue === 'default'){
                filter();
        }
        else{
            filterAndSort();
        }
    }
    const doSearch = () => {
        axios.get(route('search-dish') +'?dish=' + search)
        .then(res => {
            setRestaurantDishes(rD => [...rD].sort((a, b) => a.index - b.index).map(dish => Array.from(res.data.dishes, (oneDish) => oneDish.id).includes(dish.id) ? ({...dish, searchedAndFiltered:true}) : ({...dish, searchedAndFiltered:false})).sort((a, b) => b.searchedAndFiltered - a.searchedAndFiltered));
            setAmountOfPages(Math.ceil(res.data.dishes.length / perPg));
            changePage(0);
        });

    }
    const displayToggle = () => {
        let toggle = activenessState === 'd-none' ? '' : 'd-none';
        setActivenessState(toggle);
    }

    return(
        <div className={activenessState !== 'd-none' ? 'active sort-filter-search' : 'sort-filter-search'}>
        <div className="card-header d-flex align-items-center" onClick={displayToggle}>
            <h3 className="p-0 m-0">Sort, filter, search</h3>
            <span className="p-0 sfs-chevron">
                <svg className="ml-2 -mr-0.5 h-7 w-7 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
            </span>
        </div>
        <div className={`card-body ${activenessState} mt-5 d-flex flex-column align-items-center`}>
            <div className="sort-filter d-flex flex-wrap gap-2 justify-center align-items-center">
                <div>
                    <label className="mr-2 " htmlFor="priceSort">Sort by price</label>
                    <select className="sort-select" id="priceSort" name="priceSort" value={sortValue} onChange={e => setSortValue(e.target.value)}>
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
                    <button className="buttons gray-btn ml-2" onClick={doSortAndFilter}>SORT AND FILTER</button>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-center ml-2 mt-5">
                <label className="mr-2" htmlFor="search">Search</label>
                <input className="search-input"  value={search} onChange={e => setSearch(e.target.value)}></input>
                <button className="buttons gray-btn ml-2" onClick={doSearch}>SEARCH</button>
            </div>
        </div>
    </div>
    )
}
export default SortFilterSearch;