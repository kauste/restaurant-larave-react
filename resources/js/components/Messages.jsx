import { useContext, useEffect, useState } from "react";
import Contexts from "./Contexts";

function Messages({messages}){
    if(messages !== null && messages !== undefined){
        return (
            <div className="messages">
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