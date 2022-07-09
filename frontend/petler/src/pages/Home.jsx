import React from 'react'
import { useAtom } from 'jotai';
import { userAtom } from '../App.jsx';
import { vendorAtom } from './vendor_pages/VendorLogin'

function Home() {
  const [user, setUser] = useAtom(userAtom);
  console.log("home", user.data)
  
  return (
    <div>
      This is home
      {/* {vendorAtom ? <p>Hi!</p> : null} */}
    </div>
  )
}

export default Home
