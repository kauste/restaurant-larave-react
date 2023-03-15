import { useEffect, useState } from "react";

function Message({message}){
    if(message !== null && message !== undefined){
        const [messageStyle, setMessageStyle] = useState({});
        const [isNavBottomSeen, setIsNavBottomSeen] = useState(false);

        window.addEventListener('scroll', ()=> {
            setIsNavBottomSeen(window.scrollY > document.querySelector('nav').offsetHeight);

        })
        useEffect(() => {
            setIsNavBottomSeen(window.scrollY > document.querySelector('nav').offsetHeight);
        }, [])

        useEffect(()=> {
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