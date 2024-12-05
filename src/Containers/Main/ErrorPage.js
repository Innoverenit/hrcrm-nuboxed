import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FWLogo from "../../Assets/Images/Support.jpg";

const ErrorPage = (props) => {
 return (
        <>
           <div className="flex flex-col justify-center items-center  h-[79vh] max-md:[20rem]">         
           <img
                  className="w-18 h-18"
                  src={FWLogo}
                  alt="Tekorero logo"
                /> 
               <div className=" text-base font-poppins font-semibold">Nothing there for now</div>
   
  <div
    className="text-xs cursor-pointer  font-poppins font-medium"
  >
     Contact With Support Team, Thank You.
  </div>
    </div>          
        </>
    );
}
const mapStateToProps = ({ auth}) => ({
   
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorPage);
