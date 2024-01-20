import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Country from "../Country";
import District from "../District";
import Error from "../Error";
import { useNavigate } from "react-router-dom";
import unidecode from "unidecode";
function RegisterParents(){
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistrict ,setSelectedDistrict] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);

    const navigate = useNavigate();

    const handleCountrySelect = (countryId) => {
      setSelectedCountry(countryId);
    };
    const handleDistrictSelect = (districtId)=>{
      setSelectedDistrict(districtId)
    }

    const[inputs,setInput]=useState({
      name:"",
      email:"",
      password:"",
      confirmpassword:"",
      phone:"",
      address:"",
    })
    
    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      
      setInput(state=>({...state,[nameInput]:value}))
    }
    
    const[errors,setErrors]=useState({})
    const handleSubmit =(e) =>{
      e.preventDefault();
        let errorSubmit = {};
        let flag=true;

        //full name
        const isAlpha = /^[a-zA-Z\s]+$/;
        const normalizedInput = unidecode(inputs.name);
        if (!isAlpha.test(normalizedInput)) {
          errorSubmit.name = "Please do not include special characters and numbers";
          flag = false;
        } else if (inputs.name === "") {
          errorSubmit.name = "Please enter name";
          flag = false;
        }

        //email
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

        if(inputs.phone==""){
            errorSubmit.phone="Please enter the phone number";
            flag = false;
        }else if(inputs.phone.length != 10){
            errorSubmit.phone ="Incorrect telephone number";
            flag= false;
        }
        if(inputs.address==""){
            errorSubmit.address="Please enter your address";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
                name:inputs.name,
                email:inputs.email,
                password:inputs.password,
                phone:inputs.phone,
                address:inputs.address,
                id_country:selectedCountry,
                id_district:selectedDistrict,
                level:0
            }
            axios.post("http://localhost/projectnew/public/api/member/register",data)
            .then(response=>{
                if(response.data.errors){
                  setModalVisible1(true)
                }else{
                  setModalVisible(true);
                }
            })
            .catch(function(error){
                console.log(error)
                alert("error")
            })
        }
    }
    function renderModal(){
      return (
          <div>
            {/* Your existing code */}
            {isModalVisible && (
              <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
              <div className="modal-dialog">
                <div className="modal-content modal-createPost">
                  {/* Modal Header */}
                  <div className="modal-header mb-2">
                    <h4 className="modal-title white">
                      Notification
                    </h4>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body mb-2">
                    You Have Successfully Registered, Please Log In
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                          setModalVisible(false);
                          navigate('/memberParents/LoginParents');
                      }}
                      >
                      Close
                  </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
      );
    }
    function renderModal1(){
      return (
          <div>
            {/* Your existing code */}
            {isModalVisible1 && (
              <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible1 ? 'block' : 'none' }}>
              <div className="modal-dialog">
                <div className="modal-content modal-createPost">
                  {/* Modal Header */}
                  <div className="modal-header mb-2">
                    <h4 className="modal-title white">
                      Notification
                    </h4>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body mb-2">
                    Account already exists
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                          setModalVisible1(false);
                      }}
                      >
                      Close
                  </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
      );
    }
    return(
      <div id="register-parent">
        <div className="container">
          <div className="row">
            <div className="register-parent-background">
              <div className="flex">
                <Link to="/memberTutor/RegisterTutor"><h4>Tutor</h4></Link>
                <Link to="/memberParents/RegisterParents"><h4 className="background">Parents</h4></Link>
              </div>
              <div className="form-register">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor>FULL NAME <span class="red">*</span></label>
                      <input type="text" required name="name" onChange={handleInput} />
                    </div>
                    <div>
                      <label htmlFor>PASSWORD <span class="red">*</span></label>
                      <input type="password" required name="password" onChange={handleInput} />
                    </div>
                    <div>
                      <label htmlFor>PHONE NUMBER <span class="red">*</span></label>
                      <input type="text" required name="phone" onChange={handleInput} 
                      onKeyPress={(e) => {
                      // Allow only numeric characters
                        const isNumeric = /^[0-9]*$/;
                        if (!isNumeric.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      />
                    </div>
                    <div>
                        <p class="mbt-0 opacity">DISTRICT <span class="red">*</span></p>
                        <District selectedCountry={selectedCountry} selectedDistrict={handleDistrictSelect}/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor>EMAIL ADDRESS <span class="red">*</span></label>
                      <input type="text" required name="email" onChange={handleInput}/>
                    </div>
                    <div>
                      <label htmlFor>CONFIRM PASSWORD <span class="red">*</span></label>
                      <input type="password" required name="confirmpassword" onChange={handleInput} />
                    </div>
                    <div>
                        <label htmlFor>PROVINCE/CITY <span class="red">*</span></label>
                        <Country onSelectCountry={handleCountrySelect}/>
                    </div>
                    <div>
                      <label htmlFor>ADDRESS <span class="red">*</span></label>
                      <input type="text" required name="address" onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="btn-register">
                      <button className="btn btn-success">REGISTER</button>
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
        {renderModal()}
        {renderModal1()}
      </div>
    )
}
export default RegisterParents;