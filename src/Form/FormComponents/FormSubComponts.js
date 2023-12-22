import React, { useRef, useEffect } from "react";

export function InputField({data, handleChange,formState}){

    const inputTag = useRef(null);

    const handleInputChange = (e) => {
        handleChange(e.target.name,e.target.value);
    };

    // useEffect(()=> {
    //     if (!formState?.[data.name]){
    //         inputTag.current.value = '';
    //     };
    // })

    return (
        <div className="input-field">
            <h4 className="input-field-heading">{data.heading}</h4>
            <input ref={inputTag} onChange={handleInputChange} id={data.name} name={data.name} placeholder={data.placeholder || null} type="text" required/>
        </div>
    );
};

export function EmailInputField({data, handleChange}){

    const handleInputChange = (e) => {
        handleChange(e.target.name,e.target.value);
    };

    return (
        <div className="input-field">
            <h4 className="input-field-heading">{data.heading}</h4>
            <input onChange={handleInputChange} id={data.name} name={data.name} placeholder={data.placeholder || null} type="email" required/>
        </div>
    );
};

export function ButtonInputField({data}){
  
    return (
        <div className="input-field">
            <button style={{backgroundColor: data.color}} className="submission-btn">{data.textContent}</button>
        </div>
    )
}

export function UrlInputField({data,handleChange}){

    const handleInputChange = (e) => {
        handleChange(e.target.name,e.target.value);
    };

    return (
        <div className="input-field">
            <h4 className="input-field-heading">{data.heading}</h4>
            <input id={data.name} name={data.name} placeholder={data.placeholder || null} onChange={handleInputChange} type="url" />
        </div>
    );
}

export function TextAreaInputField({data,handleChange}){

    const handleInputChange = (e) => {
        handleChange(e.target.name,e.target.value);
    };
    return (

    <div className="input-field">
        <h4 className="input-field-heading">{data.heading}</h4>
        <textarea name={data.name} placeholder={data.placeholder || null} onChange={handleInputChange} required></textarea>
    </div>

    );
}

export function FileInputField({data,handleChange}){

    const headingRef = useRef(null);

    const handleInputChange = (e) => {
        headingRef.current.textContent = '' + e.target.files[0].name;
        headingRef.current.style.color = 'green';
        handleChange(e.target.name,e.target.files[0]);
        console.log(e.target.name)
    };

    const textValue = () => {
        return data?.value ? 'Update Image' : 'Select Image';
    }

    return (
        <div className="input-field">
            <h4 className="input-field-heading" ref={headingRef}> {data.heading}</h4>
            <label for="file-input">
                <button className="select-file-btn" type="button"><h4 className="input-field-heading"> <i className="ri-gallery-line"></i> {textValue} </h4></button>
            </label>
            <input onChange={handleInputChange} type="file" name={data.name} accept="image/*" id="file-input"/>
        </div> 
    );

};

export function SelectInputField({data,handleChange}){

    const handleInputChange = (e) => {
        console.log("what value i gave -> ",e.target.value)
        handleChange(e.target.name,e.target.value);
    };


    return (
        <div className="input-field">
        <h4 className="input-field-heading">{data.heading}</h4>
        <select  id={data.name} name={data.name} onChange={handleInputChange}>
            <option value="published">Publish the blog</option>
            <option value="draft">Save As Draft</option>
        </select>
    </div>
    );
};

export function PasswordInputField({data, handleChange}){
    
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        handleChange(e.target.name,e.target.value);
    };

    const handleClick = () => {
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    };

    return (
        <div className="input-field">

            <h4 className='input-field-heading'>{data.heading}</h4>
            <input id='password' name='password' placeholder={data.placeholder} type="password" ref={inputRef} onChange={handleInputChange} required/>
            <h3 className="eye-icon" onClick={handleClick}><i className="ri-eye-fill"></i></h3>

        </div>
    );
};

