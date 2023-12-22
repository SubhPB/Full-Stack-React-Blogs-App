' -- Byimaan -- '

import {useState} from "react";
import { axiosInstance } from "../../Axios/AxiosInstance";

export default function useBlogsHook(val=[]){

    const initalState = {
        type: 'general',
        blogs: [],
    };

    const [blogs,setblogs] = useState(initalState);

    // userInfo will be initialized when we will fetch the personal blogs
    const [userInfo,setUserInfo] = useState(null);

    const initializeState = (state) => {
        setblogs(state);
    };

    const resetBlogs = () => {
        setblogs(initalState);
    };

    const checkIfKeyExists = (dict,key) => {
        return dict.hasOwnProperty(key);
    };

    const searchBlogs = (typedData) => {

        return new Promise(async (resolve,reject) => {
            try{
                const serverRes = axiosInstance.get('/?search='+typedData);

                const blogs = await serverRes;

                return resolve({
                    data: blogs.data
                });
            } catch (searchErr){
                console.log("Got Error while searching blogs...");
                console.log(searchErr);
                return reject({
                    error: searchErr
                })
            };
        });
    };

    const getBlog = (id) => {
        const blog = blogs.blogs.filter( vlog => vlog.id === id)[0]
        
        if (blog){
            return blog
        };
        return false;
    };

    const getBlogs = () =>{
        return blogs.blogs;
    };

    const getBlogsType = () => {
        return blogs.type
    };

    const addBlog = (newBlog) => {
        setblogs({
            ...blogs,
            blogs: [
                ...blogs.blogs,
                newBlog
            ]
        })
    };

    const deleteBlog = (blogOrId) => {
        let id;

        if (typeof blogOrId === 'number'){
            id = blogOrId;
        } else {
            id = blogOrId?.id;
        };

        if (typeof id !== 'number'){
            return
        };

        const allBlogs = [...blogs.blogs];
        const newBlogs = allBlogs.filter( vlog => vlog?.id !== id);
        setblogs({
            ...blogs,
            blogs: [
                ...newBlogs
            ]
        });
        return newBlogs;
    };

    const updateBlog = (updatedBlog) => {
        const updatedBlogs = blogs.blogs.map( vlog => vlog.id === updateBlog.id ? updatedBlog : vlog)

        setblogs({
            ...blogs,
            blogs: updatedBlogs
        });
    };

    const haveBlogs = () => {
        return blogs.blogs.length !== 0;
    };

    const getUserInfo = () => {
        return userInfo
    };

    const initializeUserInfo = (state) => {
        setUserInfo(state)
    };

    const updateUserInfo = (key,value) => {
        setUserInfo({
            ...userInfo,
            [key]:value
        })
    };

    const getUserInfoField = (key) =>{
        if(checkIfKeyExists(userInfo,key)){
            return userInfo[key]
        }
    }; 

    const useBlogs = {
        initialize: initializeState,
        resetBlogs: resetBlogs,
        searchBlogs: searchBlogs,
        getBlog: getBlog,
        getBlogs: getBlogs,
        getBlogsType: getBlogsType,
        addBlog: addBlog,
        deleteBlog: deleteBlog,
        updateBlog: updateBlog,
        haveBlogs: haveBlogs,
        initializeUserInfo: initializeUserInfo,
        getUserInfo: getUserInfo,
        updateUserInfo: updateUserInfo,
        getUserInfoField: getUserInfoField,
    };
    
    return useBlogs;
}