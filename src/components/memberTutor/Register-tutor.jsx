import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Error from "../Error";
import { useNavigate } from "react-router-dom";
import unidecode from "unidecode";
function RegisterTutor(){
  const navigate = useNavigate();
  const[errors,setErrors]=useState({})
  const[inputs,setInput]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
    checkbox:"",
  })
  const handleInput = (e)=>{
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput(state=>({...state,[nameInput]:value}))
  }
  const handleSubmit= (e)=>{
    e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        
        const isAlpha = /^[a-zA-Z\s]+$/;
        const normalizedInput = unidecode(inputs.username);
        if (!isAlpha.test(normalizedInput)) {
          errorSubmit.username = "Please do not include special characters and numbers";
          flag = false;
        } else if (inputs.username === "") {
          errorSubmit.username = "Please enter name";
          flag = false;
        }

        // gmail
        const isEmailValid = /\S+@\S+\.\S+/;
        if (!isEmailValid.test(inputs.email)) {
          errorSubmit.email = 'Email is not valid. Please include @gmail.com';
          flag = false;
        }else if(inputs.email==""){
            errorSubmit.email = "Please enter email";
            flag = false;
        }
        if(inputs.password==""){
            errorSubmit.password="Please enter password";
            flag = false;
        }else if(inputs.password.length <8){
            errorSubmit.password ="Please enter a password >8 characters";
            flag= false;
        }
        if(inputs.confirmpassword==""){
          errorSubmit.confirmpassword="Please enter confirmPassword";
          flag =false;
        }else if(inputs.confirmpassword != inputs.password){
          errorSubmit.connfirmpassword ="The password of confirmPassword is not the same as password";
          flag=false;
        }
        if(inputs.checkbox==""){
          errorSubmit.checkbox="Please agree to our terms";
          flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
                username:inputs.username,
                email:inputs.email,
                password:inputs.password,
                name:inputs.name,
            }
            var dataTutor={}
            dataTutor = data
            localStorage.setItem("tutor",JSON.stringify(dataTutor))
            navigate('/memberTutor/RegisterProfileTutor')
        }
  }
  return(
      <div id="register-tutor">
        <div className="container">
          <div className="row">
            <div className="register-tutor-background">
              <div className="flex">
                <Link to="/memberTutor/RegisterTutor"><h4 className="background">Tutor</h4></Link>
                <Link to="/memberParents/RegisterParents"><h4>Parents</h4></Link>
              </div>
              <div className="form-register">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor>Username</label>
                      <input type="text" className="input" name="username" onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor>Password</label>
                      <input type="password" className="input" name="password" onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor>Email Address</label>
                      <input type="text" className="input" name="email" onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor>Confirm Password</label>
                      <input type="password" className="input"  name="confirmpassword" onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="flex">
                      <input type="checkbox" className="checkbox" name="checkbox" onChange={handleInput}/>
                      <p>I agree to <span>Tutor Search Term &amp; Conditions</span> and <span>Privacy Policy</span></p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="btn-register">
                      <button className="btn btn-success">Continue</button>
                    </div>
                  </div>
                  <div>
                      <Error errors={errors}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default RegisterTutor;