import React from 'react'
import { useAtom } from 'jotai';
import { userAtom } from '../App.jsx';

function Home() {
  const [user, setUser] = useAtom(userAtom);
  console.log("home", user)
  
  return (
    <div>
      This is home
      {/* {vendorAtom ? <p>Hi!</p> : null} */}
    </div>
  )
}

export default Home
