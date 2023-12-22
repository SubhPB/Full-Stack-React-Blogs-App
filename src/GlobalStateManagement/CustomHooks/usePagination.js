' -- Byimaan -- '

import {useState} from "react";

export default function usePagination(){

    const initialDefaultState = {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 8,  
    };

    const [pageState,setPageState] = useState(initialDefaultState);

    const isValidPage = (pageNumber) => {
        if (pageNumber <= pageState.totalPages && pageNumber >= 1){
            return true;
        };
        return false;
    }; 

    const usePage = {
        isSinglePaged: () => {
            return pageState.totalPages === 1;
        },
        isValidPage: (pageNumber) => {
            return isValidPage(pageNumber)
        },
        getInitialState: () => {
            return pageState
        },
        getCurrentPage: () => {
            return pageState.currentPage;
        },
        getTotalPages: () => {
            return pageState.totalPages;
        },
        getItemsPerPage: () => {
            return pageState.itemsPerPage;
        },
        getWholeState: () => {
            return pageState;
        },
        setCurrentPage: (newPage) => {

            if (!isValidPage(newPage)){
                return;
            };
            setPageState({
                ...pageState,
                currentPage: newPage
            });
        },
        setTotalPages: (howManyPages) => {
            if (howManyPages > 1){
                setPageState({
                    ...pageState,
                    totalPages: howManyPages
                })
            };
        },
        setItemsPerPage: (howManyItems) => {
            if (howManyItems > 1){
                setPageState({
                    ...pageState,
                    itemsPerPage: howManyItems
                })
            }
        },
        // setStrictNoOfItemsPerPage: (howManyItems) =>
        initializeState: (wholeNewState) => {
            setPageState(wholeNewState)
        },
        resetState: () => {
            setPageState(initialDefaultState);
        },
        goToPreviousPage: () => {
            if (isValidPage(pageState.currentPage - 1)){
                setPageState({
                    ...pageState,
                    currentPage: pageState.currentPage - 1
                })
            };
        },
        goToNextPage: () => {
            if (isValidPage(pageState.currentPage + 1)){
                setPageState({
                    ...pageState,
                    currentPage: pageState.currentPage + 1
                })
            };
        },
    };

    return usePage;
}