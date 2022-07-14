import { useEffect,  useState} from 'react'
import { useParams } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { userAtom, refreshAtom } from '../../App';
import EditVendorPasswordForm from '../../components/edit_vendor/EditVendorPasswordForm';
import { useAtom } from 'jotai';
import BookingForm from '../../components/user_components/BookingForm';

function User_BrowseVendorDetails () {
  const [user, setUser] = useAtom(userAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom)
  const [vendor, setVendor] = useState();
  const [PWChange, setPWChange] = useState(false);
  const [bookingForm, setBookingForm] = useState(false);

    const id = useParams();
  
  useEffect(()=> {
    axios.get(`/api/vendor/profile/${id.id}`)
    .then((res) => setVendor(res.data))
    .catch(error => console.log("error", error));
    // setRefresh(prev=>!prev);
  }, [])
   console.log("vendor detail from BrowseVendorDetails", vendor)

 
  
  return (
    <>
      {bookingForm && <BookingForm vendor={vendor} setBookingForm={setBookingForm} />}
      {PWChange ? <EditVendorPasswordForm PWChange={PWChange} setPWChange={setPWChange} /> : null}
    <div className="v_profile_container">
      <div className='c-left'>
      <div className="vendorinfo">
        <div className="v-left">
        <img src={vendor?.data?.profilePic}
        width={"200px"}></img>
        </div>
        <div className='v-right'>
        <h2>{vendor?.data?.name}</h2>
        <p> service type: {vendor?.data?.type}</p>
        <p> {vendor?.data.address} </p>
        <p> {vendor?.data.phone} </p>
        </div>
        </div>
      <div className='reviews'>
        <h2>reviews on {vendor?.data?.name} </h2>
        <div className="review-card">
          <h3> My cats loved him!</h3>
          <p className='by'>by Michael</p>
        </div>
        <div className="review-card">
          <h3> He is a cat whistler :) </h3>
          <p className='by'> by Melissa</p>
        </div>
      </div>
      </div>
      <div className='c-right'> 
      <div className="managebiz">
        <h2>business information</h2>
        <button onClick={()=> setBookingForm(true)}>book services</button>
        <p>{vendor?.data?.details?.svcdsc}</p>
        <p>accepted pet type: {vendor?.data?.details?.petType}</p>
        <p>operation hours</p>
        <p>{vendor?.data.start}~{vendor?.data.end}</p>
        <ul className='petsize'> accepted pet size: <br />
          <li className='petsize'>
          { vendor?.data?.details?.petSize?.xs && <img src="https://i.imgur.com/tgjlv34.png" width={"80px"} />}
          </li >
          <li className='petsize'>
          { vendor?.data?.details?.petSize?.s && <img src="https://i.imgur.com/EIkUWtP.png" width={"80px"}/>}
          </li>
          <li className='petsize'>
          { vendor?.data?.details?.petSize?.m && <img src="https://i.imgur.com/jCsCsy6.png" width={"80px"} /> }
          </li>
          <li className='petsize'>
          { vendor?.data?.details?.petSize?.l && <img src="https://i.imgur.com/VGd3U5L.png" width={"80px"}/> }
          </li>
          <li className='petsize'>
          { vendor?.data?.details?.petSize?.xl && <img src="https://i.imgur.com/JeZkKL6.png" width={"80px"}/>  }
          </li>
        </ul>
        <p>areas:</p>
        { vendor?.data?.details?.area?.north && <p>north</p> }
        { vendor?.data?.details?.area?.south && <p>south</p> }
        { vendor?.data?.details?.area?.east && <p>east</p> }
        { vendor?.data?.details?.area?.west && <p>west</p> }
        <p>services:</p>
        {vendor?.data?.services?.map((m, index) => 
          <div key={index}> 
            <p className='serviceText'>{m.title}</p>
            <p className='serviceText'>${m.price}</p>
          </div>
        )}
      </div>
      </div>
      
    </div>
    </>
  )
}


export default User_BrowseVendorDetails 
