' -- Byimaan -- '

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingManagementProvider } from './GlobalStateManagement/StateManagement/LoadingManager';
import {MessageManagementProvider} from './GlobalStateManagement/StateManagement/MessageManager';
import { AuthManagementProvider } from './GlobalStateManagement/AuthenticationManagement/AuthManager';
import { ReferenceManagementProvider } from './GlobalStateManagement/StateManagement/ReferenceManager';
import { PaginationManagementProvider } from './GlobalStateManagement/StateManagement/PaginationManager';
import { MenuManagementProvider } from './GlobalStateManagement/StateManagement/MenuManager';
import { BlogsManagementProvider } from './GlobalStateManagement/StateManagement/BlogsManager';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
  'Message' from byimaan (Subhpreet) ->
  I tried to make it simple as much i can.
  You can get the idea for each functionality just by their name.
  Some providers are interlinked with the custom hooks.
  I did my best to take it to the next level work.
*/

root.render(
  <React.StrictMode>

    <AuthManagementProvider>   

      <ReferenceManagementProvider>
    
        <LoadingManagementProvider>
        
            <MessageManagementProvider>
              
              <BlogsManagementProvider>
                
                <MenuManagementProvider>

                  <PaginationManagementProvider>

                    <App />

                  </PaginationManagementProvider>

                </MenuManagementProvider>

              </BlogsManagementProvider>

            </MessageManagementProvider>
          
        </LoadingManagementProvider>

      </ReferenceManagementProvider>

    </AuthManagementProvider>

  </React.StrictMode>
  
);

reportWebVitals();
