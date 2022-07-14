import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );
 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

const User_SignUp = () => {
  // SET STATES
  const [usersData, setUsersData] = useState([]);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [uniqueEmail, setUniqueEmail] = useState(true);
  const [submit, setSubmit] = useState({
    email: "",
    password: "",
  });

  // HOOKS
  const navigate = useNavigate();

  // Draw all USERS DATA for email check
  useEffect(() => {
    axios
      .get("/api/user/signingup")
      .then(function (response) {
        setUsersData(response);
        console.log("response",response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  const emailCheck = (email) => {
    const arr = [];
    // if (!usersData) {
    //   return setUniqueEmail(true)
    // }else{
    for (const obj of usersData?.data||[]) {
      if (obj.email === email) {
        arr.push(true);
      }
    }
    return setUniqueEmail(!arr.includes(true));
  }
  // }

  //Submite form to Create NEW USER
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/api/user/", submit)
        .then((response) => console.log(response))
        .then(() => alert("User Created Success!"))
        .then(() => navigate("/user/login"));
    } catch (error) {
      alert(`status: Error, ${error}`);
    }
  };
  //CONTROLLED FORM EMAIL INPUT
  const handleChange_email = (e) => {
    setSubmit({ ...submit, email: e.target.value });
    emailCheck(e.target.value);
  };

  // // CONTROLLED FORM PASSWORD INPUT
  //     const handleChange_password=(e)=>{

  //     }

  // CONTROLLED FORM CONFIRM PASSWORD INPUT
  const handleChange_confirmPassword = (e) => {
    if (e.target.value && e.target.value === submit.password) {
      setPasswordCheck(true)
    } else {
        setPasswordCheck(false)
    }

     if (e.target.value.indexOf(/[w*]/) === -1 && e.target.value !== submit.password) {
      setErrorPasswordMessage("Password does not match");
    } else { setErrorPasswordMessage("")}
  };

  return (
    <div className="logincontainer">
      <div className='form-u'>
      <h2 className="login-title" >Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="username">
          <input
          className='login-input'
            onChange={handleChange_email}
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <span>{submit.email && !uniqueEmail ? "Email taken" : null}</span><br></br>
          </div>
          <div className="password">
          <input
          className='login-input'
            onChange={(e) => setSubmit({ ...submit, password: e.target.value })}
            type="password"
            name="pw"
            id="pw"
            placeholder="password"
          />
          </div>
          <div className="password">
          <input
          className='login-input'
            onChange={handleChange_confirmPassword}
            type="password"
            name="cpw"
            id="cpw"
            placeholder="confirm password"
          />
          </div>
          <div className="login">
          <button className='loginButton' type="submit">Sign Up</button>
          </div>
          <div>
          <span>{ passwordCheck && uniqueEmail && submit.email && submit.password ? <h1>&#x2714;</h1> : null}</span>
          <span>{errorPasswordMessage}</span><br></br>
          
          </div>
      </form>
      </div>
    </div>
  );
};
export default User_SignUp;
