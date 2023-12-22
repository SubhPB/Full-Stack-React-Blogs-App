' -- Byimaan -- '

import {useState} from "react";


export default function useLoader(initialState=true){
    const [loadingState,setLoadingState] = useState(initialState);

    const stopLoading = () => {
        setLoadingState(false);
    };

    const startLoading = () => {
        setLoadingState(true);
    };

    return [loadingState,startLoading,stopLoading];
};


