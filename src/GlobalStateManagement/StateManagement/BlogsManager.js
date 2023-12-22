' -- Byimaan -- '

import React,{useContext,createContext, useState} from "react";
import useBlogsHook from "../CustomHooks/useBlogs";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useAuthManager } from "../AuthenticationManagement/AuthManager";


const blogsStateManager = createContext();

export function BlogsManagementProvider({children}){
    const useBlogs = useBlogsHook();

    const authManager = useAuthManager();

    // if user request to view any specfic blog on full screen
    const [viewBlog,setViewBlog] = useState(null);

    const useViewBlog = {
        getIfHaveBlog: () =>{
            return viewBlog
        },
        openBlog: (blog) => {
            setViewBlog(blog);
        },
        closeBlog: () => {
            setViewBlog(null)
        }
    };

    const searchBlogs = (typedData) => {
        useBlogs.searchBlogs(typedData).then( res => {
            return res.data; 
        }) .catch ( rej => {
            return rej
        });
    }

    const getPersonalBlogs = async() => {

        if (!authManager.isAuthenticated()){
            return await Promise.reject({
                error: 'Authentication is required to get access to personal blogs.'
            })
        };

        return new Promise(async (resolve,reject) => {
            try{
                const response = await axiosInstance.get('/user/data/');

                console.log("Successfully fetched the personal blogs.");

                const {blogs: userBlogs, ...userData} = response.data;

                const newState = {
                    type: 'personal',
                    blogs: userBlogs
                };

                useBlogs.initialize(newState);
                useBlogs.initializeUserInfo(userData);

                return resolve({
                    blogs: userBlogs,
                    userInfo: userData
                });

            } catch (blogsErr){
                console.log("Data for personal blogs was not fetched.");
                console.log(blogsErr);

                blogsErr.frontMsg ={
                    type: 'danger',
                    body: 'The server rejected the request to get the personal data.'
                };

                return reject({
                    error: blogsErr
                })
            };
        })
    };

    const getGeneralBlogs = async() => {
        return new Promise( async(resolve,reject) => {
            try{
                const response = await axiosInstance.get('');

                console.log("Successfully fetched the general blogs.");
                useBlogs.initialize(response.data.blogs);

                const userBlogs = response.data;

                const newState = {
                    type: 'general',
                    blogs: userBlogs
                };

                useBlogs.initialize(newState);

                return resolve({
                    blogs: userBlogs
                });

            } catch (blogsErr){
                console.log("Data for general blogs was not fetched.");
                console.log(blogsErr);

                blogsErr.frontMsg ={
                    type: 'danger',
                    body: 'The server rejected the request to get the general data.'
                };

                return reject({
                    error: blogsErr
                });
            };
        });
    };

    const blogsManager = {
        useBlogsHook: useBlogs,
        useViewBlog: useViewBlog,
        getPersonalBlogs: getPersonalBlogs,
        getGeneralBlogs: getGeneralBlogs
    };

    return (
        <blogsStateManager.Provider value={blogsManager}>
            {children}
        </blogsStateManager.Provider>
    )
};

export const useBlogsManager = () => {
    return useContext(blogsStateManager);
}