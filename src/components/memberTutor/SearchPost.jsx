import axios from "axios";
import { useEffect, useState } from "react";

function SearchPost(){
      const[inputs,setInput]=useState({
        search:"",
      })
      const [getData , setData] = useState("")
      const [getCount, setCount] = useState(0)
      const [getIdBlog, setIdBlog] = useState("");
      const [isModalVisible, setModalVisible] = useState(false);
      const [isModalVisible1, setModalVisible1] = useState(false);
      const [getIdMember, setIdMember] = useState("");
      const [isModalVisible2, setModalVisible2] = useState(false);
      const [isModalVisible3, setModalVisible3] = useState(false);
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
      function handleSubmit(e){
        e.preventDefault();
            const data={
                word:inputs.search
            }
            console.log(data)
            axios.post("http://localhost/projectnew/public/api/tutor/search",data)
            .then(response=>{
                setData(response.data.blog)
                setCount(response.data.blog.length)
            })
            .catch(function(error){
                console.log(error)
            })
    }

    function renderPostSearch(){
        if(Object.keys(getData).length>0){
            return getData.map((value)=>{
                return(
                  <div className="col-sm-7">
              <div className="row search-content">
                <div className="col-sm-2 mt-3">
                  <div className="search-content-avatar">
                    <img src={"http://localhost/projectnew/public/image/Image15.png"} alt="" />
                  </div>
                </div>
                <div className="col-sm-10 mt-3">
                  <div className="search-content-name">
                    <p>{value.name}</p>
                  </div>
                  <div className="search-content-detail">
                    <div className="search-content-detail-title">
                      <p>{value.title}</p>
                    </div>
                    <div className="search-content-detail-form">
                      <p>Class: <span>{value.class}</span></p>
                    </div>
                    <div className="search-content-detail-subject">
                      <p>Subject: {value.subject}</p>
                    </div>
                    <div className="search-content-detail-price">
                      <p>Tuition/ 1 student: <span>{value.price}k</span></p>
                    </div>
                    <div className="search-content-detail-address mb-2">
                      <p>Address: <span>{value.country},{value.district}</span></p>
                    </div>
                  </div>
                </div>
                <div className="search-content-detail-content mb-3">
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
        }else{
          return(
            <div class="no-search">
              <p class="center">There are no posts displayed</p>
            </div>
          )
        }
    }
    function savePost(id_blog){
      const data={
          id_tutor:id_tutor,
          id_blog:id_blog,
      }
      axios.post("http://localhost/projectnew/public/api/tutor/add/wishlist/blog",data)
      .then(response=>{
        if (response.data.errors) {
          setModalVisible1(true);
        } else{
          setModalVisible(true);
        }
      })
    }
    function handleSave(id){
      savePost(id)
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
                  Tutor has been saved to the list
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
    
    // apply 
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
    console.log(data)
    axios.post("http://localhost/projectnew/public/api/tutor/makeappoint",data)
    .then(response=>{ 
        setModalVisible3(true);
        console.log(response)
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
                        <p>Make an appointment</p>
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
        <div id="search">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <form className="search-normal" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Post Name" name="search" onChange={handleInput}/>
                <button type="submit" className="btn btn-search">
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </form>
              <div className="content">
                <div className="title-content">
                  <p>Found {getCount} Post</p>
                </div>
                <div class="row justify-content-center mt-5">
                    {renderPostSearch()}
                </div>
              </div>
            </div>
          </div>
          {renderModal()}
          {renderModalSaved()}
          {renderModalAppointment()}
          {renderModalNotification()}
        </div>
      </div>
    )
}
export default SearchPost;