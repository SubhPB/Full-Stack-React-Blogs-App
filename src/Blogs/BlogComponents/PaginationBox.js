' -- Byimaan -- '

import React from "react";
import '../BlogCss/pagination.css';
import { usePaginationManager } from "../../GlobalStateManagement/StateManagement/PaginationManager";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";

export default function PaginationBox(){
    // if we reach here, that means there are multiple pages.

    const usePageManager = usePaginationManager();
    const {loadingManager} = useLoadingManager();

    const totalAvailablePages = usePageManager.getTotalPages();
    const currentPage = usePageManager.getCurrentPage();

    const goToOtherPage = (destinationPage) => {

        // We want to scroll to the top before changing the page.
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // For the user experience, loading animation for default timespan
        loadingManager.loadingDecoration();

        // Really important to know that requested new page is valid 
        if (usePageManager.isValidPage(destinationPage)){
            usePageManager.setCurrentPage(destinationPage)
        };
    };
    
    return (
        <div className="pagination-box">
            <FirstPageBox navigatePage={goToOtherPage}/>

            {/* this will be the page before the current page */}
            { usePageManager.isValidPage(currentPage - 1) && <PageNumberBox pageNumber={currentPage - 1} navigatePage={goToOtherPage}/>}

            {/* this is the current page */}
            <CurrentPageBox currentPage={currentPage}/>

            {/* this will be the page after the current page */}
            { usePageManager.isValidPage(currentPage + 1) && <PageNumberBox pageNumber={currentPage + 1} navigatePage={goToOtherPage}/> }
            
            <LastPageBox totalPages={totalAvailablePages} navigatePage={goToOtherPage}/>

            {/* in the case, if user manually want to go some other page */}
            <PageSelector totalPages={totalAvailablePages} navigatePage={goToOtherPage}/>
        </div>
    )
};

function PageNumberBox({pageNumber,navigatePage}){

    const changePage = () => {
        navigatePage(pageNumber);
    };

    return (
        <div onClick={changePage} className="page-box">
            <h2>{ pageNumber }</h2>
        </div>
    )
};

function FirstPageBox({navigatePage}){

    const changePage = () => {
        navigatePage(1);
    }

    return (
        <div onClick={changePage} className="page-box">
            <h2>{'<'} First </h2>
        </div>
    )
};

function LastPageBox({totalPages,navigatePage}){

    const changePage = () => {
        navigatePage(totalPages);
    }
    
    return (
        <div onClick={changePage} className="page-box">
            <h2> Last {'>'} </h2>
        </div>
    )
};

function CurrentPageBox({currentPage}){
    
    return (
        <div className="page-box current">
            <h2>{ currentPage }</h2>
        </div>
    )
};

function PageSelector({totalPages,navigatePage}){
    const changePage = (event) => {
        navigatePage(Number(event.target.value))
    };

    // Giving options to user, if user wants to go to other page manually.
    return (
        <div className="page-box">
            <select onChange={changePage} name="page-options" id="page-options" >
                {
                    (Array.from(Array(totalPages),(v,i) => <option key={i+1} value={i+1}>{i+1}</option>))
                }
            </select>
        </div>
    )
};
  
