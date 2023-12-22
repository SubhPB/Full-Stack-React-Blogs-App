' -- Byimaan -- '

import {useReducer}from "react";

const initialState = {
    hasMessages: false,
    //  the following default message will never be shown.
    // this has been made just to visualize the structure
    
    messages: [{
        id: 0,
        type: 'success',
        body: ' Your Welcome to the DJANGO BLOGS.'
    }]
};

export function messageReducer(state,action){
    switch (action.type){
        case 'DELETE': 
            return {
                hasMessages: (()=>{
                    if (state.messages.length === 2 && action.id === state.messages[1].id){
                        return false;
                    }
                    return true;
                })(),
                messages: (() => {
                    return state.messages.filter( msg => msg.id !== action.message.id )
                })()
            };
        case 'ADD': 
            return {
                hasMessages: true,
                messages: (() => {
                    return [
                        ...state.messages,
                        action.message
                    ]
                })()
            };
        case 'RESET': 
            return initialState;
        default:
            return state;    
    }
};


export const useMessenger = () => {
    const [messengerState,dispatch] = useReducer(messageReducer,initialState);

    const deleteMessage = (msgId) => {
        dispatch({
            type: 'DELETE',
            message: {
                id: msgId,
            }
        })
    };

    const addMessage = (data,timeSpan=4000) => {

        const msgId = data?.id ?? Date.now();

        dispatch({
            type: 'ADD',
            message: {
                id: msgId,
                type: data.type,
                body: data.body
            }
        });

        if (timeSpan){
            // if timeSpan is set to null then
            // our goal is to display the message without the limitation of time 
            // and only user can delete the message manually.
            let timeOut = setTimeout(()=>{
                deleteMessage(msgId)
            },timeSpan);
        }
    };

    const deleteAllMessages = () => {
        dispatch({
            type:'RESET'
        });
    };

    return [messengerState,addMessage,deleteMessage,deleteAllMessages]
}