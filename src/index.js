import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import AboutUs from './components/About';
/*phụ huynh*/
import RegisterParents from './components/memberParents/Register-parent';
import LoginParents from './components/memberParents/LoginParents';
import CreatePost from './components/memberParents/CreatePost';
import ViewPost from './components/memberParents/ViewPost';
import PersonalInfo from './components/memberParents/PersonalInfo';
import PostHistory from './components/memberParents/PostHistory';
import EditPost from './components/memberParents/EditPost';
import SearchTutor from './components/memberParents/SearchTutor';
import Pay from './components/memberParents/Pay';
import UpdateMember from './components/memberParents/UpdateMember';
import ViewListTutor from './components/memberParents/ViewListTutor';
import ViewSaveTutor from './components/memberParents/ViewSaveTutor';
import ForgotPasswordMember from './components/memberParents/ForgotPasswordMember';
import ChangePassword from './components/memberParents/ChangePassword';
/*gia sư*/
import RegisterTutor from './components/memberTutor/Register-tutor';
import RegisterProfileTutor from './components/memberTutor/Register-profile-tutor';
import LoginTutor from './components/memberTutor/LoginTutor';
import ViewPostTutor from './components/memberTutor/ViewPostTutor';
import PersonalInfoTutor from './components/memberTutor/PersonalInfoTutor';
import ViewSavePostForTutor from './components/memberTutor/ViewSavePostForTutor';
import ViewDetailTutor from './components/memberParents/ViewDetailTutor';
import SearchPost from './components/memberTutor/SearchPost';
import UpdateTutor from './components/memberTutor/UpdateTutor';
import ChangePasswordTutor from './components/memberTutor/ChangePasswordTutor';
import ForgotPasswordTutor from './components/memberTutor/ForgotPasswordTutor';
import AppointmentSuccessfully from './components/memberTutor/AppointmentSuccessfully';
import AppointmentRefused from './components/memberTutor/AppointmentRefused';
/*Admin*/
import LoginAdmin from './components/Admin/LoginAdmin';
import Dashboard from './components/Admin/Dashboard';
import UserAccount from './components/Admin/UserAccount';
import ViewDetailProfileTutor from './components/Admin/ViewDetailProfileTutor';
import Post from './components/Admin/Post';
import UserStatictis from './components/Admin/UserStatictis';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home/>}></Route>
          <Route path="/AboutUs" element={<AboutUs/>}> </Route>
          {/*Admin*/}
          <Route path="/Admin/LoginAdmin" element={<LoginAdmin/>}> </Route>
          <Route path="/Admin/Dashboard" element={<Dashboard/>}> </Route>
          <Route path="/Admin/Dashboard/UserAccount" element={<UserAccount/>}> </Route>
          <Route path="/Admin/Dashboard/ViewDetailProfileTutor/:id" element={<ViewDetailProfileTutor/>}> </Route>
          <Route path="/Admin/Dashboard/Post" element={<Post/>}> </Route>
          <Route path="/Admin/Dashboard/UserStatictis" element={<UserStatictis/>}></Route>

          {/* phụ huynh */}
          <Route path="/memberParents/RegisterParents" element={<RegisterParents/>}> </Route>
          <Route path="/memberParents/LoginParents" element={<LoginParents/>}> </Route> 
          <Route path="/memberParents/CreatePost" element={<CreatePost/>}> </Route>
          <Route path="/memberParents/ViewPost" element={<ViewPost/>}> </Route>
          <Route path="/memberParents/PersonalInfo" element={<PersonalInfo/>}> </Route>
          <Route path="/memberParents/PostHistory" element={<PostHistory/>}> </Route>
          <Route path="/memberParents/EditPost/:id" element={<EditPost/>}> </Route>
          <Route path="/memberParents/UpdateMember" element={<UpdateMember/>}> </Route>
          <Route path="/memberParents/ViewListTutor" element={<ViewListTutor/>}> </Route>
          <Route path="/memberParents/ViewDetailTutor/:id" element={<ViewDetailTutor/>}> </Route>
          <Route path="/memberParents/ViewSaveTutor" element={<ViewSaveTutor/>}></Route>
          <Route path="/memberParents/SearchTutor" element={<SearchTutor/>}></Route>
          <Route path="/memberParents/UpdateAccount" element={<Pay/>}></Route>
          <Route path="/memberParents/ForgotPassword" element={<ForgotPasswordMember/>}></Route>
          <Route path="/memberParents/ChangePassword" element={<ChangePassword/>}></Route>
          {/*gia sư  */}
          <Route path="/memberTutor/RegisterTutor" element={<RegisterTutor/>}> </Route>
          <Route path="/memberTutor/RegisterProfileTutor" element={<RegisterProfileTutor/>}></Route>
          <Route path="/memberTutor/LoginTutor" element={<LoginTutor/>}> </Route>
          <Route path="/memberTutor/ViewPostTutor" element={<ViewPostTutor/>}></Route>
          <Route path="/memberTutor/PersonalInfoTutor" element={<PersonalInfoTutor/>}> </Route>
          <Route path="/memberTutor/ViewSavePostForTutor" element={<ViewSavePostForTutor/>}></Route>
          <Route path="/memberTutor/SearchPost" element ={<SearchPost/>}></Route>
          <Route path="/memberTutor/UpdateTutor" element={<UpdateTutor/>}> </Route>
          <Route path="/memberTutor/ChangePasswordTutor" element={<ChangePasswordTutor/>}></Route>
          <Route path="/memberTutor/ForgotPasswordTutor" element={<ForgotPasswordTutor/>}></Route>
          <Route path="/memberTutor/AppointmentSuccessfully" element={<AppointmentSuccessfully/>}></Route>
          <Route path="/memberTutor/AppointmentRefused" element={<AppointmentRefused/>}></Route>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
