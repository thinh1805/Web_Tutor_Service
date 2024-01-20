import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import Error from "../Error";
function LoginAdmin(){
  // Sử dụng hook để điều hướng trang
  const navigate = useNavigate();
  // State để quản lý hiển thị modal khi đăng nhập không thành công
  const [isModalVisible, setModalVisible] = useState(false);
  // State để lưu trữ thông tin nhập từ người dùng
  const[inputs,setInput]=useState({
      email:"",
      password:"",
  })
  // State để lưu trữ thông báo lỗi khi người dùng nhập thông tin không hợp lệ
  const[errors,setErrors]=useState({})
  useEffect(() => {
    const authParents = localStorage.getItem('authParents');
    const authTutor = localStorage.getItem('authTutor');
    if (authParents || authTutor) {
      // Người dùng đã đăng nhập, chuyển hướng đến trang chính
      navigate('/');
    }
  }, []);
  const handleInput = (e)=>{
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput(state=>({...state,[nameInput]:value}))
  }
  function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        
        if(flag){
            const data={
                email:inputs.email,
                password:inputs.password
            }
            console.log(data)
            axios.post("http://localhost/projectnew/public/api/admin/login",data)
            .then(response=>{
                if(response.data.errors){
                  setModalVisible(true)
                }else{
                  var authAdmin={}
                  authAdmin.data={}
                  // auth.user.auth_token=response.data
                  authAdmin.data.auth=response.data.success
                  localStorage.setItem("authAdmin",JSON.stringify(authAdmin))
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
                      Login failed. Incorrect email or password
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
    return(
        <div id="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="login-background">
                <div className="form-login">
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-sm-12">
                      <div className="center mb-5">
                        <h3>Sign In Admin</h3>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="center">
                        <div>
                          <h6 className="email">Email</h6>
                          <input type="text" required name="email" onChange={handleInput}/>
                        </div>
                        <div>
                          <h6 className="password">Password</h6>
                          <input type="password" required name="password" onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 mb-5">
                      <div className="center btn-login">
                        <button className="btn btn-success">Sign In</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderModal()}
      </div>
    )
}
export default LoginAdmin;