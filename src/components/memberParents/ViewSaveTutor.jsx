import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
function ViewSaveTutor(){
    var authParents = localStorage.getItem("authParents")
    const [isModalVisible, setModalVisible] = useState(false);
    const [getId ,setId] =useState("")
    if(authParents){
        authParents=JSON.parse(authParents);
        var idParents =authParents.data.auth.id
        var active = authParents.data.auth.active
    }
    const [getData , setData] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost/projectnew/public/api/member/get/list/wish/${idParents}`)
        .then(response=>{
          console.log(response)
          setData(response.data.listutor)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    function renderStar(average_rate){
      if(active == 1){
        return(
          <StarRatings
              rating ={average_rate}// Điểm trung bình từ API
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="10px"
              />
        )
      }
    }
    function fetchData(){
      if(Object.keys(getData).length>0){
        return getData.map((value)=>{
          console.log(value)
            return(
              <div className="box-content mb-5">
                <div className="row">
                  <div className="col-sm-11 box-content-info">
                    <div className="box-content-info-left">
                      <img src={"http://localhost/projectnew/public/upload/"+value.avatar} alt="" />
                      <p>{value.name}</p>
                    </div>
                  </div>
                  <div className="col-sm-1 mt-3 mr-5">
                    <div className="dropdown">
                      <a data-bs-toggle="dropdown">
                        <i className="fas fa-ellipsis-h"/>
                      </a>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={()=> handleDelete(value.id)}>Delete</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row detail">
                  <div className="col-sm-8 detail-info">
                    <p>{value.desc}</p>
                  </div>
                  <div className="col-sm-4 detail-subject">
                    <div className="rate mb-2">
                      {renderStar(value.average_rate)}
                    </div>
                    <div className="subject mb-2">
                      <i className="fa-solid fa-book" />{value.subject}
                    </div>
                    <div className="price mb-2">
                      <i className="fa-solid fa-dollar-sign" />{value.time}k/student/hour
                    </div>
                    <div className="location">
                      <i className="fa-solid fa-location-dot" />{value.district},{value.country} City
                    </div>
                    <div className="btn-view-container center">
                      <Link to={"/memberParents/ViewDetailTutor/" + value.id_tutor} className="btn btn-success btn-view-detail mb-2 pl-50 pr-50">View Profile</Link>
                    </div>
                    <div className="btn-appointment center">
                      <button className="btn btn-success">Make An Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            )
        })
      }else{
        return(
          <div class="no-search mt-5">
            <p class="center font-weight">No Tutor saved</p>
          </div>
        )
      }
    }
    function handleDelete(id_whislist){
      setId(id_whislist)
      setModalVisible(true);
    }
    function Delete(id_whislist){   
        axios.get("http://localhost/projectnew/public/api/member/delete/wish/"+ id_whislist)
        .then((response)=>{
          setData(data => data.filter(tutor => tutor.id !== id_whislist));
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
                  Do you want to delete the saved Tutor?
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
    return(
      <div id="saveTutor">
        <div className="container mb-4">
          <div className="row">
          <div className="col-sm-3 background-container">
                    <Link to="/memberParents/PostHistory" ><p>Post History </p></Link>
                    <Link to="/memberParents/ViewSaveTutor" className="red"><p>Tutor Saved </p></Link>
                    <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                    <div id="demo" className="collapse">
                        <ul>
                          <li><Link className="fs-14" to="/memberParents/UpdateMember">Edit personal information</Link></li>
                          <li><Link className="fs-14" to="/memberParents/ChangePassword">Change Password</Link></li>
                        </ul>
                    </div>
                </div>
            <div className="col-sm-9">
              <div className="content">
                <div className="content-title">
                  <p className="mbt-0">Tutor saved</p>
                </div>
                <div className="border-bt mb-4" />
                {fetchData()}
                {renderModal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default ViewSaveTutor;