import { useAtom } from 'jotai';
import React from 'react'
import { vendorAtom } from '../App';

function Home() {
  const [vendor, setVendor] = useAtom(vendorAtom);
  console.log("home", vendorAtom)
  return (
    <div>
      This is home
      {/* {vendorAtom ? <p>Hi!</p> : null} */}
    </div>
  )
}

export default Home
