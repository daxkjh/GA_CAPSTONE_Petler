import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";
import StyledDropzone from "../uploader/StyledDropzone";

const EditUserPicForm = ()=>{
    return(
        <div>
            <StyledDropzone />
        </div>
    )
}

export default EditUserPicForm