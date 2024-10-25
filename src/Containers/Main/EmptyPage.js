import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FWLogo from "../../Assets/Images/image 21.png";



const EmptyPage = (props) => {


    return (
        <>
    
           <div className="flex flex-col justify-center items-center h-[90vh]">
          
           <img
                  className="big-logo"
                  src={FWLogo}
                  style={{ width: "24rem"}}
                  alt="Tekorero logo"

                /> 
               <div className=" text-base font-[Poppins]  font-semibold">Nothing there for now</div>
                
                
              
    
  <div
    className="text-xs cursor-pointer underline text-[#6245C6] font-[Poppins] font-medium"
   
  >
    Create 
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
)(EmptyPage);
