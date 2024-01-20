import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
function Dashboard(){
    // Khởi tạo hook useNavigate từ react-router-dom
    const navigate =useNavigate()
    // State để quản lý việc hiển thị modal đăng nhập
    const [isModalVisible1, setModalVisible1] = useState(false);
    // State để lưu trạng thái xác thực được lấy từ localStorage
    const [authAdmin, setAuthAdmin] = useState(localStorage.getItem("authAdmin"));
    //Hook useEffect để kiểm tra nếu người dùng chưa được xác thực và hiển thị modal đăng nhập
    useEffect(()=>{
      if(!authAdmin){
          setModalVisible1(true)
      }
    },[])
    // hàm hiển thị Thông báo nếu chưa login 
    function renderModalLogin(){
      return(
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
                  You are not logged in. Please Login
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
              <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                      setModalVisible1(false);
                      navigate('/Admin/LoginAdmin')
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
    )
    }
    return(
       <div className="container mb-4">
        <div className="row">
          <div className="col-sm-3 background-container mb-5">
            <Link className="fs-15" to="/Admin/Dashboard/Post"><p>Post Management</p></Link>
            <a data-bs-toggle="collapse" className="mb-3 arrow-link mt-1" data-bs-target="#demo"><p className="no-b-bt">User Management <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
            <div id="demo" className="collapse">
              <ul>
                <li><Link className="fs-14" to="/Admin/Dashboard/UserAccount">User Account</Link></li>
                <li><Link className="fs-14" to="/Admin/Dashboard/UserStatictis">Website Statistic</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {renderModalLogin()}
      </div>
    )
}
export default Dashboard;