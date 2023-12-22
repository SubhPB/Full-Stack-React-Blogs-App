' -- Byimaan -- '

import React, {useContext,createContext,useState, useEffect} from "react";

const authStateManager = createContext();

export function AuthManagementProvider({children}){

    // we will implement this idea to test the token from frontend rather to fetch api everytime when the user gets to application
    const tokenExpiryTest = () => {
        // if the refresh token is older than 10 days will return false else return true
        const lastLoginAt = localStorage.getItem('last_logInAt');

        if (lastLoginAt){
            const storedDate = new Date(parseInt(lastLoginAt));

            const timeDifferenceFromNow = Date.now() - storedDate.getTime();

            const differenceInDays = Math.floor( timeDifferenceFromNow / (1000*60*60*24));

            if (differenceInDays <= 10){
                // At Frontend, As default, refresh token will have life span of max 10 days. Can be customized if need!.
                console.log('time difference in days = ' , differenceInDays);
                return true;
            };
            //Cleaning up the localStorage beacuse at this point we are sure that user have the expired token in the storage
            emptyLocalStorage();
        };
        //So if code reach here then user do not have login info.
        return false;
    };

    const initialState = {
        isAuthenticated: tokenExpiryTest()
    };

    const [authState,setAuthState] =  useState(initialState);

    const emptyLocalStorage = () => {
        localStorage.clear();
    };

    const authManager = {

        /* each functionality will be used as method just for consistency */

        getAuthState: () => {return authState},

        isAuthenticated: () => { return authState?.isAuthenticated || false },

        doLogin: (accessToken,refreshToken) => {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token',refreshToken);
            localStorage.setItem('last_logInAt',Date.now());

            setAuthState({
                isAuthenticated: true
            });
        },

        doLogout: () => {

            if(!authState?.isAuthenticated){
                /* Somehow, Suppose in a case if unauthenticated user trying to logout */
                return;
            };

            setAuthState({
                isAuthenticated: false
            });

            emptyLocalStorage();
        },

        refreshAuthentication: () => {
            // this is the best alternative to the useEffect will avoid the unusal rendering.
            setAuthState(initialState);
        }
    };

    return (
        <authStateManager.Provider value={authManager}>
            {children}
        </authStateManager.Provider>
    );
};

export const useAuthManager = () => {
    return useContext(authStateManager);
}