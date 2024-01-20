import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
function PostHistory(){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [getId ,setId] =useState("")
    const [getIdAppointmentRefuse ,setIdAppointmentRefuse] = useState(null)
    const [getIdBlogRefuse ,setIdBlogRefuse] = useState(null)
    const [Appointment , setAppointment] =useState("")
    const [getDetailAppointment , setDetailAppointment] = useState("");
    const [getIdAppointment,setIdAppoinment]= useState("")
    const [getData , setData] = useState("")
    var authParents = localStorage.getItem("authParents")
    if(authParents){
        authParents=JSON.parse(authParents);
        var idParents =authParents.data.auth.id
    }
    useEffect(() => {
        fetchBlogData();
        fetchAppointmentData();
    }, [idParents]);

    // phần fetch bỏ trong useEffect
    function fetchBlogData() {
        axios.get(`http://localhost/projectnew/public/api/member/blog/${idParents}`)
            .then(response => {
                setData(response.data.blog);
            })
            .catch(function(error){
                console.log(error)
            })
    }
    function fetchAppointmentData() {
        axios.get(`http://localhost/projectnew/public/api/member/get/appointment/${idParents}`)
            .then(response => {
                setAppointment(response.data.appointment);
            })
            .catch(function(error){
                console.log(error)
            })
    }
    

    //phần xử lý phần xoá bài đăng đã đăng
    function handleDelete(id){
        setId(id)
        setModalVisible(true);
    }
    function Delete(id){   
        axios.get("http://localhost/projectnew/public/api/member/blog/delete/"+ id)
        .then((response)=>{
          setData(data => data.filter(post => post.id !== id));
        })
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
                    Are you sure to delete the post ?
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        Delete(getId);
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
                      Cancel
                  </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        )
    }

    // phần từ chối đặt lịch hẹn
    function CancelBlog(id_appointment , id_blog){
        const data ={
            id_appoint:id_appointment,
            id_blog:id_blog,
        }
        axios.post("http://localhost/projectnew/public/api/member/appointment/destroy",data)
        .then((response)=>{
            setAppointment(data => data.filter(appointment => appointment.id_appointment !== id_appointment));
        })
    }
    function handleCancel(id_appointment, id_blog){
        if(id_appointment && id_blog){
            setIdAppointmentRefuse(id_appointment)
            setIdBlogRefuse(id_blog)
        }
        
        setModalVisible3(true)
    }
    function renderModalCancel(){
        return(
            <div>
            {/* Your existing code */}
            {isModalVisible3 && (
              <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible3 ? 'block' : 'none' }}>
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
                    Are you sure to refuse ?
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        CancelBlog(getIdAppointmentRefuse,getIdBlogRefuse);
                        setModalVisible3(false);    
                      }}
                      >
                      Yes
                  </button>
                  <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() => {
                          setModalVisible3(false);
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


    // phần chấp nhận lịch hẹn 
    function AcceptAppointment(id_appointment){
        axios.get(`http://localhost/projectnew/public/api/member/appointment/accept/${id_appointment}`)
        .then(response => {
            setModalVisible2(true)
            setAppointment(data => data.filter(appointment => appointment.id_appointment !== id_appointment));
        })
        .catch(function(error){
            console.log(error)
        })
    }
    function renderModalAccept(){
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
                    Accept Successfully
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

    // phần hiển thị chi tiết lịch hẹn 
    function makeAppoinment(id_appointment){
        if(id_appointment){
            axios.get(`http://localhost/projectnew/public/api/member/appointment/detail/${id_appointment}`)
            .then(response => {
                setDetailAppointment(response.data.appointment)
                setModalVisible1(true)
                setIdAppoinment(id_appointment)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
    function renderModalDetailAppointment(){
        if(Object.keys(getDetailAppointment).length>0){
                return(
                        <div>
                            {isModalVisible1 && (
                            <div className="modal modal-notification modal-DetailAppointment mb-4" id="myModal" style={{ display: isModalVisible1 ? 'block' : 'none' }}>
                            <div className="modal-dialog">
                                <div className="modal-content modal-createPost">
                                {/* Modal Header */}
                                <div className="modal-header mb-2">
                                    <h4 className="modal-title">
                                    Appointment Detail
                                    </h4>
                                </div>
                                {/* Modal body */}
                                <div className="modal-body mb-2 start mb-1">
                                    <div>
                                        <p><span className="font-weight"><i class="fa-regular fa-clock"></i> Time: </span>{getDetailAppointment.hour}</p>
                                    </div>
                                    <div>
                                        <p><span className="font-weight"><i class="fa-solid fa-calendar-days"></i> Date: </span>{getDetailAppointment.day}</p>
                                    </div>
                                    <div>
                                        <p className="mbt-0"><span className="font-weight"><i class="fa-solid fa-location-dot"></i> Location: </span>{getDetailAppointment.location}</p>
                                    </div>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success mr-20"
                                    data-bs-dismiss="modal"
                                      onClick={() => {
                                        AcceptAppointment(getIdAppointment)
                                        setModalVisible1(false);    
                                      }}
                                    >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
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
                )  
    }
    }


    // phần hiển thị những bài đăng đã đăng 
    function renderData(){     
            if(Object.keys(getData).length>0){
                return getData.map((value)=>{
                    return(
                        <div className="col-sm-11 padding">
                            <div className="row postHistory-content mb-5">
                                    <div className="col-sm-2 mt-3">
                                        <div className="postHistory-content-avatar">
                                            <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-8 mt-3">
                                            <div className="postHistory-content-name">
                                            <h5>{value.name}</h5>
                                            </div>
                                            <div className="postHistory-content-detail">
                                            <div className="Post-content-detail-title">
                                                <p>{value.title}</p>
                                            </div>
                                            <div className="postHistory-content-detail-subject">
                                                <p>Subject: {value.subject}</p>
                                            </div>
                                            <div className="postHistory-content-detail-form">
                                                <p>Class: <span>{value.class}</span></p>
                                            </div>
                                            <div className="postHistory-content-detail-price">
                                                <p>Tuition/ 1 student: <span>{value.price}k</span></p>
                                            </div>
                                            <div className="postHistory-content-detail-address">
                                                <p>Address: <span>{value.country}, {value.district}</span></p>
                                            </div>
                                            </div>
                                    </div>
                                    <div className="col-sm-2 mt-3">
                                            <div className="dropdown">
                                            <a data-bs-toggle="dropdown">
                                                <i className="fas fa-ellipsis-h" />
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" onClick={()=> handleDelete(value.id)}>Delete</button></li>
                                                <li><Link to={"/memberParents/EditPost/"+ value.id} className="dropdown-item">Edit</Link></li>
                                            </ul>
                                            </div>
                                    </div>
                                    <div className="col-sm-12 ml30 mt-3">
                                            <div className="postHistory-content-detail-content">
                                                <p className="w-90">{value.content}</p>
                                            </div>
                                    </div>
                                {renderModalAppointment(value.id)}
                            </div>
                        </div>
                    )
                })
            }
    }
    

    // phần hiển thị những gia sư đã đặt lịch hẹn tương ứng với mỗi bài đăng
    function renderModalAppointment(id_blog){
        if(Object.keys(Appointment).length>0){
            const appointments = Appointment.filter(appointment=>appointment.id_blog ===id_blog)
                return appointments.map((value)=>{
                    return(
                        <div className="border-appointment-padding">
                            <div className="border-appointment">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="row mt-appointment">
                                            <div className="col-sm-2 img-appointment">
                                                <img src={"http://localhost/projectnew/public/upload/"+ value.avatar} alt="888"></img>
                                            </div>
                                            <div className="col-sm-10 appointment-name">
                                                <p className="mb-0 font-weight">{value.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-4">
                                            <div>
                                                <Link to={"/memberParents/ViewDetailTutor/" + value.id_tutor} className="btn btn-success">View Profile Tutor</Link>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="ta-end btn-container">
                                                <button onClick={()=> handleCancel(value.id_appointment, value.id_blog)} className="btn btn-danger">Deny</button>
                                                <button onClick={()=> makeAppoinment(value.id_appointment)} className="btn btn-success">View Make Appointment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            } 
    }
    return(
        <div id="postHistory">
            <div className="container mb-4">
                <div className="row">
                <div className="col-sm-3 background-container mb-5">
                        <Link to="/memberParents/PostHistory" className="red"><p>Post History </p></Link>
                        <Link to="/memberParents/ViewSaveTutor" href ><p>Tutor Saved </p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse">
                        <ul>
                            <li><Link className="fs-14" to="/memberParents/UpdateMember">Edit personal information</Link></li>
                            <li><Link className="fs-14" to="/memberParents/ChangePassword">Change Password</Link></li>
                        </ul>
                    </div>
                </div>
                    <div className="col-sm-9">
                        <div className="postHistory-title">
                            <p className="mbt-0">Post History</p>
                        </div>
                        <div className="border-bt" />
                        {renderData()}
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModalDetailAppointment()}
            {renderModalAccept()}
            {renderModalCancel()}
        </div>
    )
}
export default PostHistory;