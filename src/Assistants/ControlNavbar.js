' -- Byimaan -- '

import { defaultNavbarImage } from "../static/GetImageUrl";

export default function changeNavbarImage(imgUrl){

    if (typeof(imgUrl) !== 'string'){

        return;
    };

    const changeImage = () =>{

        const navbar = document.getElementById('navbar');
        if (navbar){
            navbar.style.backgroundImage = `url("${imgUrl}")`;
        };

    };
    
    changeImage();
};

export function resetNavbarImage(){
    changeNavbarImage(defaultNavbarImage);
};

export function removeSearchBar(){
    const navbar =  document.getElementById('navbar');
    const searchBar = document.getElementById('navbar-search');
    
    if (searchBar && navbar){
        navbar.removeChild(searchBar);
    };
    return;
} 
