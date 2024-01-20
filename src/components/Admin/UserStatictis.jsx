import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
function UserStatictis(){
    const [getData , setData] = useState("")
    const navigate =useNavigate()
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [authAdmin, setAuthAdmin] = useState(localStorage.getItem("authAdmin"));
    useEffect(()=>{
        if(authAdmin){
            axios.get(`http://localhost/projectnew/public/api/admin/statistical`)
            .then(response=>{
              setData(response.data)
            })
            .catch(function(error){
              console.log(error)
            })
        }
        else{
            setModalVisible1(true)
        }
      },[])
    function fetchData(){     
        if(Object.keys(getData).length>0){
                return(
                    <div className="statistical padding center mb-5">
                            <div className="total-member border-left border-right">
                                <p><i class="fa-solid fa-chart-simple"></i> Total member</p>
                                <p className="fs-30 font-weight">{getData.member}</p>
                            </div>
                            <div className="total-tutor border-right">
                                <p><i class="fa-solid fa-chart-simple"></i> Total Tutor</p>
                                <p className="fs-30 font-weight">{getData.tutor}</p>
                            </div>
                            <div className="total-post border-right">
                                <p><i class="fa-solid fa-chart-simple"></i> Post</p>
                                <p className="fs-30 font-weight">{getData.blog}</p>
                            </div>
                            <div className="total-post-success border-right">
                                <p><i class="fa-solid fa-chart-simple"></i> Post success</p>
                                <p className="fs-30 font-weight">{getData.blogSuccess}</p>
                            </div>
                            <div className="total-post-absent border-right">
                                <p><i class="fa-solid fa-chart-simple"></i> Post absent</p>
                                <p className="fs-30 font-weight">{getData.blogAbsent}</p>
                            </div>
                    </div>
                )
        }
    }
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
        <div id="UserStatictis">
            <div className="container mb-4">
                <div className="row">
                    <div className="col-sm-3 background-container mb-5">
                        <Link className="fs-15" to="/Admin/Dashboard/Post"><p>Post Management</p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link mt-1" data-bs-target="#demo"><p className="no-b-bt">User Management <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse show">
                        <ul>
                            <li><Link className="fs-14" to="/Admin/Dashboard/UserAccount">User Account</Link></li>
                            <li><Link className="fs-14 red" to="/Admin/Dashboard/UserStatictis">Website Statistic</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-sm-9 height">
                        <div className="WebsiteStatictis-title">
                        <p className="mbt-0">Website statistics</p>
                        </div>
                        <div className="border-bt mb-4" />
                        <div className="center mb-5 statictis">Statictis</div>
                        {fetchData()}
                        
                    </div>
                </div>
            </div>
            {renderModalLogin()}
        </div>
    )
}
export default UserStatictis;