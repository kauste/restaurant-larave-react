import { useEffect } from "react";

function Redirect(){
    useEffect(()=> {
        window.location.href= 'http://restaurant-react.lt/restaurant-list';
    }, []);
    return null;
}

export default Redirect;