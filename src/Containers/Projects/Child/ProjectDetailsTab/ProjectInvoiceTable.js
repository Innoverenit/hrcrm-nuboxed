import React, {  Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function ProjectInvoiceTable(props) {
  
    
    return (
      <div>
       <>
       <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm z-10">
        <div className="   flex justify-between w-[92%] font-bold font-poppins !text-lm">

          <div className=" w-[4.12rem] truncate max-xl:w-[11.1rem] max-lg:w-[13.1rem] "></div>
        <div className=" w-[8.1rem] text-[#00A2E8] text-sm truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  "> 
        Invoice ID</div>
      <div className=" flex   w-[8.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem] items-center   justify-center "> 
             Amount </div>

        <div className=" w-[17.4rem] truncate max-xl:w-[7.2rem] max-lg:w-[5.2rem]  ">
        Status</div>
        {/* 333333 */}
      
      
        <div className="w-4"></div>
</div>
      </div>
       </>
      </div>
    );
  }

const mapStateToProps = ({ opportunity, candidate }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInvoiceTable);