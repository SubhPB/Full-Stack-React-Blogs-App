## DJANGO + REACT FULL STACK APP
#This is the frontend part of the full stack application
## Backend Repository Url -> https://github.com/SubhPB/Full-Stack-Django-Blogs-App

Frontend description -

This project is a comprehensive web application built using React, React Router, and various state management strategies. It demonstrates advanced concepts in React such as context API, hooks, and dynamic form generation, aimed at providing a smooth user experience and efficient state management.

Authentication Management: Utilizes a custom AuthManagementProvider for handling user authentication states.
Global State Management: Implements various context providers like LoadingManagementProvider, MessageManagementProvider, and more for managing global application state.
Dynamic Forms: A flexible form component that adapts to different CRUD operations, enhancing modularity and reusability.
Blog Management: Features a BlogsManagementProvider for handling operations related to blog posts.
Menu and Pagination: Custom providers for managing menu states and pagination features.
Routing: Leverages react-router-dom for navigation and routing across the application.

## Directory Structure -

src/
App.js: Main application component.
index.js: Entry point for React application.
GlobalStateManagement/: Contains all context providers and related logic.
KeyComponents/Components/: Reusable components like Navbar, Footer, Loader, etc.
User/: Components and logic related to user functionalities.
Blogs/: Components and logic for blog functionalities.
Form/: Dynamic form component and related utilities.

The application is structured with multiple context providers wrapped around the main App component in index.js. Each provider handles a specific aspect of the application state. For example, AuthManagementProvider deals with authentication, while LoadingManagementProvider manages loading states.

In App.js, routes are defined using react-router-dom. Components like Navbar, Footer, and Loader are used throughout the application for a consistent user interface.

The DynamicForm component in Form/ is a versatile component that can be adapted for various forms throughout the application. It uses custom hooks and context providers for managing form state and submission logic.
