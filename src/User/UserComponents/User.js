' -- Byimaan -- '

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Logout from "./Logout";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";

export default function User(){

    const useMenu = useMenuManager();

    // Making sure to close menu if left open
    useEffect(()=>{
        useMenu.closeMenu();
    },[])
    

    return(
        <Routes>
            <Route path='/profile/*' element={<Profile/>}></Route>

            <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
    )
};
