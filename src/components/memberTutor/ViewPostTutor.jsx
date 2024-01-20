import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewPostTutor(){
    const [getData , setData] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [getIdBlog, setIdBlog] = useState("");
    const [getIdMember, setIdMember] = useState("");
    const[inputs,setInput]=useState({
      address:"",
      day:"",
      hour:"",
    })
    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      console.log(value)
      setInput(state=>({...state,[nameInput]:value}))
    }
    var authTutor = localStorage.getItem("authTutor")
    if(authTutor){
      authTutor=JSON.parse(authTutor);
      var id_tutor= authTutor.data.auth.id;
    }
    // phần hiển thị tất cả bài đăng
    useEffect(()=>{
        axios.get(`http://localhost/projectnew/public/api/blog`)
        .then(response=>{
          setData(response.data.blog)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    function fetchData(){
        if(Object.keys(getData).length>0){
          return getData.map((value)=>{
              return(
                <div className="col-sm-7">
                <div className="row viewPostTutor-content">
                  <div className="col-sm-2 mt-3">
                    <div className="viewPostTutor-content-avatar">
                      <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                    </div>
                  </div>
                  <div className="col-sm-10 mt-3">
                    <div className="viewPostTutor-content-name">
                      <p>{value.name}</p>
                    </div>
                    <div className="viewPostTutor-content-detail">
                      <div className="viewPostTutor-content-detail-title">
                        <p>{value.title}</p>
                      </div>
                      <div className="viewPostTutor-content-detail-form">
                        <p>Class: <span>{value.class}</span></p>
                      </div>
                      <div className="viewPostTutor-content-detail-subject">
                        <p>Subject: {value.subject}</p>
                      </div>
                      <div className="viewPostTutor-content-detail-price">
                        <p>Tuition/ 1 student: <span>{value.price}k</span></p>
                      </div>
                      <div className="viewPostTutor-content-detail-address mb-2">
                        <p>Address: <span>{value.country},{value.district}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="viewPostTutor-content-detail-content mb-3">
                      <p>{value.content}</p>
                    </div>
                  <div className="col-sm-12 mb-3">
                    <div className="flex justify-content-end">
                      <div className="btn-save">
                        <button onClick={() => handleSave(
                              value.id
                          )}
                          className="btn btn-success">Save</button>
                      </div>
                      <div className="btn-apply">
                        <button onClick={() => handleApply(
                              value.id ,value.id_member
                          )}
                          className="btn btn-success" >Apply</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )
          })
      }
    }

    // phần save
    function handleSave(id){
      savePost(id)
    }
    function savePost(id_blog){
      const data={
          id_tutor:id_tutor,
          id_blog:id_blog,
      }
      axios.post("http://localhost/projectnew/public/api/tutor/add/wishlist/blog",data)
      .then(response=>{
        console.log(response)
        if (response.data.errors) {
          setModalVisible1(true);
        } else{
          setModalVisible(true);
        }
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
                  You have successfully saved the article
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
      )
    }
    function renderModalSaved(){
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
                  Post has been saved to the list
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


    //phần apply
    function handleApply(id_blog,id_member){
        if(id_blog && id_member){
          setIdBlog(id_blog)
          setIdMember(id_member)
        }
        // Hiển thị modal
        setModalVisible2(true);
    }
    function Apply(id_blog,id_member){
      const data={
        id_member:id_member,
        id_tutor:id_tutor,
        id_blog:id_blog,
        location:inputs.address,
        day:inputs.day,
        hour:inputs.hour
      } 
      axios.post("http://localhost/projectnew/public/api/tutor/makeappoint",data)
      .then(response=>{ 
          setModalVisible3(true);
          setData(data => data.filter(post => post.id !== id_blog));
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
                      <form onSubmit={()=> {
                              Apply(getIdBlog,getIdMember) 
                              setModalVisible2(false);
                        }}
                        className="row form-appointment">
                        <div className="form-title mb-3">
                          <p>Make a Appointment</p>
                        </div>
                        <div className="col-sm-4">
                          <div className="appointment-day">
                            <p className="font-weight fs-20">Date <span className="red">*</span></p>
                            <input type="date" name="day" id="txtDate" min="2024-01-05" required onChange={handleInput}/>
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
                            <button className="btn btn-success">
                              Make an appointment
                            </button>
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

    return(
      <div>
        <div id="viewPostTutor">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="viewPostTutor-title">
                  <p>Post</p>
                </div>
                <div className="border-bt" />
              </div>
              <div className="row justify-content-center">
                {fetchData()}
              </div>
            </div>
          </div>
        </div>
        {renderModal()}
        {renderModalSaved()}
        {renderModalAppointment()}
        {renderModalNotification()}
      </div>
    )
}
export default ViewPostTutor;