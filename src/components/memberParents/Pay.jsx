import axios from "axios";
import { useEffect, useState } from "react";
function Pay(){
      const[Pay,setPay]=useState(5000);
      let authParents=localStorage.getItem("authParents");
      if(authParents){
        authParents = JSON.parse(authParents);
      }
      function handlePay(e){
            const total={
                id:authParents.data.auth.id,
                Pay
            }
            axios.post("http://localhost/projectnew/public/api/member/payment",total)
            .then(response=>{

                window.location.href = response.data.payUrl;

            })
            .catch(function(error){
                console.log(error);
            })
        }
    return(
        <div id="Pay">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mb-5">
              <div className="pay-title">
                <p className="mbt-0">Upgrade Account</p>
              </div>
              <div className="border-bt mb-4" />
            </div>
            <div className="row justify-content-center mb-5">
                <div className="col-sm-5 mb-4">
                <div className="pay-container center">
                    <div className="UpdateAccount-package mb-4">
                        <p className="mbt-0">Uprade Account</p>
                    </div>
                    <div className="UpdateAccount-money mb-4">
                        <h3>500.000đ</h3>
                    </div>
                    <div className="UpdateAccount-package-detail mb-5 start">
                    <li>Advanced search</li>
                    <li>Rating and Feedback</li>
                    <li>View rating and feedback <br />
                    in tutor profile</li>
                    </div>
                    <div className="button-container mt-5">
                    <div>
                        <button className="btn btn-success btn-pay" onClick={handlePay}>Pay</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Pay;
