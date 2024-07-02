
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Formik, Form, Field,} from "formik";
import AddLocationMachineModal from "./AddLocationMachineModal"
import { Select} from "../../../../Components/UI/Elements";

import {createLoCell, getLoCell,deleteLocationCell,handleLocationMachineModal} from "./LocationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getUserByLocationDepartment } from "../../../Main/Account/AccountAction"

const { Option } = Select;



const LocationCellForm = (props) => {
  const [currentItems, setCurrentItems] = useState("");
    useEffect(()=>{
        // props.getDepartments();
        props.getLoCell(props.storedLoc.locationDetailsId,props.orgId);
    },[]);

    const handleDelete = (item) => {
      // let data = {
      // active:false,
      //   reason: "",
      //   productId:item.productId,
      // };
       props.deleteLocationCell(item.cellChamberLinkId);
    };


    function handleSetCurrentItems(item) {
      setCurrentItems(item);
      // console.log("opp",item);
    }

    return (
      <>
       <Formik

                    initialValues={{
                        userId:props.userId,
                        orgId:props.orgId,
                        locationDetailsId:props.storedLoc.locationDetailsId,
                        cell:"",
                        cellUnit:"",
                        description:"" ,
                    }}
       
                    onSubmit={(values, { resetForm }) => {
                        props.createLoCell({
                            ...values,
                            cellUnit:parseInt(values.cellUnit)
                            
                        },
                 
                        );
                        resetForm();
                    }
                    }
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        ...rest
                    }) => (
                        <Form>
                            <div class=" flex" >
                                <div class=" w-full ">

                                    <div class="flex justify-between">
                                        <div class=" w-[18%] ml-2" >
                                            <Field
                                                name="cell"
                                                isColumn
                                                label="Cell Code"
                                                component={InputComponent}
                                                inlineLabel
                                               
                                            />
                                        </div>
                                        <div class=" w-[18%]" >
                                            <Field
                                        
                                                name="cellUnit"
                                                isColumn
                                                label="#Cell"
                                                component={InputComponent}
                                                inlineLabel
                                                
                                            />
                                        </div>
                                        <div class=" w-[18%]" >
                                            <Field
                                         
                                                name="description"
                                                isColumn
                                                label="Description"
                                                component={InputComponent}
                                                inlineLabel
                                                
                                            />
                                        </div>
        <div>
                                        
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.creatingLocationCell}
                                    style={{
                                        marginTop: "20px",
                                      
                                    }}
                                >
                                    Submit
                                </Button>
                                </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik>


                <div className=' flex mt-1 sticky h-[31rem] z-auto'>
        <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
          
            {/* <div className=" md:w-[6rem]">Cell Code</div> */}
            <div className=" md:w-[4.2rem] ">#Cell</div> 
            <div className=" md:w-[5.1rem]">Description</div>
            <div className="w-12"></div>
                         </div>
                         <div className="z-auto"
                         class=" overflow-x-hidden overflow-y-auto sticky">
           {props.showLoCell.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">

                  {/* <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                    {item.cell}
                    </div>
                  </div> */}

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs  font-poppins">
                    
                      <div className="font-normal text-sm  font-poppins">
                        <div>   {item.cellChamber} </div>
                      </div>
                    
                    </div>

                  </div>
                  {/* <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                    
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.zoneType}</div>
                      </div>
                  
                    </div>
                  </div> */}
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                 
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.description}</div>
                      </div>
                  
                  </div>

                 



                  <div class="flex md:items-center">


                        <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                          <div>
                          
                        <Button
                        onClick={() => {
                          props.handleLocationMachineModal(true);
                          handleSetCurrentItems(item);
                        }}
                        >Machine</Button>
                          </div>

                        </div>
                     </div>
                     <div class="flex  justify-end md:items-center ">


              <div class="flex justify-end  w-20 max-sm:flex-row max-sm:w-[10%]">
                
                
                <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => handleDelete(item)}

                    >
                      
                      <DeleteOutlined
                        type="delete"
                        className=" !text-icon cursor-pointer !text-[red]"
                      />
                  
                    </StyledPopconfirm>
               

              </div>
           </div>
                </div>
              </div>
            );
          })} 
            </div>

        </div>
      </div>
      <AddLocationMachineModal
      currentItems={currentItems}
      locationId={props.storedLoc.locationDetailsId}
      addLocationMachineModal={props.addLocationMachineModal}
      handleLocationMachineModal={props.handleLocationMachineModal}
      
      />
      </>
      
     
     
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    creatingLocationCell:location.creatingLocationCell,
    showLoCell:location.showLoCell,
    departments: departments.departments,
    addLocationMachineModal:location.addLocationMachineModal,
    departmentUser: distributor.departmentUser,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUserByLocationDepartment,
            createLoCell,
            getDepartments,
            getLoCell,
            deleteLocationCell,
            handleLocationMachineModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationCellForm);
