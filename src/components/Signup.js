import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();  //page not reload
      const {name,email,password}=credentials;
      const response = await fetch("http://localhost:5000/api/auth/createUser",{
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({name,email,password})

        });
        const json = await response.json();
        console.log(json);
          //save the authtoken and redirect
          localStorage.setItem('token',json.authtoken);
          //useHistory Hook for redirect
          navigate("/login");
          props.showAlert("Account Created Sucessfully","success")
  }

  const onChange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value}) //...=spread operator=jo value note object mai hai vo rahe laken jo properties note,....  ka age liki ja rahi hai use override ya fir add karna

  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name="name" aria-describedby="emailHelp" onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
