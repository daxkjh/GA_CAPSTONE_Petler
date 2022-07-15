import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, refreshAtom } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://petlers.herokuapp.com/"
    : "http://localhost:3000";

function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [allVendors, setAllVendors] = useState({});
  const [refresh, setRefresh] = useAtom(refreshAtom);
  // console.log("home", user)

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/vendor`)
      .then((res) => {
        setAllVendors(res.data);
      })
      .catch((error) => console.log("error", error));
    setRefresh((prev) => !prev);
  }, []);

  const handleFilter = (type) => {
    console.log(type);
    axios
      .get(`${API_URL}/api/vendor/profile/filter?button=${type}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setRefresh(!refresh);
        setAllVendors(res.data);
        console.log("filtered", res);
      })
      .catch((error) => console.log(error));
  };

const handleSearch = (e)=>{
  console.log("SEARCHTERM : ",e.target.elements.searchbox.value)
e.preventDefault()
axios.get(`${API_URL}/api/vendor/profile/search?searchbox=${e.target.elements.searchbox.value}`,{
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
}).then((res) => {
  setRefresh(!refresh);
  setAllVendors(res.data);
  console.log("search", res);
})
.catch((error) => console.log(error));
}

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
console.log(allVendors)
  return (
    <div className="homecontainer">
      <div  className="search">
        <form  onSubmit={handleSearch}>
          <input className="searchbox" name="searchbox"></input>
          <button style={{verticalAlign:"top"}} className="searchbutton">search</button>
        </form>
      </div>
      <div className="catsanddogs">
      <div 
       style={{borderColor:"steelblue",borderStyle:"double", borderWidth:"0.4rem"}}
        className="menusec"
        onClick={() => handleFilter("cats")}
      >
        <p value="cats">services for cats</p>
        <img style={{marginTop:"-15px"}} src="https://i.imgur.com/zEho2MQ.png?1" width={"90px"} /> 
      </div>
      <div 
      style={{borderColor:"gold",borderStyle:"double", borderWidth:"0.4rem"}}
      className="menusec"
      onClick={() => handleFilter("dogs")}
      >
        <p value="dogs">services for dogs</p>
        <img src="https://i.imgur.com/WaxfVbB.png" width={"90px"} /> 
      </div>
      </div>
      <div className="menu">
        <div style={{borderColor:"Crimson",borderStyle:"double", borderWidth:"0.4rem"}} onClick={() => handleFilter("sitter")}
        className="menusec">
          <p> sitters </p>
          <img src="https://illust-imt.jp/archives/004613.smpl.png" width={"80px"} style={{marginTop:"-19px"}} />
        </div>
        <div style={{borderWidth:"0.4rem", borderStyle:"double"}} onClick={() => handleFilter("hotel")} className="menusec"> 
          <p> hotels </p>
          <img src="https://thumb.ac-illust.com/b5/b5f93587cefde4c5155384ad89542bdd_t.jpeg" width={"80px"} style={{marginTop:"0px"}} />
        </div>
        <div style={{borderColor:"Orchid",borderWidth:"0.4rem",borderStyle:"double"}} onClick={() => handleFilter("groomer")} className="menusec">
          <p> groomers </p>
          <img src="https://thumb.ac-illust.com/b3/b321746fd793b966ef4d0e99ba559f69_t.jpeg" width={"90px"} style={{marginTop:"-15px"}} />
        </div>
      </div>
      {(allVendors?.data?.length===0)? <h1>No Results Found</h1> : null}
      {allVendors?.data?.map((ele, index) => (
        <div key={index} className="vendorcard" onClick={() => navigate(`/vendor/profile/${ele?.vendorId}`)} >
          <div className="vendorcard-left">
            <img src={ele?.profilePic} width={"150px"}></img>
            </div>
            <div className="vendorcard-right">
              <h2>{ele?.name}</h2>
            <p>service type: {ele?.type}</p>
            {/* <p>for: {ele?.details?.petType}</p> */}
            <p>{ele?.intro}</p>
            <p></p>
            <p></p>
          </div>
        </div>
      ))}
      <button className="topbutton" onClick={returnTop}>
        Return to Top
      </button>
    </div>
  );
}

export default Home;
