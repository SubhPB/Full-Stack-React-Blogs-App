' -- Byimaan -- '

import React from "react";
import { addPostDraftFormStructure } from "../../../GlobalStateManagement/FormManager/AddPostFormStructures";
import DynamicForm from '../../../Form/FormComponents/Form';

export default function BlogAdd(){

    return(
        <DynamicForm formStructure={addPostDraftFormStructure}/>
    );
}