import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Error from "../Error";
import District from "../District";
import Country from "../Country";
import { useNavigate } from "react-router-dom";
import Class from "../Class";
import Subject from "../Subject";
import unidecode from "unidecode";
function RegisterProfileTutor(){
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDistrict ,setSelectedDistrict] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject ,setSelectedSubject] = useState('');
  const[getFilesAvatar,setFilesAvatar]=useState("")
  const[avatar,setAvatar]=useState("")
  const[getFilesCertificate,setFilesCertificate]=useState("")
  const[certificate,setCertificate]=useState("")
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
  const navigate = useNavigate();
  const[errors,setErrors]=useState({})
  var tutor = localStorage.getItem("tutor")
  if(tutor){
      tutor=JSON.parse(tutor)
  }
  var username = tutor.username;
  var email = tutor.email;
  var password= tutor.password;
  const[inputs,setInput]=useState({
    name:"",
    phone:"",
    sex:"",
    birthday:"",
    address:"",
    desc:"",
    role:"",
    price:"",
    level:"",
    special:"",
    type:"",
    schedule:"",
  })
  const handleInput = (e)=>{
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };
  function handleAvatarInputs(e){
    const file =e.target.files;
    let reader=new FileReader();
    reader.onload = (e)=>{
        setAvatar(e.target.result);
        setFilesAvatar(file[0]);
    };
    reader.readAsDataURL(file[0]);

  }
  function handleCertificateInputs(e){
    const file =e.target.files;
    let reader=new FileReader();
    reader.onload = (e)=>{
        setCertificate(e.target.result);
        setFilesCertificate(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }
  const handleSubmit= (e)=>{
    e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        
        
        const isAlpha = /^[a-zA-Z\s]+$/;
        const normalizedInput = unidecode(inputs.name);
        if (!isAlpha.test(normalizedInput)) {
          errorSubmit.name = "Please do not include special characters and numbers";
          flag = false;
        } else if (inputs.name === "") {
          errorSubmit.name = "Please enter name";
          flag = false;
        }

        if(inputs.phone==""){
          errorSubmit.phone="Please enter the phone number";
          flag = false;
        }else if(inputs.phone.length != 10){
            errorSubmit.phone ="Incorrect telephone number";
            flag= false;
        }
        
        if(inputs.sex==""){
            errorSubmit.password="Please select gender";
            flag = false;
        }else if (inputs.sex === "Vui lòng chọn giới tính") {
          errorSubmit.sex = "Please select gender";
          flag = false;
        }

        if(inputs.birthday==""){
          errorSubmit.birthday="Please select your birthday";
          flag =false;
        }

        if(inputs.address==""){
          errorSubmit.address="Please enter current address";
          flag =false;
        }
        if(inputs.desc==""){
          errorSubmit.desc="Please enter a description about yourself";
          flag =false;
        }
        if(inputs.role==""){
          errorSubmit.role="Please enter current occupation";
          flag =false;
        }else if (inputs.role === "Chọn Ngành Nghề Hiện Tại Của Bạn") {
          errorSubmit.role = "Please select Job";
          flag = false;
        }
        if(inputs.price==""){
          errorSubmit.price="Please enter your desired teaching price";
          flag =false;
        }        
        if(inputs.type==""){
          errorSubmit.type ="Please choose a teaching method";
          flag=false;
        }else if (inputs.type === "Hình thức dạy") {
          errorSubmit.type = "Please select type form";
          flag = false;
        }

        if(getFilesAvatar==""){
          errorSubmit.avatar="Please send your representative  photo";
          flag =false;
        }else{
            let size = getFilesAvatar['size'];
            
            let allowtypes = ['png','jpg','jpeg','PNG','JPG'];
            let name =getFilesAvatar['name'];
            //console.log(name)
            let split = name.split(".")
            let typesplit= split[1]; 
            //console.log(typesplit)
            if(size>1024*1024){
                errorSubmit.avatar="Size too large error please choose a file with a smaller MB amount";
                flag =false;
            }
            else if(!(allowtypes.includes(typesplit))){
                errorSubmit.avatar="Please select the image file in the correct image format";
                flag =false;
            }
        }
        if(getFilesCertificate==""){
          errorSubmit.certificate="Please send your representative degree";
          flag =false;
        }else{
            let size = getFilesCertificate['size'];
            let allowtypes = ['png','jpg','jpeg','PNG','JPG'];
            let name =getFilesCertificate['name'];
            //console.log(name)
            let split = name.split(".")
            let typesplit= split[1]; 
            if(size>1024*1024){
                errorSubmit.certificate="Size too large error please choose a file with a smaller MB amount";
                flag =false;
            }
            else if(!(allowtypes.includes(typesplit))){
                errorSubmit.certificate="Please select the image file in the correct image format";
                flag =false;
            }
        }
        
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
              username:username,
              email:email,
              password:password,
              name:inputs.name,
              phone:inputs.phone,
              sex:inputs.sex,
              birth:inputs.birthday,
              id_country:selectedCountry,
              id_district:selectedDistrict,
              address:inputs.address,
              desc:inputs.desc,
              role:inputs.role,
              time:inputs.price,
              level:"null",
              special:"null",
              id_class:selectedClass,
              id_subject:selectedSubject,
              type:inputs.type,
              schedule:inputs.schedule,
              avatar:avatar,
              certificate:certificate,
            }
            axios.post("http://localhost/projectnew/public/api/tutor/register",data)
            .then(response=>{
                if(response.data.errors){
                  setModalVisible1(true)
                }else{
                  setModalVisible(true)
                }
            })
            .catch(function(error){
                console.log(error)
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
                  <h4 className="modal-title white">
                    Notification
                  </h4>
                </div>
                {/* Modal body */}
                <div className="modal-body mb-2">
                  Your account is pending approval
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                        setModalVisible(false);
                        navigate('/memberTutor/LoginTutor');
                        localStorage.clear();
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
                  <h4 className="modal-title white">
                    Notification
                  </h4>
                </div>
                {/* Modal body */}
                <div className="modal-body mb-2">
                  Account already exists
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
      <div id="register-profile-tutor">
        <div className="container">
          <div className="row">
            <div className="register-profile-tutor-background">
              <div className="padding">
                <form className="row form-profile-tutor" onSubmit={handleSubmit}>
                  <div className="col-sm-12">
                    <div className="register-profile-tutor-title">
                      <p>PROFILE TUTOR</p>
                    </div>
                    <div className="register-profile-tutor-information">
                      <p>PERSONAL INFORMATION</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <p>FULL NAME</p>
                      <input type="text" required name="name" onChange={handleInput}/>
                    </div>
                    <div>
                      <p>GENDER</p>
                      <select name="sex" id required onChange={handleInput}>
                          <option>Vui lòng chọn giới tính</option>
                          <option>Nam</option>
                          <option>Nữ</option>
                        </select>
                    </div>
                    <div>
                      <p>PROVINCE/CITY</p>
                      <Country onSelectCountry={handleCountrySelect}/>
                    </div>
                    <div>
                      <p>ADDRESS</p>
                      <input type="text" required name="address" onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-6 pdl">
                    <div>
                      <p>PHONE NUMBER</p>
                      <div className="ta-end">
                        <input type="text" required name="phone" onChange={handleInput}
                         onKeyPress={(e) => {
                          // Allow only numeric characters
                            const isNumeric = /^[0-9]*$/;
                            if (!isNumeric.test(e.key)) {
                              e.preventDefault();
                            }
                          }}/>
                      </div>
                    </div>
                    <div>
                      <p>DATE OF BIRTH</p>
                      <div className="ta-end">
                      <input type="date" name="birthday" id="txtDate" min="1900-01-01" max="2024-01-05" onChange={handleInput} />
                      </div>
                    </div>
                    <div>
                      <p>DISTRICT</p>
                      <div className="ta-end">
                        <District selectedCountry={selectedCountry} selectedDistrict={handleDistrictSelect}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 form-introduce-yourself">
                    <div>
                      <p>INTRODUCE YOURSELF <span class="red">*</span></p>
                      <p className="italic">(You need to write down all your strengths and some of your experience to be accepted into the class as soon as possible)</p>
                      <input type="text" required name="desc" onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="register-profile-professional mb-4 ">
                      <p>PROFESSIONAL PROFILE</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div>
                        <p>JOB? <span class="red">*</span></p>
                        <select name="role" id required onChange={handleInput}>
                          <option>Chọn Ngành Nghề Hiện Tại Của Bạn</option>
                          <option>Student</option>
                          <option>Teacher</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <p>TEACHING LEVEL <span class="red">*</span></p>
                        <Class onSelectClass={handleClassSelect}/>
                      </div>
                      <div>
                        <p>TEACHING FORMS <span class="red">*</span></p>
                        <select name="type" id required onChange={handleInput}>
                          <option>Hình thức dạy</option>
                          <option>Online</option>
                          <option>Offline</option>
                          <option>Online/Offline</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 pdl">
                      <div>
                        <p>COST/HOURS <span class="red">*</span></p>
                        <div className="ta-end">
                          <input type="text" name="price" required onChange={handleInput}
                            onKeyPress={(e) => {
                            // Allow only numeric characters
                            const isAllowedChar = /^[0-9]*$|[!@#$%^&*(),.?":{}|<>]/;
                            const inputValue = e.key;

                            if (!isAllowedChar.test(inputValue)) {
                              e.preventDefault();
                            }
                            }}/>
                        </div>
                      </div>
                      <div>
                        <p>SUBJECTS TEACH ? <span class="red">*</span></p>
                        <div className="ta-end">
                          <Subject selectedClass={selectedClass} selectedSubject={handleSubjectSelect}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 form-class-schedule">
                    <div>
                      <p>SCHEDULE CAN ACCEPT CLASS <span class="red">*</span></p>
                      <input type="text" name="schedule" required onChange={handleInput}/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="register-tutor-confirmation mb-4">
                      <p>PHOTO CONFIRMING TUTOR INFORMATION</p>
                    </div>
                  </div>
                  <div className="row form-upload-image">
                    <div className="col-sm-6 center">
                      <p className="fs-14">REPRESENTATIVE PHOTO (MUST SHOW FACE, SHOOTED ALONE) <span class="red">*</span></p>
                      <img src={"http://localhost/projectnew/public/image/Image13.jpg"} alt="" className="w426-h250" /><br />
                      <p className="btn" id="chooseAvatar" ><i className="fa-solid fa-download" /> Select photo</p>
                      <input type="file" id="fileInputAvatar" style={{display: 'none'}} name="avatar" onChange={handleAvatarInputs} />
                      <p id="textAvatar" />
                    </div>
                    <div className="col-sm-6 center">
                      <p className="fs-14">STUDENT CARD/DEGREE (ABSOLUTELY CONFIDENTIAL, NOT DISPLAYED) <span class="red">*</span></p>
                      <img src={"http://localhost/projectnew/public/image/Image14.jpg"} alt="" /><br />
                      <p id="chooseDegree" className="btn"><i className="fa-solid fa-download" /> Select photo</p>
                      <input type="file" id="fileInputDegree" style={{display: 'none'}} onChange={handleCertificateInputs} name="certificate"/>
                      <p id="textDegree" />
                    </div>
                  </div>
                  <div className="col-sm-12 center mt-4">
                    <button className="btn btn-success btn-register">Register</button>
                  </div>
                  <Error errors={errors}/>
                </form>
              </div>
            </div>
          </div>
        </div>
        {renderModal()}
        {renderModal1()}
      </div>
    )
}
export default RegisterProfileTutor;