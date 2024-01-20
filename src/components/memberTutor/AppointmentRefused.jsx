import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function AppointmentRefused(){
    const [getData , setData] = useState("")
    var authTutor = localStorage.getItem("authTutor")
    const [getHour,setHour]=useState("")
    const [getDay,setDay]=useState("")
    const [getLocation,setLocation]=useState("")
    const [isModalVisible1, setModalVisible1] = useState(false);
    if(authTutor){
        authTutor=JSON.parse(authTutor);
        var id_tutor= authTutor.data.auth.id;
    }
    useEffect(()=>{
        axios.get(`http://localhost/projectnew/public/api/tutor/appoint/refused/`+ id_tutor)
        .then(response=>{
            console.log(response)
          setData(response.data.schedule)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    function fetchData(){
        if(Object.keys(getData).length>0){
            return getData.map((value)=>{
                return(
                    <div className="padding">
                        <div className="row AppointmentRefused-content mb-5">
                            <div className="col-sm-2 mt-3">
                                        <div className="AppointmentRefused-content-avatar">
                                            <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                                        </div>
                            </div>
                            <div className="col-sm-8 mt-3">
                                            <div className="AppointmentRefused-content-name">
                                            <h5>{value.name}</h5>
                                            </div>
                                            <div className="AppointmentRefused-content-detail">
                                            <div className="AppointmentRefused-content-detail-title">
                                                <p>{value.title}</p>
                                            </div>
                                            <div className="AppointmentRefused-content-detail-subject">
                                                <p>Subject: {value.subject}</p>
                                            </div>
                                            <div className="AppointmentRefused-content-detail-form">
                                                <p>Class: <span>{value.class}</span></p>
                                            </div>
                                            <div className="AppointmentRefused-content-detail-price">
                                                <p>Tuition/ 1 student: <span>{value.price}k</span></p>
                                            </div>
                                            <div className="AppointmentRefused-content-detail-address">
                                                <p>Address: <span>{value.country}, {value.district}</span></p>
                                            </div>
                                            </div>
                            </div>      
                            <div className="col-sm-12 ml30 mt-3">
                                <div className="AppointmentRefused-content-detail-content">
                                    <p className="w-90">{value.content}</p>
                                </div>
                            </div>
                            <div className="border-appointment-padding">
                            <div className="border-appointment">
                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-3 mt-2">
                                                <i class="fa-solid fa-circle-xmark"></i>
                                            </div>
                                            <div className="col-sm-9 notification">
                                                <p>Your Appointment Has Been Rejected</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mt-1">
                                        <div className="ta-end btn-container">
                                            <button className="btn btn-success" onClick={()=> renderModal(value.hour,value.day,value.location)}>View Appointment</button>
                                        </div>
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
    function renderModal(hour,day,location){
        setHour(hour)
        setDay(day)
        setLocation(location)
        setModalVisible1(true)
    }
    function renderModalDetailAppointment(){
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
                                        <p><span className="font-weight"><i class="fa-regular fa-clock"></i> Time: </span>{getHour}</p>
                                    </div>
                                    <div>
                                        <p><span className="font-weight"><i class="fa-solid fa-calendar-days"></i> Date: </span>{getDay}</p>
                                    </div>
                                    <div>
                                        <p className="mbt-0"><span className="font-weight"><i class="fa-solid fa-location-dot"></i> Location: </span>{getLocation}</p>
                                    </div>
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
                )  
        
        
    }
    return(
        <div id="AppointmentRefused">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 background-container mb-5">
                        <Link to="/memberTutor/AppointmentSuccessfully"><p>Appointment successfully</p></Link>
                        <Link to="/memberTutor/AppointmentRefused"><p className="red">Appointment is refused</p></Link>
                        <Link to="/memberTutor/ViewSavePostForTutor" ><p>Post Saved </p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse">
                        <ul>
                            <li><Link to="/memberTutor/UpdateTutor" className="fs-14">Edit personal information</Link></li>
                            <li><Link to="/memberTutor/ChangePasswordTutor" className="fs-14">Change Password</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-sm-9 mt-5">
                        {fetchData()}
                        {renderModalDetailAppointment()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppointmentRefused;