
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
//import { CustomizeInputComponent } from "../../../../Components/Forms/Formik/CustomizeInputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { Select, StyledLabel } from "../../../../Components/UI/Elements";
import * as Yup from "yup";
import { getDeletedLoCell} from "./LocationAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import ReInstateLocCellToggle from "./ReInstateLocCellToggle";

const { Option } = Select;



const ReinstateCellTable = (props) => {
    useEffect(()=>{
        
        props.getDeletedLoCell(props.storedLoc.locationDetailsId,props.orgId);
    },[]);

      if (props.fetchingDeletedLocationCell) {
    return <BundleLoader />;
  }

    return (
      <>
     


                <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
          
            <div className=" md:w-[6rem]">Cell Code</div>
            <div className=" md:w-[4.2rem] ">#Cell</div> 
            <div className=" md:w-[5.1rem]">Description</div>
            <div className="w-12"></div>
                         </div>
                         {/* <div className="z-auto" style={{ maxHeight: "500px", overflowX: "hidden",overflowY:"auto",position: "sticky" }}>
           {props.deletedLoCell.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">

                  <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                    {item.cell}
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs text-cardBody font-poppins">
                    
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.cellUnit}</div>
                      </div>
                    
                    </div>

                  </div>
                
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                 
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.description}</div>
                      </div>
                  
                  </div>

                  <div class="flex md:items-center">


                    <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                    <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateLocCellToggle locationDetailsId={item.locationDetailsId}
                            storedLoc={props.storedLoc} 
                            cellId={item.cellId}/>
                            </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })} 
            </div> */}

        </div>
      </div>

      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    creatingLocationCell:location.creatingLocationCell,
    deletedLoCell:location.deletedLoCell,
    departments: departments.departments,
    departmentUser: distributor.departmentUser,
    fetchingDeletedLocationCell:location.fetchingDeletedLocationCell,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           
            getDeletedLoCell,
        
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReinstateCellTable);
