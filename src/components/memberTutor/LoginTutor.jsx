import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import Error from "../Error";
function LoginTutor(){
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const[inputs,setInput]=useState({
      email:"",
      password:"",
  })
  const[errors,setErrors]=useState({})
  const handleInput = (e)=>{
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput(state=>({...state,[nameInput]:value}))
  }
  function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(inputs.email==""){
            errorSubmit.email = "Please enter email";
            flag = false;
        }
        if(inputs.password==""){
            errorSubmit.password="Please enter your password";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
                email:inputs.email,
                password:inputs.password
            }
            axios.post("http://localhost/projectnew/public/api/tutor/login",data)
            .then(response=>{
                if(response.data.danger){
                    setModalVisible1(true)
                }else if(response.data.errors){
                    setModalVisible(true)
                }else{
                    var authTutor={}
                    authTutor.data={}
                    // auth.user.auth_token=response.data
                    authTutor.data.auth=response.data.tutor
                    
                    localStorage.setItem("authTutor",JSON.stringify(authTutor))
                    navigate('/');
                    
                }
            })
            .catch(function(error){
                console.log(error)
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
                    Login failed. Incorrect account or password
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
                  <h4 className="modal-title white">
                    Notification
                  </h4>
                </div>
                {/* Modal body */}
                <div className="modal-body mb-2">          
                  Your Account is Under Review
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
        <div id="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="login-background">
                <div className="form-login">
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-sm-12">
                      <div className="center">
                        <h3>Sign In</h3>
                      </div>
                    </div>
                    <div className="col-sm-12 mt-4">
                      <div className="row role">
                        <div className="col-sm-6 ta-end btn-parents mb-4">
                          <Link class="btn ml-5" to="/memberParents/LoginParents"><span>Parents</span></Link>
                          <Link class="btn" to="/memberTutor/LoginTutor"><span className="background">Tutor</span></Link>
                        </div>
                        
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="center">
                        <div>
                          <h6 className="email">Email</h6>
                          <input type="text" name="email" onChange={handleInput} />
                        </div>
                        <div>
                          <h6 className="password">Password</h6>
                          <input type="password" name="password" onChange={handleInput}/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="center btn-login">
                        <button className="btn btn-success">Sign In</button>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="center forgot-password">
                        <Link to="/memberTutor/ForgotPasswordTutor">Forgot password?</Link>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="center sign-up">
                        <p>If you dont have account Tutor ?<Link className="btn btn-outline-success" to="/memberParents/RegisterParents">Sign up</Link></p>
                      </div>
                    </div>
                    <Error errors={errors}/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderModal()}
        {renderModal1()}
      </div>
    )
}
export default LoginTutor;