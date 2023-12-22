' -- Byimaan -- '

// https://i.pinimg.com/originals/7e/d6/cb/7ed6cb7b93d7f48fde1daac974bc99e3.jpg
import React, { useEffect, useState } from "react";
import { usePaginationManager } from "../../GlobalStateManagement/StateManagement/PaginationManager";
import UserIntroduce from "./UserIntroduce";
import UserWorkArea from "./UserWorkArea";
import '../UserCss/profile.css';
import { useRefManager } from "../../GlobalStateManagement/StateManagement/ReferenceManager";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import FormManagementProvider from "../../GlobalStateManagement/FormManager/FormStateManager";
import { useBlogsManager } from "../../GlobalStateManagement/StateManagement/BlogsManager";
import { useAuthManager } from "../../GlobalStateManagement/AuthenticationManagement/AuthManager";
import { useNavigate } from "react-router-dom";

export default function Profile(){

    const refManager = useRefManager();
    const usePageManager = usePaginationManager();
    const [data,setData] = useState(null);
    const {loadingManager} = useLoadingManager();
    const msgManager = useMessageManager();
    const authManager = useAuthManager();
    const blogsManager = useBlogsManager();
    const useBlogs = blogsManager.useBlogsHook;
    const navigate = useNavigate();

    useEffect(()=>{

        // Now fetching  the personal blogs of user to display under the UserWorkArea
        loadingManager.startLoading();

        if (!authManager.isAuthenticated() || !localStorage?.getItem('refresh_token')){
            const msg = {
                type: 'warning',
                body: 'It looks like your token for authentication got expired!. Please login.'
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            msgManager.sendGlobalMsgWithTime(msg,10000);

            navigate('/');

            if (authManager.isAuthenticated() && !localStorage?.getItem('refresh_token')){
                // if user is unauthenticated from the backend server but is authenticated from frontend...
                authManager.doLogout();
              }; 
        

            loadingManager.stopLoading(800);
            return
        };

        if (useBlogs.getBlogsType() !== 'personal'){
            console.log(" if executed ")
            blogsManager.getPersonalBlogs().then( res => {
                res.userInfo.blogsLength = res.blogs.length;
                setData(res);
                console.log('The response we are looking for ',res)
            }). catch( rej => {
                if(rej?.frontMsg){
                    msgManager.sendGlobalMsg(rej.frontMsg);
                };
                setData(null)
            });
        } else if ( useBlogs.haveBlogs() && useBlogs.getUserInfo() ){
            console.log('else if executed')
            const userInfo = useBlogs.getUserInfo();
            const blogs = useBlogs.getBlogs();
            userInfo.blogsLength = blogs.length;
            setData({
                userInfo: userInfo,
                blogs: blogs
            });  
        };
        loadingManager.stopLoading(1000);

    },[useBlogs.getBlogs(),authManager.isAuthenticated()])

    
    useEffect(()=>{
        const searchBar = refManager.navbarSearchRef.current;
        const navbar = refManager.navbarRef.current;

        // we do not need search bar in the profile for desiging purposes.
        navbar.removeChild(searchBar);

        // Also rather to display 8 blogs per page will be better to go with 6 blogs per page 
        // because we do not have much space here
        if (usePageManager.getItemsPerPage() !== 6){
            usePageManager.setItemsPerPage(6);
        };

        return () => {
            navbar.appendChild(searchBar);
            usePageManager.resetState(); 
        }
        

    },[]);
    if (data){

        return (
            <div className="profile">
    
                {/* Some part of the personal data will be used by the UserIntroduce like email, total posts etc 'passed through data' as prop*/}
                <UserIntroduce data={data.userInfo}/>

                {/* UserWorkArea will need personal blogs to display to the user which are passed through data as prop*/}
                <FormManagementProvider>

                   <UserWorkArea data={data}/>

                </FormManagementProvider>
                
            </div>
        );
    };
    
};
