import React from 'react'
import { useAtom } from 'jotai';
// import { vendorAtom } from '../App.jsx';

function Home() {
  // const [vendor, setVendor] = useAtom(vendorAtom);
  console.log("home", vendor)
  
  return (
    <div>
      This is home
      {/* {vendorAtom ? <p>Hi!</p> : null} */}
    </div>
  )
}

export default Home
