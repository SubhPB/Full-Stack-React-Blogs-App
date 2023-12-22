import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import { useAuthManager } from "../../GlobalStateManagement/AuthenticationManagement/AuthManager";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../../Axios/AxiosInstance";

export default function Logout(){

    const msgManager = useMessageManager();
    const authManager = useAuthManager();
    const {loadingManager} = useLoadingManager();
    const navigate = useNavigate();

    useEffect(()=>{

        const refreshToken = localStorage['refresh_token'];
        const accessToken = localStorage['access_token'];

        if (refreshToken && accessToken){
            axiosInstance.post('user/logout/blacklist/',{
                access: accessToken,
                refresh: refreshToken
            }).then( (res) => {

                console.log("Successfully logged out ", res)
                const msg = {
                    type: 'success',
                    body: 'You are been successfully logged out. Thanks!.'
                };
                msgManager.sendGlobalMsg(msg);

            }) .catch ( (err) => {

                const msg = {
                    type: 'warning',
                    body: 'You are now Logged out'
                };
                msgManager.sendGlobalMsg(msg);
                console.log("Server did not accept the logout request", err)

            })
        };
        loadingManager.loadingDecoration(2300);
        authManager.doLogout();
        navigate('/');

    },[])
}