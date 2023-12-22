' -- Byimaan --'

import React, {useRef} from "react";
import '../CssForComponents/navbar.css';
import { useRefManager } from "../../GlobalStateManagement/StateManagement/ReferenceManager";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";
import { useNavigate } from "react-router-dom";

function NavbarSearch(){

    const refManager = useRefManager();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {

        if (inputRef.current.value.trim() == ''){
            return;
        }

        navigate(`/search/${inputRef.current.value}`);
        inputRef.current.value = '';

    };

    return(
        <div ref={refManager.navbarSearchRef} id="navbar-search">
            <input ref={inputRef} type="text" placeholder="search"/>
            <span onClick={handleSearch} ><h3><i className="ri-search-2-line"></i></h3></span>
        </div>
    )
};

function AppLogo(){
    
    const menuManager = useMenuManager();
    
    return (
        <div id="app-logo" className="have-pointer-cursor">
            <h1 onClick={() => menuManager.openMenu()}>
                <span><i className="ri-menu-3-fill"></i></span>
                
                DJANGO BL
                <span><i className="ri-reactjs-line"></i></span>
                GS
                
            </h1>
        </div>
    );
}

export default function Navbar(){

    const refManager = useRefManager();

    return(
        <div ref={refManager.navbarRef} id="navbar">
            <AppLogo/>
            <NavbarSearch/>
        </div>
    );
};

