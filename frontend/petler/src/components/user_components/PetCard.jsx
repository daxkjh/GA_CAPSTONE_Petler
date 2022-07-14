import { useState } from "react"


const PetCard = ({data, toggleForm, setSelectedPet})=>{
    const [state,setState]=useState(true)

  const handleClick = ()=>{
    setSelectedPet(data)
    toggleForm("editpet")
  }


if (data){
    
    const date = new Date(data?.birth)
 const birthday = date.toLocaleDateString('en-SG',{year: "numeric",month:"long", day:"numeric"})
const petSize = { xs :"1 - 5 KG", s : "5 - 10 KG", m : "10 - 20 KG", l : "20 - 40 KG", xl : "40+ KG"  }
   

    return (
        <div onClick={()=>setState(!state)} className="petcardactual whitebackground">
            <div>
                <h1>{data?.name}</h1>

               {state? <img src={data?.image}/> : <div>
                <ul>
                    <li>{data?.breed}</li>
                    <li>{birthday}</li>
                    <li>{petSize[data?.size]}</li>
                    <li>{data?.sterilized? "Sterilized" : "Not Sterilized"}</li>
                </ul>
                <button onClick={handleClick}>Edit Pet</button>
               </div> }
                
            </div>
        </div>
    )
} 




else {
    return(
        <div className="emptyPetCard whitebackground" onClick={()=>toggleForm("createpet")}>
            
            <h1 style={{fontSize:"5rem"}}>&#43;</h1>
            <h1>Add Pet</h1>
            </div>
    )
}
}
export default PetCard