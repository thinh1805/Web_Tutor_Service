import axios from "axios";
import { useEffect, useState } from "react";
import District from "../District";
import Country from "../Country";
import Class from "../Class";
import Subject from "../Subject";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
function SearchTutor(){
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDistrict ,setSelectedDistrict] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject ,setSelectedSubject] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  var authParents = localStorage.getItem("authParents")
    if(authParents){
        authParents=JSON.parse(authParents);
        var active = authParents.data.auth.active
        var idParents = authParents.data.auth.id;
    }
    const[inputs,setInput]=useState({
      search:"",
    })
    const[getCount,setCount]=useState(0)
    const [getData , setData] = useState("")
  /*district and country*/
    const handleCountrySelect = (countryId) => {
      setSelectedCountry(countryId); 
      const data = {
        id_country:countryId
      }
        if(data){ 
          axios.post("http://localhost/projectnew/public/api/member/vip/search",data)
          .then(response=>{
            setData(response.data.tutor)
            setCount(response.data.tutor.length)
          })
          .catch(function(error){
              console.log(error)
          })
        }
    };
    const handleDistrictSelect = (districtId)=>{
      setSelectedDistrict(districtId)
      const data = {
        id_district:districtId
      }
        if(data){ 
          axios.post("http://localhost/projectnew/public/api/member/vip/search",data)
          .then(response=>{
            setData(response.data.tutor)
            setCount(response.data.tutor.length)
          })
          .catch(function(error){
              console.log(error)
          })
        }
    }

    /*class and subject*/
    const handleClassSelect =(classId) =>{
      setSelectedClass(classId)
      const data = {
        id_class:classId
      }
        if(data){ 
          axios.post("http://localhost/projectnew/public/api/member/vip/search",data)
          .then(response=>{
            setData(response.data.tutor)
            setCount(response.data.tutor.length)
          })
          .catch(function(error){
              console.log(error)
          })
        }
    }
    const handleSubjectSelect = (subjectId)=>{
      setSelectedSubject(subjectId)
      const data = {
        id_subject:subjectId
      }
        if(data){ 
          axios.post("http://localhost/projectnew/public/api/member/vip/search",data)
          .then(response=>{
            console.log(response)
            setData(response.data.tutor)
            setCount(response.data.tutor.length)
          })
          .catch(function(error){
              console.log(error)
          })
        }
    }

    // phụ huynh thường và vip 
    const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        console.log(value)
        setInput(state=>({...state,[nameInput]:value}))
    }
    function handleSubmit(e){
        e.preventDefault();
            const data={
                word:inputs.search
            }
            console.log(data)
            axios.post("http://localhost/projectnew/public/api/member/search",data)
            .then(response=>{
                console.log(response)
                setData(response.data.tutor)
                setCount(response.data.tutor.length)
            })
            .catch(function(error){
                console.log(error)
            })
    }

    // phụ huynh vip 
    function handleSubmitStar(rating){
      const data = {
        rate: rating
      };
      if(data){ 
        axios.post("http://localhost/projectnew/public/api/member/vip/search",data)
        .then(response=>{
          console.log(response)
          setData(response.data.tutor)
          setCount(response.data.tutor.length)
        })
        .catch(function(error){
            console.log(error)
        })
      }
    }
    const handleFixedPriceSearch = (minPrice, maxPrice) => {
      const data = {
        price: `${minPrice}-${maxPrice}`,
      };
  
      // Thực hiện axios post request với dữ liệu
      axios.post("http://localhost/projectnew/public/api/member/vip/search", data)
        .then((response) => {
          setData(response.data.tutor);
          setCount(response.data.tutor.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
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
    function renderTutorSearch(){
        if(Object.keys(getData).length>0){
            return getData.map((value)=>{
                if(active == 0 ){
                  return(
                      <div className="box-content mb-5">
                          <div className="box-content-info">
                              <div className="box-content-info-left">
                              <img src={"http://localhost/projectnew/public/upload/"+value.avatar} alt="" />
                                  <p>{value.name}</p>
                              </div>
                              <div class="saveTutor">
                                <i onClick={() => handleSave(value.id)}
                                    className="fa-regular fa-bookmark" />
                              </div> 
                          </div>
                          <div className="row detail">
                              <div className="col-sm-8 detail-info">
                                  <p>{value.desc}</p>
                              </div>
                              <div className="col-sm-4 detail-subject">
                              <div className="subject mb-2">
                                  <i className="fa-solid fa-book" />{value.subject}
                              </div>
                              <div className="price mb-2">
                                  <i className="fa-solid fa-dollar-sign" />{value.price}k/student/hour
                              </div>
                              <div className="location">
                                  <i className="fa-solid fa-location-dot" />{value.district} ,{value.country}
                              </div>
                              <div className="btn-view-container center">
                                  <Link to={"/memberParents/ViewDetailTutor/" + value.id} className="btn btn-success btn-view-detail mb-2 pl-50 pr-50">View Profile</Link>
                              </div>
                              <div className="center">
                                  <button className="btn btn-success">Make Appointment</button>
                              </div>
                              </div>
                          </div>
                      </div>
                  )
                }else if(active == 1){
                  return(
                    <div className="box-content mb-5">
                          <div className="box-content-info">
                              <div className="box-content-info-left">
                              <img src={"http://localhost/projectnew/public/upload/"+value.avatar} alt="" />
                                  <p>{value.name}</p>
                              </div>
                              <div class="saveTutor">
                                <i onClick={() => handleSave(value.id)}
                                    className="fa-regular fa-bookmark" />
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
                                    <i className="fa-solid fa-location-dot" />{value.district},{value.country} 
                                </div>
                                <div className="btn-view-container center">
                                  <Link to={"/memberParents/ViewDetailTutor/" + value.id} className="btn btn-success btn-view-detail mb-2 pl-50 pr-50">View Profile</Link>
                                  <button className="btn btn-success btn-appointment">Make An Appointment</button>
                                </div>
                              </div>
                          </div>
                    </div>
                  )
                }
            })
        }else{
          return(
            <div class="no-search">
              <p class="center">There are no tutors displayed</p>
            </div>
          )
        }
    }

    // save
    function handleSave(id){
      SaveTutor(id)
    }
    function SaveTutor(id_tutor){
        const data={
            id_member:idParents,
            id_tutor:id_tutor,
        }
        axios.post("http://localhost/projectnew/public/api/member/wishlist",data)
        .then((response)=>{
          if (response.data.errors) {
            setModalVisible1(true);
          }else{
            
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
                  You Have Successfully Saved Your Tutor
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
  
    if(active == 1){
      return(
        <div id="search-vip">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-10">
                <form className="searchVip" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter to search for subjects" name="search" onChange={handleInput}/>
                    <button type="submit" className="btn btn-search-vip">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </form>
                <div className="content">
                  <div className="title-content">
                    <p class="mb-3">Found {getCount} Tutors</p>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="filter-title">
                  <p className="center mb-4">Filter</p>
                </div>
                <div className="rate">
                      <div className="rate-title">
                        <p className=" mb-2 font-weight">Rate</p>
                      </div>
                      <div className="flex">
                        <button className="btn btn-star" onClick={() => handleSubmitStar(4)}>4 Star & Up</button>
                        <button className="btn btn-star" onClick={() => handleSubmitStar(3)}>3 Star & Up</button>
                      </div>
                      <div className="flex">
                        <button className="btn btn-star" onClick={() => handleSubmitStar(2)}>2 Star & Up</button>
                        <button className="btn btn-star" onClick={() => handleSubmitStar(1)}>1 Star & Up</button>
                      </div>
                </div>
                <div className="location">
                      <div className="location-title">
                        <p className="font-weight mb-2">Location</p>
                      </div>
                      <div>
                          <Country onSelectCountry={handleCountrySelect}/>
                      </div>
                      <div>
                          <District selectedCountry={selectedCountry} selectedDistrict={handleDistrictSelect}/>
                      </div>
                </div>
                <div className="subject">
                      <div className="subject-title">
                        <p className="font-weight mb-2">Class & Subject</p>
                      </div>
                      <div>
                        <Class onSelectClass={handleClassSelect}/>
                      </div>
                      <div>
                        <Subject selectedClass={selectedClass} selectedSubject={handleSubjectSelect}/>
                      </div>
                </div>
                <div className="price">
                  <div className="price-title">
                    <p className="font-weight mb-2">Teaching Cost/Hour</p>
                  </div>
                  <div>
                    <button className="btn btn-price"
                      onClick={() => handleFixedPriceSearch(0, 199999)}
                    >
                    0-200,000
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-price"
                    onClick={() => handleFixedPriceSearch(199999, 499999)}
                    >
                    200,000-500,000</button>
                  </div>
                  <div>
                    <button className="btn btn-price"
                    onClick={() => handleFixedPriceSearch(499999, Infinity)}
                    >
                    500,000+</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-9">
                {renderTutorSearch()}
              </div>
            </div>
            {renderModal()}
          {renderModalSaved()}
          </div>
        </div>
      )
    }else if(active == 0){
      return(
          <div id="search">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-10">
                <form className="search-normal" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Enter to search for subjects" name="search" onChange={handleInput}/>
                  <button type="submit" className="btn btn-search">
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                </form>
                <div className="content">
                  <div className="title-content">
                    <p class="mb-5">Found {getCount} Tutors</p>
                  </div>
                {renderTutorSearch()}
                </div>
              </div>
            </div>
          </div>
          {renderModal()}
          {renderModalSaved()}
        </div>
      )
    }
}
export default SearchTutor;