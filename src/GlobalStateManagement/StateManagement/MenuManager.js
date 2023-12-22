' -- Byimaan -- '

import React, {createContext, useContext, useState} from "react"

const menuStateManager = createContext();

export function MenuManagementProvider({children}){

    const [menuState,setMenuState] = useState(false);

    const useMenu = {

        getMenuState: () => {
            return menuState;
        },
        openMenu: () => {
            setMenuState(true);
        },
        closeMenu: () => {
            setMenuState(false);
        },
        toggleMenu: () => {
            setMenuState(!menuState);
        }

    };

    return (
        <menuStateManager.Provider value={useMenu}>
            {children}
        </menuStateManager.Provider>
    );
};

export const useMenuManager = () => {
    return useContext(menuStateManager);
}