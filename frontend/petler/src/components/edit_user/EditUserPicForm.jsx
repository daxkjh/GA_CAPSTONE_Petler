import { useState } from "react"
import axios from "axios"
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../../App";
import { refreshAtom } from "../../App";

const EditUserPicForm = ()=>{
    return(
        <div>
            edit Profile Pic
        </div>
    )
}

export default EditUserPicForm