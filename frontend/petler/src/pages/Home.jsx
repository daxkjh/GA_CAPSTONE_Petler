import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, refreshAtom } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [allVendors, setAllVendors] = useState({});
  const [refresh, setRefresh] = useAtom(refreshAtom);
  // console.log("home", user)

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/vendor")
      .then((res) => {
        setAllVendors(res.data);
      })
      .catch((error) => console.log("error", error));
    setRefresh((prev) => !prev);
  }, []);

  const handleFilter = (type) => {
    console.log(type);
    axios
      .get(`/api/vendor/profile/filter?button=${type}`, {
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
e.preventDefault()
axios.get(`/api/vendor/profile/search?query=${e.target.value}`,{
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
          <input className="searchbox"></input>
          <button className="searchbutton">search</button>
        </form>
      </div>
      <div
        value="cats"
        onClick={() => handleFilter("cats")}
        className="menusec1"
      >
        <p value="cats">services for cats</p>
      </div>
      <div value="dogs" 
      onClick={() => handleFilter("dogs")}
      className="menusec1">
        <p value="dogs">services for dogs</p>
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
