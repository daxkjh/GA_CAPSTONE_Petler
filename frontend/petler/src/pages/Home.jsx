import { useEffect, useState  } from 'react';
import { useAtom } from 'jotai';
import { userAtom, refreshAtom } from '../App.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [allVendors, setAllVendors] =useState({});
  const [refresh, setRefresh] = useAtom(refreshAtom);
  // console.log("home", user)
  
  const navigate = useNavigate();

 useEffect(()=> {
    axios.get("/api/vendor")
    .then((res) => {
    setAllVendors(res.data)})
    .catch(error => console.log("error", error));
    setRefresh(prev=>!prev);
  }, [])

  
  const handleFilter = (e) => {
    e.preventDefault();
    const type = e.target.getAttribute("value")
    axios.get("/api/vendor/profile/", 
    {
      type: type
    },
    {headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
    .then((res) => {
      setRefresh(!refresh)
      console.log("filtered",res);
      setAllVendors(res.data)
    })
    .catch((error) => console.log(error));
};

   const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className='homecontainer'>
      <div className='search'>
        <form>
          <input className='searchbox' ></input>
          <button className='searchbutton'>search</button>
        </form>
      </div>
      <div value="cats" onClick={handleFilter} className='menusec1'>
        <p value="cats">services for cats</p>
      </div>
      <div className='menusec1'>
        <p>services for dogs</p>
      </div>
      <div className='menu'>
        <div className='menusec'>
          <p> sitters </p>
        </div>
        <div className='menusec'>
          <p> hotels </p>
        </div>
        <div className='menusec'>
          <p> groomers </p>
        </div>
      </div>
      
        {allVendors?.data?.map((ele, index)=> 
        <div key={index} className="vendorcard">
        <section  className='vendorsec' 
        onClick={() => navigate(`/vendor/profile/${ele?.vendorId}`)}>
          <img src={ele.profilePic} width={"150px"}></img>
          <p>{ele.name}</p>
          <p>{ele.intro}</p>
          <p>{ele.type}</p>
        </section>
      </div> )}
      <button className="topbutton" onClick={returnTop}>
        Return to Top
      </button>
    </div>
  )
}

export default Home
