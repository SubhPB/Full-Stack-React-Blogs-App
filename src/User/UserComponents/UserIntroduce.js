' -- Byimaan -- '

import React from "react";
import '../UserCss/introduce.css';
import { backendRootUrl } from "../../GlobalVariablesExporter";
import { useNavigate } from "react-router-dom";

export default function UserIntroduce({data}){

    const defaultImg = "https://images.pexels.com/photos/163077/mario-yoschi-figures-funny-163077.jpeg?auto=compress&cs=tinysrgb&w=600";

    const chooseImg = () => {

        if (data.user_image === null || data.user_image == ''){
            return defaultImg
        } else {
            return data.user_image
        }
    };

    return (
        <div className="introduce">
            <UserImage image={chooseImg()}/>
            <UserDetails info={data}/>
            <Counter count={data.blogsLength}/>
        </div>
    );
};

function UserImage({image}){

    const navigate = useNavigate();

    const handleClick = (e) => {

        navigate('/user/profile/settings/img');

    };

    return (
        <div className="user-image">
            <img src={image} alt="user-profile-image" />
            {/* <input id='hiddden-file-input' type="file" name='user_image' accept="image/*" /> */}
            <h2 onClick={handleClick} className="change-image"><i className="ri-image-2-line"></i></h2>
        </div>
    );
};

function Counter({count}){

    return (
        <div className="counter">
            <h2> <i className="ri-pie-chart-line"></i> Total Blogs - <h1> # {count} </h1></h2>
        </div>
    );
};

function UserDetails({info}){

    return (
        <div className="user-details">
            <h2>Email -</h2>
            <h3> <i className="ri-mail-line"></i> {info.email}</h3>
            <br />

            <div className="user-info">
                <h2>Info -</h2>
                <h3 className="purple">Username - </h3>
                <h3><i className="ri-user-6-line"></i> {info.user_name}</h3>
                <h3 className="purple" >Country - </h3> 
                <h3><i className="ri-map-pin-line"></i> Canada</h3>
            </div>

        </div>
    );
}