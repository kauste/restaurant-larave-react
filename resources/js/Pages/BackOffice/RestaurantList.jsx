import AreYouSureModal from "@/components/AreYouSureModal";
import BackRestaurant from "@/components/BackOffice/Restaurant/BackRestaurant";
import RestaurantCreate from "@/components/BackOffice/Restaurant/RestaurantCreate";
import RestaurantEdit from "@/components/BackOffice/Restaurant/RestaurantEdit";
import Contexts from "@/components/Contexts";
import Paginator from "@/components/Paginator";
import PerPage from "@/components/PerPage";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState, useRef } from "react";

function RestaurantList(props) {
    const [restaurantList, setRestaurantList] = useState([]);
    // const [restaurants, setRestaurants] = useState(props.restaurants)
    const [shouldCreate, setShouldCreate] = useState(false);
    const [forEditRestaurant, setForEditRestaurant] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const [zoomDOM, setZoomDOM] = useState(null);
    const backgroundColor = '#f8f8f8';
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
    const zoomContainer = useRef();

    const create = () => {
        setShouldCreate(true)
        zoomSmaller()
    }
    useEffect(() => {
        setZoomDOM(zoomContainer.current);
        setRestaurantList(props.restaurants.map((restaurant, i) => ({...restaurant, show:i < props.perPage ? true : false, index:i})));
        setAmountOfPages(props.amountOfPages)
        setPerPage(props.perPage)
    }, [])
    
    useEffect(() => {
        const messageSet = setTimeout(() => {
            setMessage(null);
        }, 20000)
        return () => {
            clearTimeout(messageSet);
        }
    },[message])
    
    function changePage(page){
        setCurrPage(page)
        setRestaurantList(rL => rL.sort((a, b) => a.status - b.status || a.index - b.index).map((oneRestaurant, i) => ({...oneRestaurant, show: i < (page + 1) * perPage && i >=  page * perPage ? true : false})));
        setRequiredPage(page)

    }
    useEffect(() => {
        setAmountOfPages(Math.ceil(Object.keys(restaurantList).length / perPage))
    }, [restaurantList])
    return (
        <Contexts.BackContext.Provider value={{message, setMessage, messages, setMessages, restaurantList, setRestaurantList, perPage, amountOfPages, requiredPage, changePage, zoomDOM, zoomSmaller, zoomBack, forEditRestaurant, setForEditRestaurant, setModalInfo, shouldCreate, setShouldCreate, currPage}}>
            <AuthenticatedBack auth={props.auth} backgroundColor={backgroundColor}>
                <Head title="Restaurants"/>
                <RestaurantCreate/>
                <RestaurantEdit />
                <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
                <div className="py-12 restaurant-list-back">
                    <div className="">
                        <div ref={zoomContainer}>
                            <div className="button-bin">
                                <button className="one-color-btn gray-btn btn-lg" onClick={create}>Create new restaurant</button>
                            </div>
                            <div className="">
                                <div className="row w-100 justify-content-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Our restaurants</h2>
                                        </div>
                                        <div className="card-body">
                                            <PerPage perPg={perPage} setPerPg={setPerPage} changePerPage={() =>changePage(0)}></PerPage>
                                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePage}></Paginator>
                                            <ul className="restaurant-list">
                                                <li>
                                                    <ul className="restaurant-list-grid headings">
                                                        <li>Restaurant Name</li>
                                                        <li>City</li>
                                                        <li>Adress</li>
                                                        <li>Working Hours</li>
                                                        <li></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    {
                                                        restaurantList.map((restaurant, index) => restaurant.show === true ? <BackRestaurant key={index} restaurant={restaurant}></BackRestaurant> :null)
                                                    }
                                                </li>
                                            </ul>
                                            <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage}  changePage={changePage}></Paginator>
                                            <PerPage perPg={perPage} setPerPg={setPerPage} changePerPage={() =>changePage(0)}></PerPage>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedBack>
        </Contexts.BackContext.Provider>
    )
}
export default RestaurantList;