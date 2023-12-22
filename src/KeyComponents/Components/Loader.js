' -- Byimaan -- '

import React, { useEffect } from "react";
import '../CssForComponents/loader.css';

export default function Loader(){

    useEffect( () => {
        // we do not want that user is scrolling while loader is running.
        // we just want to freeze the scrolling
        document.body.style.overflow = 'hidden';

        return () => {
            // normalizing the scrolling functionality.
            document.body.style.overflow = '';
        }
    },[])

    return (
        <div id="loader">

            <div className="loading-element">

                <h1>Djang</h1>
                <div className="loading-animation"></div>

            </div>
            <div className="loading-element secondary">

                <h1>Bl</h1>
                <div className="loading-animation seconadry"></div>
                <h1>gs</h1>

            </div>

        </div>
    )
};

