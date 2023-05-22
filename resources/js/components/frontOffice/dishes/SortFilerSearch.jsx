import Contexts from "@/components/Contexts";
import axios from "axios";
import { useContext, useState } from "react";
function SortFilterSearch(){
    
    const {setRestaurantDishes, restaurantDishes, restaurants, changePage, setRequiredPage, perPage, setAmountOfPages} = useContext(Contexts.FrontContext);

    const [sortValue, setSortValue] = useState('default');
    const [restaurant, setRestaurant] = useState(0);
    const [search, setSearch] = useState('');
    const [activenessState, setActivenessState] = useState('d-none');

    const sortDefaultFilterAll = () => {
        setRestaurantDishes(rD => [...rD].sort((a, b) => a.index - b.index).map(dish => ({...dish, show:true})));
        changePage(1);
        setAmountOfPages(Math.ceil(Object.keys(restaurantDishes).length /perPage));
    }
    const sort = () => {
        if(sortValue === 'asc'){
            setRestaurantDishes(rD => [...rD].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        } 
        else{
            setRestaurantDishes(rD => [...rD].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
        } 
        setAmountOfPages(Math.ceil(Object.keys(restaurantDishes).length /perPage));
        changePage(1);
    }
    const filter = () => {
            // amount of dishes in this restaurant
            let countDishes = 0;
            restaurantDishes.map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ++countDishes : [].push())
            // array of dishes in first page sorted by index
            let z = 0;
            setRestaurantDishes(rD => [...rD].sort((a, b) => a.index - b.index).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant))  && (z++ < perPage) ? ({...dish, show:true}) : ({...dish, show:false})));
            // amount of buttons for pages
            setAmountOfPages(Math.ceil(countDishes / perPage));
            // first page
            setRequiredPage(1);
    }

    const filterAndSort = () => {
        // count dishes in requested restaurant
        let countDishes = 0;
        restaurantDishes.map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant)) ? ++countDishes : [].push())
        //array of dishes in the first page, sorted by pride (asc and desc)
        let z = 0;
        if(sortValue === 'asc'){
            setRestaurantDishes(rD => [...rD].sort((a,b) => parseInt(a.price) - parseInt(b.price)).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant))  && (z++ < perPage) ? ({...dish, show:true}) : ({...dish, show:false})));
        }
        else{
            setRestaurantDishes(rD => [...rD].sort((a,b) => parseInt(b.price) - parseInt(a.price)).map((dish) => Array.from(dish.restaurants, (thisRestaurant) => thisRestaurant.id).includes(parseInt(restaurant))  && (z++ < perPage) ? ({...dish, show:true}) : ({...dish, show:false})));
        }
        // amount of buttons for pages
        setAmountOfPages(Math.ceil(countDishes / perPage));
        // first page
        setRequiredPage(1);
    }
    const doSortAndFilter = () => {
        if(restaurant === 0 && sortValue === 'default'){
            sortDefaultFilterAll();
        }
        else if(restaurant === 0 && sortValue !== 'default'){
            sort();
        } 
        else if( restaurant !== 0 && sortValue === 'default'){
                filter();
        }
        else{
            filterAndSort();
        }
            
        

        // axios.get(route('sort-and-filter') + '?price_sort='+ sortValue +'&filter=' + restaurant)
        // .then(res => {
        //     console.log('labas')
        //     setRestaurantDishes(rd => rd.filter(dish => res.data.dishes.includes(dish.id)));
        //  });
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