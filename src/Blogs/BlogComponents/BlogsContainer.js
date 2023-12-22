' -- Byimaan -- '

import React, {useEffect} from "react";
import PaginationBox from "./PaginationBox";
import { usePaginationManager } from "../../GlobalStateManagement/StateManagement/PaginationManager";
import { backendRootUrl } from "../../GlobalVariablesExporter";
import { useNavigate } from "react-router-dom";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import { useBlogsManager } from "../../GlobalStateManagement/StateManagement/BlogsManager";

export default function BlogsContainer({blogs,showCrudBtns}){
    // This Component holds the logic behind rendering blogs and pagination according to the number of blogs.

    const usePageManager = usePaginationManager();

    const stateForPagination = {

        ...usePageManager.getInitialState(),

        // first page will be the default page
        currentPage: 1,

        // calculating how many pages will be there in total
        totalPages: function(){
            if (blogs.length <= usePageManager.getItemsPerPage()){
                return 1;
            };
            return Math.ceil(blogs.length/usePageManager.getItemsPerPage())
        }(),
    };

    useEffect(()=>{
        usePageManager.initializeState(stateForPagination);
    },[])

    const currentPageIndex = usePageManager.getCurrentPage() - 1;
    const itemsPerPage = usePageManager.getItemsPerPage();

    return (
        <>
            <div className="blogs-container">
                { blogs.slice(currentPageIndex*itemsPerPage, currentPageIndex*itemsPerPage + itemsPerPage).map( blog => <BlogCard key={blog.id} blog={blog} showCrudBtns={showCrudBtns}/>)}
            </div>
            {
                // we want to render the pagination box only if there are multiple pages.
                !usePageManager.isSinglePaged() && <PaginationBox/>
            }
        </>
    )
};

function BlogCard({blog,showCrudBtns}){
    // I know for the showCrudBtns we did the prop drilling 2 times deeper. ONly for this case.
    // I thought it will better to do like this because there is not any complex logic here.

    const useViewBlog = useBlogsManager().useViewBlog;
    const defaultImgSrc = 'https://images.pexels.com/photos/161963/chicago-illinois-skyline-skyscrapers-161963.jpeg?auto=compress&cs=tinysrgb&w=600';

    const imgSrc = () => {
        if (blog?.image && blog?.image.length > 10){
            return   showCrudBtns ? backendRootUrl + blog.image : blog.image;
        } else if (blog.image_url){
            return blog.image_url;
        } else {
            return defaultImgSrc;
        }
    };

    const handleView = () => {
        const blogToView = {...blog};

        blogToView.image = imgSrc();
        // this will diplay the blog on full screen.
        useViewBlog.openBlog(blogToView);
    };

    return (
        <div className="blog-card">
            <div onClick={handleView} className="view-blog-btn">
                <i className="ri-eye-line"></i>
            </div>
            <img src={imgSrc()} alt="blog-img" />
            {showCrudBtns && <CrudButtons blog={blog}/>}
            <div className="card-content">
                <p>{blog.title}</p>
            </div>
        </div>
    );
};

function CrudButtons({blog}){
    // This component will be helpful if user want to perform crud operation on blog.

    const navigate = useNavigate();
    const {loadingManager} = useLoadingManager();
    
    const handleEdit = (e) => {
        loadingManager.loadingDecoration(1200);
        navigate(`/user/profile/blog/update/${blog.id}`);
    };

    const handleDelete = () => {
        loadingManager.loadingDecoration(1200);
        navigate(`/user/profile/blog/delete/${blog.id}`);
    };
    
    return (
        <div className="crud-buttons">
            <h3 onClick={handleEdit} className="have-pointer-cursor"><i className="ri-pencil-line"></i></h3>
            <h3 onClick={handleDelete} className="have-pointer-cursor"><i className="ri-delete-bin-line"></i></h3>
        </div>
    );
};