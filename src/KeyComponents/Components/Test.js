import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import { useNavigate } from "react-router-dom";
export default function Test(){

    const [state,setState] = useState('');
    const navigate = useNavigate();
    const msgManager = useMessageManager();

    // const tokens = {
    //     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNTg1MzQyLCJpYXQiOjE3MDI1MDQ4MTIsImp0aSI6IjgyZmJmMjg0ZTQ5OTQwZWZiOGEzMmFmODUxMTI3MTI4IiwidXNlcl9pZCI6NX0.2AHUv4kYKaQL69Ga0ViblfVxwvuOzoTwSdcKz_fL8DQ",
    //     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjY2ODIwMiwiaWF0IjoxNzAyNTgxODAyLCJqdGkiOiJkODczMGY2ZWZkNWM0YWVjYjEyNDYzOWU2YzBjN2UyMCIsInVzZXJfaWQiOjV9.AvlsQDXmAajK2CfsyhgocWrTUC7huPh8-P7zqTgEi-8"
    // };

    // localStorage['access_token'] = tokens.access;
    // localStorage['refresh_token'] = tokens.refresh;
    // localStorage['last_logInAt'] = Date.now();

    function testApi(){
        axiosInstance.get('/1').then((res)=>{
            // console.log('Successfully fetched the private data ')
            // console.log(res)
            // setState('' + res);
            console.log(" THis is the test response ")

            console.log("Successfully got the response ")

        }) .catch ((err) => {
            // console.log("Got error while fetching the private data")
            // console.log(err);
            // setState('' + err)
            console.log(" This is the test reject state")
            // if (err?.frontendMsg){
            //     navigate('/')
            //     msgManager.sendGlobalMsg(err.frontendMsg);
            //     return
            // }
        })
    }

    useEffect(()=>{
        testApi()
    },[])
    
    

    return(
        <div id="test">
            <h1>This is the test component.</h1>
            <p>{state}</p>
        </div>
    );
}