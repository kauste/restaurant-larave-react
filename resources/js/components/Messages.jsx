import { useEffect, useState } from "react";

function Messages({messages}){
    if(messages !== null && messages !== undefined){
        console.log(messages);
        const [messageStyle, setMessageStyle] = useState({});
        const [isNavBottomSeen, setIsNavBottomSeen] = useState(false);

        window.addEventListener('scroll', ()=> {
            setIsNavBottomSeen(window.scrollY > document.querySelector('nav').offsetHeight);

        })
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
            <div className="messages" style={messageStyle}>
                {
                    messages.map((message, i) => <div key={i}>{message}</div>)
                }
            </div>
        )
    }
    else {
        return null;
    }
}
export default Messages;