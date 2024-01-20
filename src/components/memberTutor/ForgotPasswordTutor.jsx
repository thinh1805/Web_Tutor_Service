import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function ForgotPasswordTutor(){
    const[inputs,setInputs]=useState({
        email:"",
    })
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const navigate =useNavigate();
    const[errors,setErrors]=useState({})
    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs(state=>({...state,[nameInput]:value}))
    }
    let authParents=localStorage.getItem("authParents");
    if(authParents){
        authParents = JSON.parse(authParents);
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(!flag){
            setErrors(errorSubmit);
        }else{
            const data={
                email:inputs.email,
                role:2,
            }
            console.log(data)
            axios.post("http://localhost/projectnew/public/api/forgot/password",data)
            .then(response=>{
                if(response.data[0] == 'success'){
                  setModalVisible1(true)
                }else if(response.data[0]=='errors'){
                  setModalVisible(true)
                }
            })
            .catch(errors=>{
              console.log(errors)
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
                  <h4 className="modal-title">
                    Notification
                  </h4>
                </div>
                {/* Modal body */}
                <div className="modal-body mb-2">
                Email address does not exist
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                        setModalVisible(false);
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
                    <h4 className="modal-title">
                      Notification
                    </h4>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body mb-2">
                    New password has been sent to your Email  
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                          setModalVisible1(false);
                          navigate('/memberTutor/LoginTutor');
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
          <div id="forgot-password">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-6">
                  <div className="login-background">
                    <div className="form-forgot-password">
                      <form className="row" onSubmit={handleSubmit}>
                        <div className="col-sm-12">
                          <div className="center">
                            <h3>Forgot Password Tutor</h3>
                            <h6>Enter your email for the verification process</h6>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="center">
                            <div>
                              <h6 className="email">Email</h6>
                              <input type="text" required placeholder="Email account....." name="email" onChange={handleInput}/>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="center btn-forgot-password">
                            <button className="btn btn-success">Forgot Password</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {renderModal()}
                {renderModal1()}
              </div>
            </div>
          </div>
      )
}
export default ForgotPasswordTutor;