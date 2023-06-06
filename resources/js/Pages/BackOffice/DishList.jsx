import AreYouSureModal from "@/components/AreYouSureModal";
import CreateDish from "@/components/BackOffice/Dish/CreateDish";
import Dish from "@/components/BackOffice/Dish/Dish";
import EditDish from "@/components/BackOffice/Dish/EditDish";
import FilterSearch from "@/components/BackOffice/Dish/FilterSearch";
import Contexts from "@/components/Contexts";
import Paginator from "@/components/Paginator";
import PerPage from "@/components/PerPage";
import AuthenticatedBack from "@/Layouts/AuthenticatedBack";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";

function DishList(props) {
    const [asset, setAsset] = useState('');
    const [restaurants, setRestaurants] = useState([])
    const [modalInfo, setModalInfo] = useState(null);
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [shouldCreate, setShouldCreate] = useState(false);
    const [shouldEdit, setShouldEdit] = useState(false);
    const [dishForEdit, setDishForEdit] = useState(null);
    const [zoomDOM, setZoomDOM] = useState(null);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [requiredPage, setRequiredPage] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    // const [changePg, setChangePg] = useState(null)
    //search and filter
    const [filteValue, setFilterValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    //unchangable
    const backgroundColor = '#f8f8f8';
    const defaultPic = props.defaultPic;

    const zoomContainer = useRef();

    useEffect(() => {
        setAsset(props.asset);
        setRestaurants(props.restaurants);
        setZoomDOM(zoomContainer.current);
        setAmountOfPages(props.amountOfPages)
        setPerPage(props.perPage)
        setDishes(props.dishes.map((oneDish, i) => ({...oneDish, show: i > props.perPage ? true : false, index:i, searchedAndFiltered:true})));
        setCurrPage(0)
        setRequiredPage(0)
    }, [])
    useEffect(() => {
    }, [dishes])
    useEffect(() => {
        const messageSet = setTimeout(() => {
            setMessage(null);
        }, 20000)
        return () => {
            clearTimeout(messageSet);
        }
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
    const changePerPage = () => {
        const pagesCount = Math.ceil(Object.keys(dishes).length / perPage)
        setAmountOfPages(pagesCount)
        changePg(0);
    }
    function changePg(page){
        setCurrPage(page)
        setDishes(d => d.map((dish, i) => ({...dish, show: (i < (page + 1) * perPage && i >=  page * perPage && dish.searchedAndFiltered == true) ? true : false})));
        setRequiredPage(page)
    }

    useEffect(() => {
        const initialValue = 0;
        const sumOfFiltered = dishes.reduce(
            (accumulator, dish) => dish.searchedAndFiltered === true ? accumulator + 1 : accumulator,
            initialValue
        );
        setAmountOfPages(Math.ceil(sumOfFiltered / perPage))
        
    }, [dishes])
    return (
        <Contexts.BackContext.Provider value={{ message, setMessage, messages, setMessages, dishes, defaultPic, asset, setModalInfo, dishForEdit, setDishForEdit, zoomDOM, zoomSmaller, zoomBack, shouldCreate, setShouldCreate, shouldEdit, setShouldEdit, restaurants, setDishes, currPage, filteValue, setFilterValue, searchValue, setSearchValue, changePg, perPage}}>
            <AuthenticatedBack auth={props.auth} backgroundColor={backgroundColor}>
                <Head title="Restaurants"/>
                <CreateDish/>
                <EditDish/>
                <AreYouSureModal modalInfo={modalInfo} setModalInfo={setModalInfo}></AreYouSureModal>
                <div className="py-12 dishes-list">
                    <div  ref={zoomContainer}>
                        <div className="button-bin">
                                <button className="one-color-btn gray-btn btn-lg" onClick={cresteNewDish} >Create new dish</button>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <FilterSearch/>
                            </div>
                            <div>
                                <div className="card-header">
                                    <h2>Our dishes</h2>
                                </div>
                                <div className="card-body">
                                    <PerPage perPg={perPage} setPerPg={setPerPage} changePerPage={changePerPage}></PerPage>
                                    <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage} changePage={changePg}></Paginator>
                                    <ul className="back-dish-list">
                                        {
                                            dishes.map((dish, index) => dish.show === true ? <Dish key={index} dish={dish}></Dish> : null)
                                        }
                                    </ul>
                                    <Paginator amountOfPages={amountOfPages} requiredPage={requiredPage}  changePage={changePg}></Paginator>
                                    <PerPage perPg={perPage} setPerPg={setPerPage} changePerPage={changePerPage}></PerPage>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedBack>
        </Contexts.BackContext.Provider>
    )
}
export default DishList;