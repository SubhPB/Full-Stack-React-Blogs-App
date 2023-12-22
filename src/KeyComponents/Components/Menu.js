' -- Byimaan -- '

import React, { useEffect } from "react";
import '../CssForComponents/menu.css';
import { useAuthManager } from "../../GlobalStateManagement/AuthenticationManagement/AuthManager";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";
import { useRefManager } from "../../GlobalStateManagement/StateManagement/ReferenceManager";
import gsap from "gsap";
import { Link } from "react-router-dom";

const MenuIfAuth = () => {
    // This Menu will be displayed to the Authenticated user
    // Also, this is child component of Menu

    return (
        <div className="menu-urls">
            <div className="settings">
                <h3><Link to="/user/profile/settings" className="no-text-decoration"><i className="ri-settings-5-line"></i> Settings</Link></h3>
            </div>

            <div className="menu-add-post">
                <h3><Link to="/user/profile/blog" className="no-text-decoration"><i className="ri-add-box-line"></i> New blog</Link></h3>
            </div>

            <div  className="menu-profile">
                <h3><Link to="/user/profile" className="no-text-decoration"><i className="ri-arrow-right-up-line"></i> Profile</Link></h3>
            </div>

            <div className="menu-logout">
                <h3><Link to='/user/logout' className="no-text-decoration"><i className="ri-logout-circle-line"></i> Logout</Link></h3>
            </div>

        </div>
    );

};

const MenuIfNotAuth = () => {
    // Menu for the unknown user.
    // This is child component of Menu
    return (
        <div className="menu-urls">
            <div className="settings">
               <h3><Link to="/form/user/login" className="no-text-decoration"><i className="ri-login-box-line"></i> Login</Link></h3>
            </div>

            <div className="menu-profile">
                <h3><Link to="/form/user/signup" className="no-text-decoration"><i className="ri-quill-pen-line"></i> SignUp</Link></h3>
            </div>

        </div>
    );
};

export default function Menu(){

    const useAuth = useAuthManager();
    const useMenu = useMenuManager();
    const refManager = useRefManager();

    // need to fix the menu animation later on

    useEffect(()=>{
        var t1 = gsap.timeline();
        if(useMenu.getMenuState()){
            t1.to(refManager.menuRef.current,{
                left: '0',
                duration: 1,
                ease: 'power4.out'
            })
        } else {
            t1.to(refManager.menuRef.current,{
                left: '-100%',
                duration: 1.1,
                ease: 'power1.inOut'
            })
        }
    },[useMenu.getMenuState()])

    return (
        <div ref={refManager.menuRef} id="menu">
            <div className="menu-cancel-btn">
                <h2 onClick={() => useMenu.closeMenu()} className="cursor"><i className="ri-close-line"></i></h2>
            </div>

            <div className="menu-logo">
                <h2 className="cursor"><i className="ri-copyright-line"></i> Byimaan</h2>
            </div>

            <div className="user-status">
                <img src="https://th.bing.com/th/id/OIP.gRQhv5XC1lBtNmCmgUtx0gHaHa?w=152&h=152&c=7&r=0&o=5&pid=1.7" alt="user-img"/>
                <h1>+</h1>
                <img src="https://th.bing.com/th/id/OIP.Jue398B8Nss4MtCoMEIDZgAAAA?pid=ImgDet&w=207&h=207&c=7" alt="react-img" />
            </div>

            { useAuth.isAuthenticated() ? <MenuIfAuth/> : <MenuIfNotAuth/>}

            <div className="menu-urls" id="second-menu-urls">
                <div className="menu-home">
                    <h3><Link to="/" className="no-text-decoration"><i class="ri-home-2-line"></i> Home</Link></h3>
                </div>

                <div className="menu-trend">
                    <h3><Link to="/" className="no-text-decoration"><i className="ri-fire-fill"></i> Trending blogs</Link></h3>
                </div>
            </div>

            <div className="menu-urls">
                <h3 className="menu-explore"><i className="ri-links-line"></i> Explore</h3>
                <div className="byimaan-github">
                   <h4><i className="ri-github-line"></i><a className='no-text-decoration' href="https://github.com/SubhPB">Github byimaan</a></h4>
                </div>

                <div className="menu-last">

                </div>
            </div>
    </div>
    );
};
