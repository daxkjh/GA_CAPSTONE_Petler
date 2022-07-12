import { useEffect, useState  } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../App.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [allVendors, setAllVendors] =useState({});
  // console.log("home", user)
  
  const navigate = useNavigate();

 useEffect(()=> {
    axios.get("/api/vendor")
    .then((res) => {/*console.log("れす",res)*/
    setAllVendors(res.data)})
    .catch(error => console.log("error", error));
    // setRefresh(prev=>!prev);
  }, [])
  //  console.log("hey vendors!", allVendors)

   const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className='homecontainer'>
      <div className='SearchBar'>
      <h1>search bar will be here</h1>
      </div>
      <div className='menu'>
        <section className='menusec'>
          <p> sitters </p>
        </section>
        <section className='menusec'>
          <p> hotels </p>
        </section>
        <section className='menusec'>
          <p> groomers </p>
        </section>
      </div>
      <div className="vendorcard">
        {allVendors?.data?.map((ele, index)=> 
        <section key={index} className='vendorsec' 
        onClick={() => navigate(`/vendor/profile/${ele?.vendorId}`)}>
          <img src={ele?.profilePic} width={"150px"}></img>
          <p>{ele?.name}</p>
          <p>{ele?.intro}</p>
          <p>{ele?.type}</p>
        </section>)}
      </div> 
      <button className="topbutton" onClick={returnTop}>
        Return to Top
      </button>
    </div>
  )
}

export default Home
