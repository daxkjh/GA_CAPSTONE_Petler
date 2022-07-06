import React from 'react'

function SignUp() {

  
  return (
    <div>
     <form>
      <label htmlFor="name">Name</label>
      <input
              required
              name="name"
              type="name"
              placeholder="name"
            />
      <label htmlFor="email">email</label>
      <input
              required
              name="email"
              type="email"
              placeholder="email"
            />
     </form>
     <label htmlFor="password">Password</label>
      <input
              required
              name="password"
              type="password"
              placeholder="password"
            />
    </div>
  )
}

export default SignUp
