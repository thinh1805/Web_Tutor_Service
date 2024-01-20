import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header(){
  const navigate = useNavigate();
  var authParents = localStorage.getItem("authParents")
  var authTutor = localStorage.getItem("authTutor")
  var authAdmin = localStorage.getItem("authAdmin")
    if(authParents){
      authParents=JSON.parse(authParents);
      console.log(authParents)
      var active = authParents.data.auth.active 
    }
    if(authTutor){
      authTutor = JSON.parse(authTutor)
    }
    if(authAdmin){
      authAdmin = JSON.parse(authAdmin)
    }

    function renderMemberVip(){
      if(active == 0){
        return(
          <li><Link to="/memberParents/UpdateAccount" className="dropdown-item">Upgrade Account</Link></li>
        )
      }
    }

    function renderUser(){
      if(active ==1){
        return(
          <span className="ml-10 yellow"><i className="fa-solid fa-crown"></i></span>
        )
      }
    }
    function renderLogin(){
      if(authParents){
          return(
            <div>
              <div className="dropdown">
                <a data-bs-toggle="dropdown">
                  <i className="fa-solid fa-user"></i>
                </a>
                {renderUser()}
                <ul className="dropdown-menu">
                  <li><Link to="/memberParents/PersonalInfo" className="dropdown-item">Information</Link></li>
                  {renderMemberVip()}
                  <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#myModal">Logout</button></li>
                </ul>
                <div className="modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      {/* Modal Header */}
                      <div className="modal-header">
                        <h4 className="modal-title mb-4">Do You Want To Sign Out?</h4>
                      </div>
                      {/* Modal body */}
                      {/* Modal footer */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-yes" data-bs-dismiss="modal" onClick={logout}>Yes</button>
                        <button type="button" className="btn btn-danger btn-no" data-bs-dismiss="modal">No</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      }else if(authTutor){
        return(
          <div>
            <div>
              <div className="dropdown">
                <a data-bs-toggle="dropdown">
                  <i class="fa-solid fa-user"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/memberTutor/PersonalInfoTutor" className="dropdown-item" >Information</Link></li>
                  <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#myModal">Logout</button></li>
                </ul>
                <div className="modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      {/* Modal Header */}
                      <div className="modal-header">
                        <h4 className="modal-title mb-4">Do You Want To Sign Out?</h4>
                      </div>
                      {/* Modal body */}
                      {/* Modal footer */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-yes" data-bs-dismiss="modal" onClick={logout}>Yes</button>
                        <button type="button" className="btn btn-danger btn-no" data-bs-dismiss="modal">No</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }else if(authAdmin){
        return(
          <div>
            <button className="btn" data-bs-toggle="modal" data-bs-target="#myModal"><i class="fa-solid fa-right-from-bracket"></i></button>
            <div className="modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      {/* Modal Header */}
                      <div className="modal-header">
                        <h4 className="modal-title mb-4">Do You Want To Sign Out?</h4>
                      </div>
                      {/* Modal body */}
                      {/* Modal footer */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-yes" data-bs-dismiss="modal" onClick={logout}>Yes</button>
                        <button type="button" className="btn btn-danger btn-no" data-bs-dismiss="modal">No</button>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        )
        
      }
      else{
          return(
            <div>
              <Link to="/memberParents/LoginParents" className="btn header-btn-login"><i className="fa-solid fa-right-to-bracket" />  Login</Link>
              <Link to="/memberParents/RegisterParents" className="btn header-btn-register ml-5"><i className="fa-solid fa-user-plus" />  Register</Link>
            </div>
          )
      }
    }
    function logout(){  
      if(authParents){
        navigate("/memberParents/LoginParents")
      }else if(authTutor){
        navigate("/memberTutor/LoginTutor")
      }else{
        navigate("/Admin/LoginAdmin")
      }
      localStorage.clear();
    }
    function renderPost(){
      if(authParents){
        return(
          <Link to="/memberParents/ViewPost">Posts</Link>
        )
      }else if(authTutor){
        return(
          <Link to="/memberTutor/ViewPostTutor">Posts</Link>
        )
      }else if(authAdmin){
        return(
          <div></div>
        )
      } 
    }
    function renderTutor(){
      if(authParents){
        return(
          <Link to="/memberParents/ViewListTutor">Tutor</Link>
        )
      }
    }
    function Search(){
      if(authParents){
        return(
          <Link to="/memberParents/SearchTutor">Search</Link>
        )
      }else if(authTutor){
        return(
          <Link to="/memberTutor/SearchPost">Search</Link>
        )
      }
    }
    function renderDashBoard(){
      if(authAdmin){
        return(
          <Link to="/Admin/Dashboard">DashBoard</Link>
        )
      }
    }
    return(
      <div>
        <div id="header">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="header-main">
                  <div className="header-logo">
                    <Link to="/"><img src={"http://localhost/projectnew/public/image/Image12.jpg"} alt={8888} /></Link>
                  </div>
                  <h6>Tutor Search <br />
                    <span>Service</span></h6>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="header-contact">
                  <div className="header-contact-gmail"><span><i className="fa-regular fa-envelope" /> </span>C1SE.42@gmail.com<span className="header-contact-border-right" /></div>
                  <div className="header-contact-phone"><span><i className="fa-solid fa-phone" /> </span>0777118502</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="header-login">
                  {renderLogin()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-page">
          <div className="header-page-home">
            <Link to="/">
              <i className="fa-solid fa-house" />  Home
            </Link>
          </div>
          <div className="header-page-menu">
            {renderPost()}
            {renderTutor()}
            {renderDashBoard()}
            <a href>Blog</a>
            <Link to="/AboutUs">About us</Link>
            {Search()}
          </div>
        </div>
      </div>
    )
}
export default Header;