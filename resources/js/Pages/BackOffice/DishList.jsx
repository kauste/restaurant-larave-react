import AreYouSureModal from "@/components/AreYouSureModal";
import CreateDish from "@/components/BackOffice/Dish/CreateDish";
import Dish from "@/components/BackOffice/Dish/Dish";
import EditDish from "@/components/BackOffice/Dish/EditDish";
// import SortFilterSearch from "@/components/frontOffice/dishes/SortFilerSearch";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";

function DishList(props) {
    const [modalInfo, setModalInfo] = useState(null);
    const [message, setMessage] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [newestDishes, setNewestDishes] = useState(props.dishes)
    const [shouldCreate, setShouldCreate] = useState(false);
    const [dishForEdit, setDishForEdit] = useState(null);
    const [zoomDOM, setZoomDOM] = useState(null);
    const zoomContainer = useRef();
    const defaultPic = props.defaultPic;

    useEffect(() => {
        setZoomDOM(zoomContainer.current);
    }, [])

    useEffect(() => {
        setDishes(newestDishes);
    }, [newestDishes])

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 20000)
    },[message])

    const backgroundZoomTiming = {
        duration: 300,
        iterations: 1,
        fill:'forwards',
        easing: 'ease'
      };
    const zoomSmaller = () => {
        zoomDOM.animate([{ transform:'scale(0.9)'}], backgroundZoomTiming)
    }
      const zoomBack = () => {
          zoomDOM.animate([{ transform:'scale(1)'}], backgroundZoomTiming)
      }
    const cresteNewDish = () => {
        zoomSmaller();
        setShouldCreate(true);
    }
    return (
        <AuthenticatedBack auth={props.auth} message={message}>
            <Head title="Restaurants"/>
            <CreateDish shouldCreate={shouldCreate} setShouldCreate={setShouldCreate} restaurants={props.restaurants} setNewestDishes={setNewestDishes} newestDishes={newestDishes} setMessage={setMessage} zoomBack={zoomBack}></CreateDish>
            <EditDish dishForEdit={dishForEdit} setDishForEdit={setDishForEdit} restaurants={props.restaurants}  setNewestDishes={setNewestDishes} newestDishes={newestDishes} setMessage={setMessage} zoomBack={zoomBack}></EditDish>
            <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
            <div className="py-12 dishes-list">
                <div className="max-w-7xl mx-auto sm:px-0 " ref={zoomContainer}>
                    <div className="w-100 d-flex justify-content-end">
                            <button className="one-color-btn brown-outline-btn btn-lg m-3" onClick={cresteNewDish} >Create new dish</button>
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
                                        dishes.map((dish, index) => <Dish key={index} dish={dish} defaultPic={defaultPic} asset={props.asset} orderUrl={props.orderUrl} setNewestDishes={setNewestDishes} newestDishes={newestDishes} setModalInfo={setModalInfo} setMessage={setMessage} setDishForEdit={setDishForEdit} zoomDOM={zoomDOM}zoomSmaller={zoomSmaller} zoomBack={zoomBack}></Dish>)
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