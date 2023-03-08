import CreateDish from "@/components/BackOffice/Dish/CreateDish";
import Dish from "@/components/BackOffice/Dish/Dish";
// import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function DishList(props) {
    const [dishes, setDishes] = useState([]);
    const [defaultPic, setDefaultPic] = useState('');
    const [shouldCreate, setShouldCreate] = useState(false);

    useEffect(() => {
        setDishes(props.dishes);
        setDefaultPic(props.defaultPic)
    }, [])
    const cresteNewDish = () => {
        setShouldCreate(true);
    }
    return (
        <AuthenticatedBack auth={props.auth}>
            <Head title="Restaurants"/>
            <CreateDish shouldCreate={shouldCreate} setShouldCreate={setShouldCreate} restaurants={props.restaurants} dishStoreUrl={props.dishStoreUrl}></CreateDish>
            <div className="py-12 dishes-list">
                <div className="max-w-7xl mx-auto sm:px-0 ">
                    <div className="w-100 d-flex justify-content-end">
                            <div className="btn btn-success btn-lg m-3" onClick={cresteNewDish} >Create new dish</div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* <SortFilterSearch setDishes={setDishes} sortAndFilterUrl={props.sortAndFilterUrl} searchUrl={props.searchUrl} restaurants={props.restaurants}/> */}
                        </div>
                        <div>
                            <div className="card-header">
                                <h2>Our dishes</h2>
                            </div>
                            <div className="card-body">
                                <ul className="dish-list-grid">
                                    {
                                        dishes.map((dish, index) => <Dish key={index} dish={dish} defaultPic={defaultPic} asset={props.asset} orderUrl={props.orderUrl}></Dish>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedBack>
    )
}
export default DishList;