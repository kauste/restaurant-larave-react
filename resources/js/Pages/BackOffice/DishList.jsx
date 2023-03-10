import AreYouSureModal from "@/components/AreYouSureModal";
import CreateDish from "@/components/BackOffice/Dish/CreateDish";
import Dish from "@/components/BackOffice/Dish/Dish";
import EditDish from "@/components/BackOffice/Dish/EditDish";
// import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function DishList(props) {
    const [modalInfo, setModalInfo] = useState(null);
    const [message, setMessage] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [newestDishes, setNewestDishes] = useState(props.dishes)
    const [shouldCreate, setShouldCreate] = useState(false);
    const [dishForEdit, setDishForEdit] = useState(null);

    const defaultPic = props.defaultPic;

    useEffect(() => {
        setDishes(newestDishes);
    }, [newestDishes])

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    },[message])

    const cresteNewDish = () => {
        setShouldCreate(true);
    }
    return (
        <AuthenticatedBack auth={props.auth} message={message}>
            <Head title="Restaurants"/>
            <CreateDish shouldCreate={shouldCreate} setShouldCreate={setShouldCreate} restaurants={props.restaurants} setNewestDishes={setNewestDishes} newestDishes={newestDishes} setMessage={setMessage}></CreateDish>
            <EditDish dishForEdit={dishForEdit} setDishForEdit={setDishForEdit} restaurants={props.restaurants}  setNewestDishes={setNewestDishes} newestDishes={newestDishes} setMessage={setMessage}></EditDish>
            <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
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
                                        dishes.map((dish, index) => <Dish key={index} dish={dish} defaultPic={defaultPic} asset={props.asset} orderUrl={props.orderUrl} setNewestDishes={setNewestDishes} newestDishes={newestDishes} setModalInfo={setModalInfo} setMessage={setMessage} setDishForEdit={setDishForEdit}></Dish>)
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