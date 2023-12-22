' -- Byimaan -- '

import React, { createContext, useContext } from "react";
import usePagination from "../CustomHooks/usePagination";
const paginationStateManager = createContext();

export const PaginationManagementProvider = ({children}) => {

    const usePage = usePagination();

    return (
        <paginationStateManager.Provider value={usePage}>
            {children}
        </paginationStateManager.Provider>    
    );
}

export const usePaginationManager = () => {
    return useContext(paginationStateManager);
}