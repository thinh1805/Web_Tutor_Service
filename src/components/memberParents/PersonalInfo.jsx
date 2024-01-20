import { Link } from "react-router-dom";
function PersonalInfo(){
    return(
        <div className="container mb-4">
          <div className="row">
            <div className="col-sm-3 background-container mb-5">
                        <Link to="/memberParents/PostHistory" ><p>Post History </p></Link>
                        <Link to="/memberParents/ViewSaveTutor" href ><p>Tutor Saved </p></Link>
                        <a data-bs-toggle="collapse" className="mb-3 arrow-link" data-bs-target="#demo"><p className="no-b-bt">Personal information <i className="fa-solid fa-chevron-down arrow-icon" /></p></a>
                        <div id="demo" className="collapse">
                        <ul>
                            <li><Link className="fs-14" to="/memberParents/UpdateMember">Edit personal information</Link></li>
                            <li><Link className="fs-14 " to="/memberParents/ChangePassword">Change Password</Link></li>
                        </ul>
                    </div>
            </div>
          </div>
        </div>
    )
}
export default PersonalInfo;