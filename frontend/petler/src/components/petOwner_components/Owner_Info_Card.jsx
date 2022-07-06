const Owner_Info_Card = ({data})=>{
    return (
        <div>
            <h1>{data.email}</h1>
            <h2>{data.password}</h2>
        </div>
    )
}
export default Owner_Info_Card