' -- Byimaan -- '

import React, { useState, useRef } from "react";
import '../../UserCss/blog_fields.css';
import '../../UserCss/user_blog.css';
import gsap from "gsap";
import {useMessageManager} from '../../../GlobalStateManagement/StateManagement/MessageManager';
import useFormHook from '../../../GlobalStateManagement/CustomHooks/useForm';

export function animate(data){

    const {parent,child,distance,visible,onComplete} = data;
    
    let t1 = gsap.timeline({
        onComplete: onComplete,
    });

    if (!visible){

        t1.to(parent,{
            height: '+='+distance,
            duration: .8,
            ease: 'power2.inOut'
        }).to(child,{
            top: '50%',
            duration: .6,
            ease: 'power2.out'
        });
    } else {
        t1.to(child,{
            top: 0,
            duration: .6,
            ease: 'power2.in'
        }).to(parent,{
            height: '-='+distance,
            duration: .8,
            ease: 'power2.inOut'
        });
    };

};

export default function EditBlogField({value='',name='title',blogId=null}){


    const [formState,useForm] = useFormHook({
        [name]: ''+value
    });

    const [visible, setVisibilty] = useState(false);
    const msgManager = useMessageManager();
    const containerDiv = useRef(null);
    const hiddenDiv = useRef(null);
    const [isAnimating,setIsAnimating] = useState(false);

    const handleChange = (e) => {
        if (name === 'image'){
            useForm.setField(name,e.target.files[0]);
            return;
        }
        useForm.setField(name,e.target.value);
    };
    
    const handleClick = () => {

        if (isAnimating) {
            return;
        } else {
            setIsAnimating(true);
            animate({
                parent: containerDiv.current,
                child: hiddenDiv.current,
                distance: '8vmax',
                visible: visible,
                onComplete: () => {
                    setIsAnimating(false);
                    setVisibilty(!visible);
                }
            });
        };
    };

    const scrollUpOrDown = (dist=0) => {
        window.scrollTo({
            top: dist,
            behavior: 'smooth',
        });
    }

    const handleSubmit = async() => {
        if (value === formState[name]){
            // this means user didn't change the value of field
            const msg = {
                type: 'warning',
                body: 'No Changes found in the value!'
            };
            scrollUpOrDown();
            msgManager.sendGlobalMsg(msg);
            return;
        };

        // to close the blog container calling handleClick
        handleClick();
        if (useForm.filterForm() && blogId){
            const apiInfo = {
                url: `personal/${blogId}/blogs/`,
                method: 'patch'
            };
            scrollUpOrDown();
            try{
                const response = await useForm.submitForm(apiInfo);

                if (response?.frontMsg){
                    msgManager.sendGlobalMsg(response.frontMsg);
                };

                if (response?.[name]){
                    useForm.setField(name,response[name])
                }

            } catch (formErr){
                if(formErr?.frontMsg){
                    msgManager.sendGlobalMsg(formErr.frontMsg);
                }
            }
        }

    };    

    return(
        <div className="blog-container" ref={containerDiv}>
            <div className="blog-field" onClick={handleClick}>
                <h2><i className="ri-tools-line"></i> Edit {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} </h2>
                <h2><i className="ri-edit-box-line"></i></h2>
            </div>
            <div className="blog-patch-field" ref={hiddenDiv}>
               { 
                  (name === 'image')
                    ? <input type="file" className="patch-input" onChange={handleChange} accept="image/*" />
                    : <textarea onChange={handleChange} className="patch-input" type={name === 'image_url' ? 'url' : 'text'} value={formState[name]} />
               } 
               <button onClick={handleSubmit} className="patch-btn"><h2><i className="ri-send-plane-fill"></i></h2></button>
            </div>
        </div>
    )
};

