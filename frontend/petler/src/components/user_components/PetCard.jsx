import { useState } from "react"


const PetCard = ({data, toggleForm})=>{
    const [state,setState]=useState(false)
    console.log(data)







    return (
        <div className="petcardactual">
            <div>{data? <h1>{data?.name}</h1>: <div onClick={()=>toggleForm("pet")}>Add Pet</div>}</div>
        </div>
    )
}
export default PetCard