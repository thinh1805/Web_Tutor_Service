import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function ViewDetailProfileTutor(){
    let params = useParams();
    const [getData , setData] = useState("")
    const navigate =useNavigate()
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [authAdmin, setAuthAdmin] = useState(localStorage.getItem("authAdmin"));
    useEffect(()=>{
        if(authAdmin){
            axios.get(`http://localhost/projectnew/public/api/admin/tutor/detail/`+params.id)
            .then(response=>{
              console.log(response)
              setData(response.data.tutor)
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
                    <div>
                        <div className="row ViewDetailProfileTutor">
                            <div className="col-sm-12">
                                <div className="ViewDetailProfileTutor-title">
                                    <p>Profile Tutor</p>
                                </div>
                                <div className="ViewDetailProfileTutor-information">
                                    <p className="mb-0">Personal information</p>
                                </div>
                            </div>
                            <div className="col-sm-8 ViewDetailProfileTutor-detail mt-4">
                                <div>
                                    <p><span className="font-weight">UserName:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.username}</p>
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-weight">Full Name:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-weight">Phone:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-weight">Gender:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.sex}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 mt-4 ViewDetailProfileTutor-detail">
                                <div>
                                    <p><span className="font-weight">Email:</span> </p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.email}</p>
                                    </div>
                                 </div>
                                <div>
                                    <p><span className="font-weight">Birthday:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.birth}</p>
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-weight">Country:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.country}</p>
                                    </div>
                                </div>
                                <div>
                                    <p><span className="font-weight">District:</span></p>
                                    <div className="ViewDetailProfileTutor-background">
                                        <p class="mb-0">{getData.district}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <p><span className="font-weight mb-0">Address:</span></p>
                                <div className="ViewDetailProfileTutor-background-address">
                                    <p className="mb-0">{getData.address}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 ViewDetailProfileTutor-detail mb-4">
                                <div>
                                    <p><span className="font-weight">Yourself Experience And Qualifications:</span></p>
                                    <div className="ViewDetailProfileTutor-background-desc">
                                        <p class="mb-0">{getData.desc}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="ViewDetailProfileTutor-professional mb-4 ">
                                    <p className="mb-0">PROFESSIONAL PROFILE</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 ViewDetailProfileTutor-detail">
                                    <div>
                                        <p><span className="font-weight">Job:</span></p>
                                        <div className="ViewDetailProfileTutor-background">
                                            <p class="mb-0">{getData.role}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p><span className="font-weight">Teaching Level:</span></p>
                                        <div className="ViewDetailProfileTutor-background">
                                            <p class="mb-0">{getData.class}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p><span className="font-weight">Teaching Form:</span></p>
                                        <div className="ViewDetailProfileTutor-background">
                                            <p class="mb-0">{getData.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 ViewDetailProfileTutor-detail">
                                    <div>
                                        <p><span className="font-weight">Cost/Hour: </span></p>
                                        <div className="ViewDetailProfileTutor-background">
                                            <p class="mb-0">{getData.time}k</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p><span className="font-weight">Teaching subject:</span></p>
                                        <div className="ViewDetailProfileTutor-background">
                                            <p class="mb-0">{getData.subject}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 form-class-schedule">
                                <div>
                                    <p><span className="font-weight">Schedule Available:</span></p>
                                    <div className="ViewDetailProfileTutor-background-schedule">
                                        <p class="mb-0">{getData.schedule}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="ViewDetailProfileTutor-confirmation mb-4">
                                    <p className="mb-0">PHOTO CONFIRMING TUTOR INFORMATION</p>
                                </div>
                            </div>
                            <div className="row image mb-4">
                                <div className="col-sm-6 center">
                                    <p className="fs-14">REPRESENTATIVE PHOTO (MUST SHOW FACE, SHOOTED <br/>ALONE)</p>
                                    <img src={"http://localhost/projectnew/public/upload/"+getData.avatar} alt="" />
                                </div>
                                <div className="col-sm-6 center">
                                    <p className="fs-14">STUDENT CARD/DEGREE (ABSOLUTELY CONFIDENTIAL,<br/> NOT DISPLAYED)</p>
                                    <img src={"http://localhost/projectnew/public/upload/"+getData.certificate} alt="" />
                                </div>
                            </div>
                            <div className="col-sm-12 center mt-4">
                                <Link to="/Admin/Dashboard/UserAccount" className="btn btn-success btn-back mb-5">Back</Link>
                            </div>
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
        <div id="ViewDetailProfileTutor">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-10">
                        <div className="mt-5 padding">
                            {fetchData()}
                        </div>
                    </div>
                </div>
            </div>
            {renderModalLogin()}
        </div>
    )
}
export default ViewDetailProfileTutor;