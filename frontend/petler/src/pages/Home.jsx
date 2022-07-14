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

  return (
    <div className="homecontainer">
      <div className="search">
        <form onSubmit={handleSearch}>
          <input className="searchbox" name="searchbox"></input>
          <button className="searchbutton">search</button>
        </form>
      </div>
      <div
        value="cats"
        onClick={() => handleFilter("cats")}
        className="menusec1"
      >
        <p value="cats">services for cats</p>
        <img src="https://i.imgur.com/zEho2MQ.png?1" width={"90px"} /> 
      </div>
      <div value="dogs" 
      onClick={() => handleFilter("dogs")}
      className="menusec1">
        <p value="dogs">services for dogs</p>
        <img src="https://i.imgur.com/WaxfVbB.png" width={"100px"} /> 
        
      </div>
      <div className="menu">
        <div onClick={() => handleFilter("sitter")}
        className="menusec">
          <p> sitters </p>
        </div>
        <div onClick={() => handleFilter("hotel")} className="menusec">
          <p> hotels </p>
        </div>
        <div onClick={() => handleFilter("groomer")} className="menusec">
          <p> groomers </p>
        </div>
      </div>
      {(allVendors?.data?.length===0)? <h1>No Results Found</h1> : null}
      {allVendors?.data?.map((ele, index) => (
        <div key={index} className="vendorcard">
          <section
            className="vendorsec"
            onClick={() => navigate(`/vendor/profile/${ele?.vendorId}`)}
          >
            <img src={ele.profilePic} width={"150px"}></img>
            <p>{ele.name}</p>
            <p>{ele.intro}</p>
            <p>{ele.type}</p>
          </section>
        </div>
      ))}
      <button className="topbutton" onClick={returnTop}>
        Return to Top
      </button>
    </div>
  );
}

export default Home;
