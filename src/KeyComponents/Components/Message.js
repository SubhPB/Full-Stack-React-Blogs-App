' -- Byimaan -- '

import React, { useEffect } from "react";
import '../CssForComponents/message.css';
import useLoader from "../../GlobalStateManagement/CustomHooks/useLoader";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";

export default function MessageContainer(){
    // This will hold the multiple messages inside it and newest at the top
    const [isLoading,startLoading,stopLoading] = useLoader();
    const msgManager = useMessageManager();

    const deleteMsgWhenClick = (id) => {
        /* This function will be passed to the child component if user needs to delete the message. */
        msgManager.deleteGlobalMsg(id);

    };
    

    useEffect(()=> {
        if (isLoading){
            console.log(' -- pushing the messages in the inbox -- ')
            const message = {
                id: Date.now(),
                type: 'success',
                body: 'Your Welcome to the DJANGO Blogs.',
            };
            msgManager.sendGlobalMsg(message)
            
        }

        return () => {

            console.log(" -- cleaning up the inbox -- ")
            msgManager.deleteAllMsgs();
        }
    },[]);

    

    return (
        <div id="message-container">
            {
                msgManager.getGlobalMsgState().hasMessages && msgManager.getGlobalMsgState().messages.slice(1).reverse().map(msg => 
                    <Message key={msg.id} props={msg} deleteMeIfClick={deleteMsgWhenClick}/>
                )
            }
        </div>
    );
};

export function Message({props,deleteMeIfClick}){    

    const color = {
        'danger': 'red',
        'warning': 'orange',
        'success': 'green'
    };

    return(
        <div dataset-id={`${props.id}`} style={{backgroundColor: color[props.type] || 'orange'}} className="message">

            <div className="message-upper-part">
                <h3>Alert!</h3>
                <h3 className="have-pointer-cursor" onClick={() => deleteMeIfClick(props.id)}><i class="ri-close-fill"></i></h3>
            </div>

            <div className="message-body">
                <h4>{props.body}</h4>
            </div>
        </div>
    )
}