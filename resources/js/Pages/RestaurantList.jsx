import Restaurant from "@/components/Restaurant";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

function RestaurantList(props) {
    console.log(props);
    const [RestaurantList, setRestaurantList] = useState([]);
    useEffect(() => {
        setRestaurantList(props.restaurants);
    }, [])
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Our restaurants</h1>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Restaurant Name</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Adress</th>
                                                    <th scope="col">Working Hours</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    RestaurantList.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}></Restaurant>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
export default RestaurantList;
