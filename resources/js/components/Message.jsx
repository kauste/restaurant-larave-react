import { useEffect, useState } from "react";

function Message({message, navDOM}){

    const [messageStyle, setMessageStyle] = useState({});
    const [isNavBottomSeen, setIsNavBottomSeen] = useState(false);



    useEffect(() => {
        if(!message) return;
        const evaluateScrollPosition = () => {
            setIsNavBottomSeen(window.scrollY > navDOM.offsetHeight)
        }
        evaluateScrollPosition();
        window.addEventListener("scroll", evaluateScrollPosition);
        return () => {
            window.removeEventListener("scroll", evaluateScrollPosition);
        };
    }, [message])


    useEffect(()=> {
        console.log('ce');
        if(isNavBottomSeen){
            setMessageStyle({
                            position:'fixed', 
                            top:'0', 
                            left:'0', 
                            right:'0',
                            zIndex: '99'})
        }
        else{
            setMessageStyle({});
        }
    }, [isNavBottomSeen])

    if(message !== null && message !== undefined){
        return (
            <div className="message" style={messageStyle}>
                <div>{message}</div>
            </div>
        )
    }
    else {
        return null;
    }
}
export default Message;