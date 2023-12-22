' -- Byimaan --'

import React,{createContext, useContext} from "react";
import useLoader from "../CustomHooks/useLoader";

const loadingStateManager = createContext();

export const LoadingManagementProvider = ({children}) => {
    // Most of the methods are easy to understand just by their name.

    const [loadingState,startLoading,stopLoading] = useLoader(true);

    const loadingManager = {
        isLoading: loadingState,
        startLoading: () => {
            startLoading();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        stopLoading: (timeInMilliSec=3500) => {
            const timeOut = setTimeout(()=>{
                stopLoading();
            },timeInMilliSec)
        },
        loadingDecoration: (timeInMilliSec=900) => {
            // this method can be used to enchance the user experience. When you do not really need the loading.
            // But you can still run the loading just to make the user feel like something is happening at the back
            startLoading();
            const timeOut = setTimeout(() => {
                stopLoading();
            },timeInMilliSec)
        }
    };

    return (
        <loadingStateManager.Provider value={{loadingManager}}>
            {children}
        </loadingStateManager.Provider>
    )
};

export const useLoadingManager = () => {
    return useContext(loadingStateManager)
};
