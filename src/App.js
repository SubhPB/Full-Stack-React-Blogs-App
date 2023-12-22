' -- Byimaan -- '

import './App.css';
import Navbar from './KeyComponents/Components/Navbar';
import Footer from './KeyComponents/Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './KeyComponents/Components/Loader';
import { useLoadingManager } from './GlobalStateManagement/StateManagement/LoadingManager';
import { useEffect } from 'react';
import Test from './KeyComponents/Components/Test';
import MessageContainer from './KeyComponents/Components/Message';
import FormUrl from './Form/FormUrl';
import Menu from './KeyComponents/Components/Menu';
import GeneralBlogs from './Blogs/BlogComponents/GeneralBlogs';
import { useRefManager } from './GlobalStateManagement/StateManagement/ReferenceManager';
import User from './User/UserComponents/User';
import { useAuthManager } from './GlobalStateManagement/AuthenticationManagement/AuthManager';
import { useMenuManager } from './GlobalStateManagement/StateManagement/MenuManager';
import { useBlogsManager } from './GlobalStateManagement/StateManagement/BlogsManager';
import BlogView from './User/UserComponents/UserBlog/BlogView';
import SearchedBlogs from './Blogs/BlogComponents/SearchedBlogs';

/* 
            ------------------- Important! -------------------
            Please check out the index.js before reading app.js
*/

function App() {

  const {loadingManager} = useLoadingManager();
  const authManager = useAuthManager();
  const useMenu = useMenuManager();

  // this will work if user wants to view the blog on full screen
  const useViewBlog = useBlogsManager().useViewBlog;
  

  useEffect(()=>{

    // Closing menu in the case if left open
    useMenu.closeMenu();

    // we want to run the loading animation just for 3.5 seconds during mounting
    loadingManager.loadingDecoration(3500);

  },[authManager.isAuthenticated()]);

  return(
    <RootApplication>

      <BrowserRouter>
        
        <MessageContainer/>

        {loadingManager.isLoading && <Loader/>}

        <Navbar/>

        <Menu/>

        { useViewBlog.getIfHaveBlog() && <BlogView/>}

          <Routes>

             <Route path='/' element={<GeneralBlogs/>}></Route>

             <Route path='/search/:data' element={<SearchedBlogs/>}></Route>
             
             {
               authManager.isAuthenticated() && <Route path='/user/*' element={<User/>}></Route>
             }

             <Route path='/test' element={<Test/>}></Route>

             <Route path='/form/*' element={<FormUrl/>}></Route>
          </Routes>
        
        
        <Footer/>

      </BrowserRouter>

    </RootApplication>  
  )
};

export default App;

function RootApplication({children}){

  const refManager = useRefManager();
  const menuManager = useMenuManager();
  const menuRef = refManager.menuRef.current;

  const handleClick = (event) => {

    // Here adding an extra functionality for user experience 
    // If menu is open and user clicked somewhere else we will close the menu
    
    if (menuManager.getMenuState()){
      if (!menuRef.contains(event.target)){
        menuManager.closeMenu();
      }
    };
    return
  };

  return (
    <div ref={refManager.appRef} onClick={handleClick} id="root-application">
      {children}
    </div>
  )
};