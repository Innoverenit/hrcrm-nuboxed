import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FWLogo from "../../Assets/Images/image 21.png";



const EmptyPage = (props) => {


    return (
        <>
    
           <div className="flex flex-col justify-center items-center  h-[79vh] max-md:[20rem]">
          
           <img
                  className="big-logo w-[15rem]"
                  src={FWLogo}
                //   style={{ width: "10rem"}}
                  alt="Tekorero logo"

                /> 
               <div className=" text-base font-[Poppins]  font-semibold">Nothing there for now</div>
                
                
              
    
  <div
    className="text-xs cursor-pointer  font-[Poppins] font-medium"
   
  >
      Creat a new one to get Started.
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
