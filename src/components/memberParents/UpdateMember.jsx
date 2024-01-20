import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Error";
import Country from "../Country";
import District from "../District";
import unidecode from "unidecode";
function UpdateMember(){
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistrict ,setSelectedDistrict] = useState('');
    const navigate = useNavigate();
    const handleCountrySelect = (countryId) => {
      setSelectedCountry(countryId);
    };
    const handleDistrictSelect = (districtId)=>{
      setSelectedDistrict(districtId)
    }
    const[inputs,setInputs]=useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        pass:"",
    })
    const [isModalVisible, setModalVisible] = useState(false);
    const[errors,setErrors]=useState({})
    const handleInput = (e)=>{
      const nameInput = e.target.name;
      const value = e.target.value;
      setInputs(state=>({...state,[nameInput]:value}))
    }
    let authParents=localStorage.getItem("authParents");
    if(authParents){
        authParents = JSON.parse(authParents);
        console.log(authParents.data.auth.password)
    }
    useEffect(()=> {
        setInputs({
            name:authParents.data.auth.name,
            email:authParents.data.auth.email,
            address:authParents.data.auth.address,
            phone:authParents.data.auth.phone,
        });
    },[])
    
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        const isAlpha = /^[a-zA-Z\s]+$/;
        const normalizedInput = unidecode(inputs.name);
        if (!isAlpha.test(normalizedInput)) {
          errorSubmit.name = "Please do not include special characters and numbers";
          flag = false;
        } 
        if(inputs.phone.length != 10){
            errorSubmit.phone ="Incorrect telephone number";
            flag= false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }else{
            const data={
                id:authParents.data.auth.id,
                name:inputs.name,
                email:inputs.email,
                password:"",
                phone:inputs.phone,
                address:inputs.address,
                id_country:selectedCountry,
                id_district:selectedDistrict,
            }
            axios.post("http://localhost/projectnew/public/api/member/update",data)
            .then(response=>{
                console.log(response)
                    // Cập nhật trạng thái trong ReactJS
                setInputs({
                    name:response.data.member.name,
                    email:response.data.member.email,
                    address:response.data.member.address,
                    phone:response.data.member.phone,
                })
                var authUpdateParents={}
                authUpdateParents.data={}
                authUpdateParents.data.auth=response.data.member
                    
                localStorage.setItem("authParents",JSON.stringify(authUpdateParents))
                setModalVisible(true);
            })
        }
    }
    function renderModal(){
        return (
            <div>
              {/* Your existing code */}
              {isModalVisible && (
                <div className="modal modal-notification" id="myModal" style={{ display: isModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header mb-2">
                      <h4 className="modal-title">
                        Notification
                      </h4>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body mb-2">
                        Edited information successfully
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => setModalVisible(false)}
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
        <div id="EditAccountMember">
            <div className="container mb-4">
                <div className="row">
                    <div className="col-sm-3 background-container mb-5">
                        <Link to="/memberParents/PostHistory" ><p>Post History </p></Link>
                        <Link to="/memberParents/ViewSaveTutor" href ><p>Tutor Saved </p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse show">
                            <ul>
                                <li><Link className="fs-14 red" to="/memberParents/UpdateMember">Edit personal information</Link></li>
                                <li><Link className="fs-14" to="/memberParents/ChangePassword">Change Password</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9 padding">
                    <div className="EditAccountMember-title">
                        <p className="mbt-0">Edit Account</p>
                    </div>
                    <div className="border-bt" />
                    <div className="form-edit">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-sm-6">
                                <div>
                                    <label htmlFor>Full name <span class="red"> *</span></label>
                                    <input type="text" required name="name" value={inputs.name} onChange={handleInput}/>
                                </div>
                                <div>
                                    <label htmlFor>Email Address <span class="red"> *</span></label>
                                    <input type="text" required readOnly value={inputs.email}/>
                                </div>
                                <div>
                                    <label htmlFor>District<span class="red"> *</span></label>
                                    <District selectedCountry={selectedCountry} selectedDistrict={handleDistrictSelect}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    <label htmlFor>Phone number <span class="red"> *</span></label>
                                    <input type="text" required name="phone" value={inputs.phone} onChange={handleInput}
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
                                    <label htmlFor>Province/City:<span class="red"> *</span></label>
                                    <Country onSelectCountry={handleCountrySelect}/>
                                </div>
                                <div>
                                    <label htmlFor>Address <span class="red"> *</span></label>
                                    <input type="text" required name="address" value={inputs.address} onChange={handleInput}/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="btn-edit">
                                    <button className="btn btn-success">Save</button>
                                </div>
                            </div>
                            <Error errors={errors}/>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {renderModal()}
        </div>
    )
}
export default UpdateMember;