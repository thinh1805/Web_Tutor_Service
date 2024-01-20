import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
function Post(){
    const [getData , setData] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    const [getId ,setId] =useState("")
    const navigate =useNavigate()
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [authAdmin, setAuthAdmin] = useState(localStorage.getItem("authAdmin"));
    useEffect(()=>{
      if(authAdmin){
        axios.get(`http://localhost/projectnew/public/api/admin/list/blog`)
        .then(response=>{
          setData(response.data.blog)
        })
        .catch(function(error){
          console.log(error)
        })
      }else{
        setModalVisible1(true)
      }
      },[])
    function fetchData(){     
            if(Object.keys(getData).length>0){
                return getData.map((value)=>{
                    return(
                        <div className="col-sm-11 padding">
                            <div className="row Post-content">
                                <div className="col-sm-2 mt-3">
                                    <div className="Post-content-avatar">
                                        <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                                    </div>
                                </div>
                                <div className="col-sm-8 mt-3">
                                        <div className="Post-content-name">
                                        <h5>{value.name}</h5>
                                        </div>
                                        <div className="Post-content-detail">
                                        <div className="Post-content-detail-title">
                                            <p>{value.title}</p>
                                        </div>
                                        <div className="Post-content-detail-subject">
                                            <p>Subject: {value.subject}</p>
                                        </div>
                                        <div className="Post-content-detail-form">
                                            <p>Class: <span>{value.class}</span></p>
                                        </div>
                                        <div className="Post-content-detail-price">
                                            <p>Tuition/ 1 student: <span>{value.price}k</span></p>
                                        </div>
                                        <div className="Post-content-detail-address">
                                            <p>Address: <span>{value.country}, {value.district}</span></p>
                                        </div>
                                        </div>
                                </div>
                                <div className="col-sm-12 mb-3 ml30 mt-3">
                                    <div className="Post-content-detail-content">
                                        <p className="w-90">{value.content}</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                <div className="flex justify-content-end">
                                    <div className="btn-reject">
                                        <button className="btn btn-success" onClick={()=> handleReject(value.id)}>Deny</button>
                                    </div>
                                    <div className="btn-approval">
                                        <button className="btn btn-success"  onClick={()=> acceptBlog(value.id)}>Approval</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
    }
    function acceptBlog(id) {
        axios.get(`http://localhost/projectnew/public/api/admin/accept/blog/${id}`)
          .then(response => {
            setData(data => data.filter(post => post.id !== id));
            setModalVisible2(true)
          })
          .catch(error => {
            console.error(error);
            // Xử lý lỗi nếu có
          });
    }
    function handleReject(id){
        setId(id)
        setModalVisible(true);
    }
    function Reject(id){
        axios.get(`http://localhost/projectnew/public/api/admin/blog/refuse/`+id)
        .then(response => {
          if(response.data.error){
            console.log(response.data.error)
          }else{
            setData(data => data.filter(tutor => tutor.id !== id));
          }
        })
        .catch(error => {
          console.error(error);
          // Xử lý lỗi nếu có
        });
    }
    function renderModal(){
        return(
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
                    Do you want to deny this post?
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        Reject(getId);
                        setModalVisible(false);    
                      }}
                      >
                      Yes
                  </button>
                  <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() => {
                          setModalVisible(false);
                      }}
                      >
                      No
                  </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        )
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
    function renderModal2(){
      return(
        <div>
        {/* Your existing code */}
        {isModalVisible2 && (
          <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible2 ? 'block' : 'none' }}>
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
                The post has been accepted
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
              <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                      setModalVisible2(false);
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
        <div id="Post">
            <div className="container mb-4">
                <div className="row">
                    <div className="col-sm-3 background-container mb-5">
                        <Link className="fs-15 red" to="/Admin/Dashboard/Post"><p>Post Management</p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link mt-1" data-bs-target="#demo"><p className="no-b-bt">User Management <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse">
                        <ul>
                            <li><Link className="fs-14" to="/Admin/Dashboard/UserAccount">User Account</Link></li>
                            <li><Link className="fs-14" to="/Admin/Dashboard/UserStatictis">Account Statistíc</Link></li>
                        </ul>
                        </div>
                    </div>
                <div className="col-sm-9">
                    <div className="Post-title">
                        <p className="mbt-0">Post Management</p>
                    </div>
                    <div className="border-bt" />
                    {fetchData()}
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModalLogin()}
            {renderModal2()}
        </div>
    )
}
export default Post;