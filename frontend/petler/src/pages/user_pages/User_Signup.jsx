const axios = require('axios');

const User_SignUp = ()=>{

    


    return(
        <div>
            <h1>User Sign Up Page</h1>
            <form action="post">
                <fieldset>
                    <legend>Sign Up</legend>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="pw">Password</label>
                    <input type="password" name="pw" id="pw" />
                    <label htmlFor="cpw">Confirm Password</label>
                    <input type="password" name="cpw" id="cpw" />
                    <button type="submit">Sign Up</button>
                </fieldset>
            </form>
        </div>
    )
}
export default User_SignUp