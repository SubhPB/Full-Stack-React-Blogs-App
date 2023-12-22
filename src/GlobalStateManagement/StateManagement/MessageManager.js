' -- Byimaan -- '

import React,{createContext,useContext} from "react";
import { useMessenger } from "../CustomHooks/useMessage";

const messageStateManager = createContext();

export function MessageManagementProvider({children}){
    
    const [msgGlobalState,addMessage,deleteMessage,deleteAllMessages] = useMessenger();

    const sendGlobalMsg = (msg) => {
        /* To send the message with default timespan of 4 seconds */
        addMessage(msg);
    };

    const deleteGlobalMsg = (msgId) => {
        /* As simple as it's name to delete the message */
        deleteMessage(msgId);
    };

    const sendGlobalMsgWithTime = (msg,timeInNanoSecs) => {
        /* For the desired timespan of message unless user manually delete the message */
        addMessage(msg,timeInNanoSecs);
    };

    const sendGlobalMsgForever = (msg) => {
        /* In this case only user can manually delete the message. */
        addMessage(msg,null)
    };

    const messageManager = {
        /* Making things simple with encapsulation. */
        /* we will treat each of them as method just to be consistent. */

        getGlobalMsgState: () => {return msgGlobalState},

        sendGlobalMsg: (msg) => sendGlobalMsg(msg),

        sendGlobalMsgWithTime: (msg,time) => sendGlobalMsgWithTime(msg,time),

        sendGlobalMsgForever: (msg) => sendGlobalMsgForever(msg),

        deleteGlobalMsg: (msgId) => deleteGlobalMsg(msgId),

        deleteAllMsgs: () => deleteAllMessages(),
    };

    return (
        <messageStateManager.Provider value={messageManager}>
            {children}
        </messageStateManager.Provider>
    );
};

export const useMessageManager = () => {
    return useContext(messageStateManager);
};