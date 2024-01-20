import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

function ViewDetailTutor(){
    const navigate =useNavigate();
    let params = useParams();
    const [getData , setData] = useState("")
    const [getIdTutor ,setIdTutor] =useState("")
    const [rating, setRating] = useState(0);
    const [comment , setComment] = useState("")
    const [getListcomment , setListComment] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    var authParents = localStorage.getItem("authParents")
    if(authParents){
        authParents =JSON.parse(authParents)
        var active =authParents.data.auth.active 
        var id_member =authParents.data.auth.id
    }
    useEffect(()=>{
        getDetailTutor()
        getComment()
    },[])
    // hàm xử lý ô input
    function handleInput(e){
        setComment(e.target.value)
    }

    // hàm để lấy giữ liệu từ api 
    function getDetailTutor(){
        axios.get(`http://localhost/projectnew/public/api/view/tutor/`+params.id)
        .then(response=>{
            setData(response.data.tutor)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    function getComment(){
        axios.get(`http://localhost/projectnew/public/api/member/vip/get/comment/`+ params.id)
        .then(response=>{
            setListComment(response.data.comment)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    // lấy dữ liệu ra hiển thị lên giao diện 
    function fetchData(){     
        if(Object.keys(getData).length>0){
            return getData.map((value)=>{
                if(active == 1){
                    return(
                        <div className="row mt-5">
                            <div className="col-sm-2">
                                <div className="viewTutorForParentsVip-avatar">
                                    <img src={"http://localhost/projectnew/public/upload/"+value.avatar} alt="" />
                                </div>
                            </div>
                            <div className="col-sm-10">
                            <div className="viewTutor-name">
                                <h5>{value.name}</h5>
                            </div>
                            <div className="border-bt mb-2" />
                            <div className="viewTutorForParentsVip-Subject">
                                <h5><i className="fa-solid fa-book-bookmark" /> {value.subject}</h5>
                            </div>
                            <div className="border-bt mb-2" />
                            <div className="flex viewTutorForParentsVip-city-formTeach">
                                <h5 className="mr-20"><i className="fa-solid fa-location-dot" /> {value.country}</h5>
                                <h5><i className="fa-solid fa-briefcase" /> {value.type}</h5>
                            </div>
                            <div className="border-bt mb-2" />
                            </div>
                            <div className="col-sm-12 mt-4 ml-50">
                                <div className="viewTutorForParentsVip-describe-yourself mt-3">
                                    <div className="viewTutorForParentsVip-describe-yourself-title">
                                    <h5>DESCRIBE YOURSELF EXPERIENCE AND QUALIFICATIONS</h5>
                                    </div>
                                    <div className="viewTutorForParentsVip-describe-yourself-details">
                                    <p className="w-80">{value.desc}</p>
                                    </div>
                                </div>
                                <div className=" row viewTutorForParentsVip-personal-info mb-4">
                                    <div className="col-sm-12 viewTutorForParentsVip-personal-info-title mb-4">
                                        <h5>PERSONAL INFORMATION</h5>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="viewTutorForParentsVip-personal-info-name">
                                            <p className="fs-14"><span className="font-weight">FIRST AND LASTNAME : </span> {value.name}</p>
                                        </div>
                                        <div className="viewTutorForParentsVip-personal-info-gender">
                                            <p className="fs-14"><span className="font-weight">Gender : </span>{value.sex}</p>
                                        </div>
                                        <div className="viewTutorForParentsVip-personal-info-job">
                                            <p className="fs-14"><span className="font-weight">Job : </span>{value.role}</p>
                                        </div>
                                        <div className="viewTutorForParentsVip-personal-info-schedule">
                                        <p className="fs-14"><span className="font-weight">Class schedule : </span>{value.schedule}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="viewTutorForParentsVip-personal-info-birthday">
                                            <p className="fs-14"><span className="font-weight">Birthday : </span>{value.birth}</p>
                                        </div>
                                        <div className="viewTutorForParentsVip-personal-info-country">
                                            <p className="fs-14"><span className="font-weight">Country : </span>{value.country}</p>
                                        </div>
                                        <div className="viewTutorForParentsVip-personal-info-district">
                                            <p className="fs-14"><span className="font-weight">District : </span>{value.district}</p>
                                        </div>
                                    </div>
                                </div>
                                {renderComment(value.id)}
                            </div>
                            <div className="col-sm-12 center mb-5">
                                <Link to="/memberParents/ViewListTutor" className="btn btn-success btn-back">Back</Link>
                            </div>
                            
                        </div>
                    )
                }else if(active==0){
                    return(
                        <div className="row mt-5">
                            <div className="col-sm-2">
                                <div className="viewTutor-avatar">
                                    <img src={"http://localhost/projectnew/public/upload/"+value.avatar} alt="" />
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <div className="viewTutor-name">
                                    <h5>{value.name}</h5>
                                </div>
                            <div className="border-bt mb-2" />
                                <div className="viewTutor-Subject">
                                    <h5><i className="fa-solid fa-book-bookmark" /> {value.subject}</h5>
                                </div>
                            <div className="border-bt mb-2" />
                                <div className="flex viewTutor-district-formTeach">
                                    <h5 className="mr-20"><i className="fa-solid fa-location-dot" /> {value.district}</h5>
                                    <h5><i className="fa-solid fa-briefcase" /> {value.type}</h5>
                                </div>
                            <div className="border-bt mb-2" />
                            </div>
                            <div className="col-sm-12 mt-4 ml-50 mb-5">
                            <div className="viewTutor-describe-yourself mt-3">
                                <div className="viewTutor-describe-yourself-title">
                                <h5>DESCRIBE YOURSELF EXPERIENCE AND QUALIFICATIONS</h5>
                                </div>
                                <div className="viewTutor-describe-yourself-details">
                                <p className="w-80">{value.desc}</p>
                                </div>
                            </div>
                                <div className=" row viewTutor-personal-info">
                                    <div className="col-sm-12 viewTutor-personal-info-title mb-3">
                                    <h5>PERSONAL INFORMATION</h5>
                                    </div>
                                    <div className="col-sm-5">
                                    <div className="viewTutor-personal-info-name">
                                        <p className="fs-14"><span className="font-weight">FIRST AND LASTNAME : </span> {value.name}</p>
                                    </div>
                                    <div className="viewTutor-personal-info-gender">
                                        <p className="fs-14"><span className="font-weight">Gender : </span>{value.sex}</p>
                                    </div>
                                    <div className="viewTutor-personal-info-job">
                                        <p className="fs-14"><span className="font-weight">Job : </span>{value.role}</p>
                                    </div>
                                    <div className="viewTutor-personal-info-schedule">
                                        <p className="fs-14"><span className="font-weight">Class schedule : </span>{value.schedule}</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-7">
                                    <div className="viewTutor-personal-info-address">
                                        <p className="fs-14"><span className="font-weight">Address: </span>{value.address}</p>
                                    </div>
                                    <div className="viewTutor-personal-info-birthday">
                                        <p className="fs-14"><span className="font-weight">Birthday : </span>{value.birth}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 center mb-5">
                                <button onClick={() => navigate(-1)} className="btn btn-success btn-back">Back</button>
                            </div>
                        </div>
                    )
                }
                
            })
        }
    }


    // bình luận và đánh giá
    function renderListComment(){
        if(Object.keys(getListcomment).length>0){
            return getListcomment.map((value)=>{
                const formattedTime = formatTimestamp(value.time);
                return(
                    <div>
                        <div className="col-sm-12"> 
                            <div className="border-bt mb-2" />
                        </div>
                        <div className="col-sm-12">
                            <div className="comment-name">
                                <p className="mbt-0">{value.name}</p>
                            </div>
                            <div className="comment-time">
                                <p className="mbt-0"><span className="font-weight">{formattedTime}</span></p>
                            </div>{/*/rating-area*/}
                            <div className="comment">
                                <p>{value.content}</p>
                            </div>
                        </div>
                    </div>
                )
                
                    
            })
        }
    }
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        // Customize the date format as needed
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }
    function renderComment(id_tutor){
        return(
                <div>
                    <div className="col-sm-12 post-comment-container mb-5">
                        <form className="row justify-content-center" onSubmit={PostComment}>
                            <div className="col-sm-4 mb-4 mt-4">
                                <div className="rating-area center">
                                    {RateStar(id_tutor)}
                                </div>
                            </div>
                            <div className="col-sm-10 post-comment mb-5">
                            <div>
                                <input type="text" placeholder="Comment....." onChange={handleInput} required/>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="center btn-comment mb-4">
                                <button className="btn btn-success" >Post Comment</button>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 mb-5">
                    <div className="FeedBackForParentsVip">
                        <div className="row padding">
                            <div className="col-sm-12">
                                <div className="FeedBackForParentsVip-title">
                                <p>Feedback For Tutor</p>
                                </div>
                            </div>
                            {renderListComment()}
                        </div>
                    </div>
                    </div>
                </div>
        )
    }
    
    function RateStar(id_tutor){
        function changeRating( newRating ) {
          setRating(newRating)
          setIdTutor(id_tutor)
        }
        
          // rating = 2;
          return (
            <StarRatings
              rating={rating}
              starRatedColor="green"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
              starDimension="35px"
              starSpacing="10px"
            />
          );
    }
    function PostComment(e){
        e.preventDefault();
        const dataRate ={
            id_member :id_member,
            id_tutor : getIdTutor,
            rate:rating
        }
        console.log(rating)
        const dataComment ={
            id_member :id_member,
            id_tutor :getIdTutor,
            content: comment
        }
        console.log(dataComment)
        return Promise.all([
            axios.post("http://localhost/projectnew/public/api/member/vip/rate", dataRate),
            axios.post("http://localhost/projectnew/public/api/member/vip/comment", dataComment), // Thay YOUR_COMMENT_API_ENDPOINT bằng đường dẫn API comment thực tế
          ])
          .then((responses) => {
            setModalVisible(true);
            getComment();
          })
          .catch((errors)=>{
            setModalVisible1(true);
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
                    Successful tutor evaluation 
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
    function renderModal1(){
        return (
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
                        Please select the number of stars and fill in the review content
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
        );
    }
    // nếu active == 0 thì sẽ hiển thị phần giao diện của phụ huynh thường 
    // nếu active == 1 thì sẽ hiển thị phần giao diện của phụ huynh vip
    if(active == 0){
        return(
            <div id="viewTutor">
                <div className="container">
                    {fetchData()}
                </div>
            </div>
        )
    }else if(active ==1){
        return(
            <div id="viewTutorForParentsVip">
                <div className="container">
                    {fetchData()}
                    {renderModal()}
                    {renderModal1()}
                </div>
            </div>
        )
    }
}
export default ViewDetailTutor;