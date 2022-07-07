import React from 'react'
import { vendorAtom } from '../App';

function Home() {
  console.log(vendorAtom)
  return (
    <div>
      This is home
      {vendorAtom ? <p>Hi!</p> : null}
    </div>
  )
}

export default Home
