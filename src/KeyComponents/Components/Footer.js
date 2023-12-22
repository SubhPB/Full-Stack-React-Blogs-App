' -- Byimaan -- '

import React from "react";
import '../CssForComponents/footer.css';

export default function Footer(){
    return (
        <div id="footer">
            {/* <div className="footer-elements"> */}
            <ul>    
                <li> <i style={{color:'teal'}} class="ri-macbook-line"></i> Django</li>
            </ul>    
            <ul>
                <li> <i style={{color:'teal'}} class="ri-reactjs-line"></i> React</li>
            </ul>
            <ul>
                <li><i style={{color:'teal'}} class="ri-code-s-slash-line"></i> Html</li>
            </ul>
            <ul>
                <li><i style={{color:'teal'}}  class="ri-css3-line"></i> Css</li>
            </ul>
            <ul>
                <li><i style={{color:'teal'}} class="ri-braces-fill"></i> API's</li>
            </ul>
            {/* </div> */}
        </div>
    );
}