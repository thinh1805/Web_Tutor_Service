import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ViewSavePostForTutor(){
    const [getData , setData] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [getId ,setId] =useState("")
    const[inputs,setInput]=useState({
      address:"",
      day:"",
      hour:"",
    })
    var authTutor = localStorage.getItem("authTutor")
    if(authTutor){
      authTutor=JSON.parse(authTutor);
      var id_tutor= authTutor.data.auth.id;
    }
    useEffect(()=>{
        axios.get(`http://localhost/projectnew/public/api/tutor/get/wishlist/blog/${id_tutor}`)
        .then(response=>{
          setData(response.data.listblog)
          console.log(response.data.listblog)
        })
        .catch(function(error){
          console.log(error)
        })
      },[])
      const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        console.log(value)
        setInput(state=>({...state,[nameInput]:value}))
      }

      // hiển thị ra danh sách bài đăng đã lưu 
      function fetchData(){
        if(Object.keys(getData).length>0){
            return getData.map((value)=>{
                console.log(value)
                return(
                    <div className="col-sm-11 padding">
                <div className="row ViewSavePostForTutor-content">
                  <div className="col-sm-2 mt-3">
                    <div className="ViewSavePostForTutor-content-avatar">
                      <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                    </div>
                  </div>
                  <div className="col-sm-8 mt-3">
                    <div className="ViewSavePostForTutor-content-name">
                      <h5>{value.name}</h5>
                    </div>
                    <div className="ViewSavePostForTutor-content-detail">
                      <div className="Post-content-detail-title">
                        <p>{value.title}</p>
                      </div>
                      <div className="ViewSavePostForTutor-content-detail-class">
                        <p>Class: {value.class}</p>
                      </div>
                      <div className="ViewSavePostForTutor-content-detail-subject">
                        <p>Subject: {value.subject}</p>
                      </div>
                      <div className="ViewSavePostForTutor-content-detail-price">
                        <p>Cost/Hours <span>{value.price}k</span></p>
                      </div>
                      <div className="ViewSavePostForTutor-content-detail-address">
                        <p>Address: <span>{value.district},{value.country}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-3">
                    <div className="dropdown">
                      <a data-bs-toggle="dropdown">
                        <i className="fas fa-ellipsis-h" />
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={()=> handleDelete(value.id)}>Delete</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-12 mb-3 ml30 mt-3">
                    <div className="ViewSavePostForTutor-content-detail-content">
                      <p className="w-90">{value.content}</p>
                    </div>
                  </div>
                  <div className="col-sm-12 mb-3">
                    <div className="ViewSavePostForTutor-btn-container-Apply ta-end">
                    <button onClick={() => handleApply(
                            value.id_blog ,value.id_member
                        )} 
                        className="btn btn-success" >Apply</button>
                    </div>
                  </div>
                </div>
              </div>
                )
            })
        }else{
          return(
            <div class="no-search mt-5">
              <p class="center font-weight">No Post saved</p>
            </div>
          )
        }
      }

      // apply bài đăng 
      function handleApply(id_blog,id_member){
        setSelectedPost({ id_blog, id_member });
        // Hiển thị modal
        setModalVisible2(true); 
      }
      function handleMakeAppointment(event) {
        event.preventDefault();
        if (selectedPost) {
          // Thực hiện gửi dữ liệu lên API
          Apply(selectedPost.id_blog, selectedPost.id_member);
          // Đóng modal sau khi đã gửi dữ liệu
          setModalVisible2(false);
        }
      }
      function Apply(id_blog,id_member){
        console.log(id_member)
        const data={
          id_member:id_member,
          id_tutor:id_tutor,
          id_blog:id_blog,
          location:inputs.address,
          day:inputs.day,
          hour:inputs.hour
        } 
        console.log(data)
        axios.post("http://localhost/projectnew/public/api/tutor/makeappoint",data)
        .then(response=>{
          setData(data => data.filter(post => post.id !== id_blog));
          setModalVisible3(true);
        })
        .catch(error => {
          console.error(error);
          // Xử lý lỗi nếu cần thiết
        });
      }
      function renderModalAppointment(){
        return(
          <div>
          {/* Your existing code */}
          {isModalVisible2 && (
            <div className="modal modal-notification mb-4" id="myModal" style={{ display: isModalVisible2 ? 'block' : 'none' }}>
                <div id="appointment">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-sm-8">
                        <form className="row form-appointment" onSubmit={handleMakeAppointment}>
                          <div className="form-title mb-3">
                            <p>Make a Appointment</p>
                          </div>
                          <div className="col-sm-4">
                            <div className="appointment-day">
                              <p className="font-weight fs-20">Day <span className="red">*</span></p>
                              <input type="date" name="day" id="txtDate" min="2024-01-05" required  onChange={handleInput}/>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="appointment-hour">
                              <p className="font-weight fs-20">Hour <span className="red">*</span></p>
                              <input type="time" name="hour" id="txtTime" required onChange={handleInput}/>
                            </div>
                          </div>
                          <div className="col-sm-5 mb-5">
                            <div className="appointment-location">
                              <p className="font-weight fs-20">Location<span className="red">*</span></p>
                              <textarea rows="7" cols="33" placeholder="139 Nguyễn Hữu Thọ" name="address" required onChange={handleInput}/>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="btn-container mb-4 center">
                              <button className="btn btn-success">Make an appointment</button>
                              <button className="btn btn-success"
                                onClick={() => {
                                  setModalVisible2(false);
                                }}
                              >Close</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          )}
        </div>
      )
      }
      function renderModalNotification(){
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
                  Schedule appointment successfully
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-success"
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


    // phần xoá
    function handleDelete(id_whislist){
        setId(id_whislist)
        setModalVisible(true);
    }
    function Delete(id_whislist){   
        axios.get("http://localhost/projectnew/public/api/tutor/delete/wish/"+ id_whislist)
        .then((response)=>{
          setData(data => data.filter(post => post.id !== id_whislist));
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
                    Do you want to delete the saved post?
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
        <div id="ViewSavePostForTutor">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 background-container mb-5">
              <Link to="/memberTutor/AppointmentSuccessfully"><p>Appointment successfully</p></Link>
              <Link to="/memberTutor/AppointmentRefused"><p>Appointment is refused</p></Link>
              <Link to="/memberTutor/ViewSavePostForTutor" className="red" ><p>Post Saved </p></Link>
              <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
              <div id="demo" className="collapse">
                <ul>
                  <li><Link to="/memberTutor/UpdateTutor" className="fs-14">Edit personal information</Link></li>
                  <li><Link to="/memberTutor/ChangePasswordTutor" className="fs-14">Change Password</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="ViewSavePostForTutor-title">
                <p className="mbt-0">Post Saved</p>
              </div>
              <div className="border-bt" />
              {fetchData()}
            </div>
          </div>
        </div>
        {renderModal()}
        {renderModalAppointment()}
        {renderModalNotification()}
      </div>
    )
}
export default ViewSavePostForTutor;