' -- Byimaan -- '

import React from "react";
import '../../UserCss/user_blog.css';
import { useNavigate } from "react-router-dom";
import { useLoadingManager } from "../../../GlobalStateManagement/StateManagement/LoadingManager";
import { useMessageManager } from "../../../GlobalStateManagement/StateManagement/MessageManager";
import { axiosInstance } from "../../../Axios/AxiosInstance";
import { useBlogsManager } from "../../../GlobalStateManagement/StateManagement/BlogsManager";

export default function BlogDelete({blog=null}){

    const navigate = useNavigate();
    const { loadingManager } = useLoadingManager();
    const msgManager = useMessageManager();
    const useBlogs = useBlogsManager().useBlogsHook;


    const scrollUpOrDown = (dist= 0) => {
        window.scrollTo({
            top: dist,
            behavior: 'smooth'
        })
    };

    const cancelMsg = {
        type: 'success',
        body: 'You have discarded the delete request'
    };

    const redirectUser = (msg=cancelMsg) => {
        
        loadingManager.loadingDecoration(1300);
        msgManager.sendGlobalMsg(msg);
        scrollUpOrDown();
        navigate('/user/profile/');

    };

    const handleDelete = () => {

        axiosInstance.delete(`personal/${blog[0]?.id}/blogs/`).then( res => {
            const delMsg  = {
                type: 'success',
                body: 'Your post has been deleted.'
            };
            useBlogs.deleteBlog(blog[0].id);

            redirectUser(delMsg)

        }).catch ( rej => {
            const rejectMsg = {
                type: 'danger',
                body: 'Oops! Server has rejected your request to delete the blog'
            };
            console.log(rej);

            redirectUser(rejectMsg);
        });
    };

    if (!blog){
        return (
            <p>
                No blog Found
            </p>
        )
    };

    return (
        <div className="del-container">
            <div className="del-confirm">
                <div className="del-heading">
                    <h2>Do you really wants to delete this Blog?</h2>
                </div>
                <div className="del-title">
                    <h3>Title - {blog[0].title}</h3>
                </div>
                <div className="del-btns">
                    <button onClick={() => redirectUser()} className="del-btn"><h3><i className="ri-close-line"></i> Cancel</h3>  </button>
                    <button onClick={handleDelete} className="del-btn"> <h3> <i className="ri-delete-bin-7-line"></i> Delete</h3> </button>
                </div>
            </div>
        </div>

    )
}