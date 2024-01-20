import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Country from "../Country";
import District from "../District";
import Class from "../Class";
import Subject from "../Subject";
import Error from "../Error";
function CreatePost(){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const navigate =useNavigate();
    var authParents = localStorage.getItem("authParents")
    if(authParents){
      authParents=JSON.parse(authParents);
      var idParents= authParents.data.auth.id;
    }
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistrict ,setSelectedDistrict] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject ,setSelectedSubject] = useState('');

    /*district and country*/
    const handleCountrySelect = (countryId) => {
        setSelectedCountry(countryId);
    };
    const handleDistrictSelect = (districtId)=>{
        setSelectedDistrict(districtId)
    }

    /*class and subject*/
    const handleClassSelect =(classId) =>{
        setSelectedClass(classId)
    }
    const handleSubjectSelect = (subjectId)=>{
        setSelectedSubject(subjectId)
    }

    const [inputs,setInput]=useState({
      price:"",
      content:"",
      title:"",
    })
    const[errors,setErrors]=useState({})

    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInput(state=>({...state,[nameInput]:value}))
    }

    function handleCreatePost(e){
          e.preventDefault();
          let errorSubmit = {};
          let flag=true;
          if(!authParents){
            alert("Please log in to post")
            navigate('/memberParents/LoginParents')
          }
          if(!flag){
              setErrors(errorSubmit);
          }
          if(flag){
              const data={
                title:inputs.title,
                id_member:idParents,
                id_class:selectedClass,
                id_subject:selectedSubject,
                price:inputs.price,
                content:inputs.content,
                id_country:selectedCountry,
                id_district:selectedDistrict,
              }
              axios.post("http://localhost/projectnew/public/api/member/post/blog",data)
              .then(response=>{
                  setModalVisible(true);
              })
              .catch(function(error){
                  setModalVisible1(true);
              })
          }
    }
    function renderModal(){
        return (
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
                        Your Post is Waiting for Approval 
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setModalVisible(false);
                            navigate('/memberParents/ViewPost');
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
                        Please fill in the fields
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
    return(
        <div id="createPost">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <form onSubmit={handleCreatePost} className="form-createPost">
                            <div className="form-title">
                            <p>Create a Post</p>
                            </div>
                            <div className="row">
                            <div className="col-sm-7">
                                <div className="createPost-content">
                                  <div>
                                      <p>Title <span>*</span></p>
                                      <input type="text" required name="title" onChange={handleInput} placeholder="Example: Tôi muốn tìm gia sư dạy ...."/>
                                  </div>
                                  <div>
                                      <p>Class <span>*</span></p>
                                      <Class onSelectClass={handleClassSelect}/>
                                  </div>
                                  <div>
                                      <p>Subjects <span>*</span></p>
                                      <Subject selectedClass={selectedClass} selectedSubject={handleSubjectSelect}/>
                                  </div>
                                  <div>
                                      <p>Cost <span>*</span></p>
                                      <input type="text" required placeholder="example:200,000" name="price" onChange={handleInput} 
                                          onKeyPress={(e) => {
                                              // Allow only numeric characters
                                              const isNumeric = /^[0-9]*$/;
                                              if (!isNumeric.test(e.key)) {
                                                  e.preventDefault();
                                              }
                                              }}
                                      />
                                  </div>
                                  <div>
                                      <p>Province/City <span>*</span></p>
                                      <Country onSelectCountry={handleCountrySelect}/>
                                  </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="createPost-content-district">
                                <p>District <span>*</span></p>
                                    <District selectedCountry={selectedCountry} selectedDistrict={handleDistrictSelect}/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="createPost-content-schedule pb-4">
                                <p>Content  <span>*</span></p>
                                <input type="text" placeholder="Example: Sáng thứ hai 7h-10h .... " name="content" onChange={handleInput}/>
                                </div>
                            </div>
                            </div>
                            <div className="btn-container center">
                                <button className="btn btn-success btn-post" onClick={handleCreatePost}>Post</button>
                                <Link to="/memberParents/ViewPost" className="btn btn-success btn-back" >Back</Link>
                            </div>
                            <Error errors={errors}/>
                        </form>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderModal1()}
        </div>
    )
}
export default CreatePost;