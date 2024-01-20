import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Error";
function ChangePasswordTutor(){
    const navigate = useNavigate();
    const[inputs,setInputs]=useState({
        oldpass:"",
        newpass:"",
        confirmpassword:"",
    })
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const[errors,setErrors]=useState({})
    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs(state=>({...state,[nameInput]:value}))
    }
    let authTutor=localStorage.getItem("authTutor");
    if(authTutor){
        authTutor = JSON.parse(authTutor);
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(inputs.newpass.length <8){
            errorSubmit.newpass ="Please enter a password >8 characters";
            flag= false;
        }
        if(inputs.confirmpassword != inputs.newpass){
          errorSubmit.connfirmpassword ="The password of confirmPassword is not the same as new password";
          flag=false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }else{
            const data={
                role:2,
                id:authTutor.data.auth.id,
                old_password:inputs.oldpass,
                new_password:inputs.newpass
            }
            console.log(data)
            axios.post("http://localhost/projectnew/public/api/password/new",data)
            .then(response=>{
                if(response.data[0]=='success'){
                    setModalVisible(true);
                }else if(response.data[0]=='errors'){
                    setModalVisible1(true)
                }
            })
        }
    }
    function renderModal(){
        return (
            <div>
              {/* Your existing code */}
              {isModalVisible && (
                <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header mb-2">
                      <h4 className="modal-title">
                        Notification
                      </h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body mb-2">
                        You Have Successfully Changed Your Password. Please Log In Again
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            navigate('/memberTutor/LoginTutor');
                            localStorage.clear();
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
                <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible1 ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header mb-2">
                      <h4 className="modal-title">
                        Notification
                      </h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body mb-2">
                        Old password is incorrect, please re-enter
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setModalVisible1(false)
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
        <div id="changePassword">
            <div className="container">
            <div className="row">
                <div className="col-sm-3 background-container mb-5">
                    <Link to="/memberTutor/AppointmentSuccessfully"><p>Appointment successfully</p></Link>
                    <Link to="/memberTutor/AppointmentRefused"><p>Appointment is refused</p></Link>
                    <Link to="/memberTutor/ViewSavePostForTutor" ><p>Post Saved </p></Link>
                    <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                    <div id="demo" className="collapse show">
                        <ul>
                            <li><Link to="/memberTutor/UpdateTutor" className="fs-14">Edit personal information</Link></li>
                            <li><Link to="/memberTutor/ChangePasswordTutor" className="fs-14 red">Change Password</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="changePassword-title">
                        <p>Change the password</p>
                    </div>  
                    <p className="border-bt" />
                <form onSubmit={handleSubmit} className="form-changePassword">
                    <div>
                        <p>Enter your old password <span className="red">*</span></p>
                        <input type="password" required name="oldpass" onChange={handleInput}/>
                    </div>
                    <div>
                        <p>Enter your new password <span className="red">*</span></p>
                        <input type="password" required name="newpass" onChange={handleInput}/>
                    </div>
                    <div>
                        <p>Confirm a new password <span>*</span></p>
                        <input type="password" required name="confirmpassword" onChange={handleInput}/>
                    </div>
                    <div className="center btn-change">
                        <button className="btn btn-success">Change</button>
                    </div>
                    <Error errors={errors}/>
                </form>
                </div>
            </div>
            </div>
            {renderModal()}
            {renderModal1()}
        </div>
    )
}
export default ChangePasswordTutor;