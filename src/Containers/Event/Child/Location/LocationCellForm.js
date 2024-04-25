
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { Select, StyledLabel } from "../../../../Components/UI/Elements";
import * as Yup from "yup";
import {createLoCell} from "./LocationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getUserByLocationDepartment } from "../../../Main/Account/AccountAction"

const { Option } = Select;



const LocationCellForm = (props) => {
    useEffect(()=>{
        // props.getDepartments();
        // props.getLoCell();
    },[]);



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
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                        <div class=" w-[18%]" >
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
                                        marginLeft: "286px",
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


                {/* <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
            <div className=" md:w-[6rem]">Location Code</div>
            <div className=" md:w-[4.2rem] ">#Cell</div>
         
            <div className=" md:w-[5.1rem]">Description</div>
            <div className="w-12"></div>             </div>

           {props.showLoCell.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                    {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.zone !== undefined ? editedFields[item.roomRackId].zone : item.zone}
                       onChange={(e) => handleUpChange(item.roomRackId, 'zone', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.zone}</div>
                      </div>
                    )}
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs text-cardBody font-poppins">
                    {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.rack !== undefined ? editedFields[item.roomRackId].rack : item.rack}
                       onChange={(e) => handleUpChange(item.roomRackId, 'rack', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.rack}</div>
                      </div>
                    )}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                    {editroomRackId === item.roomRackId ? (
                       <Select
                       classNames="w-32"
                       value={editedFields[item.roomRackId]?.zoneType !== undefined ? editedFields[item.roomRackId].zoneType : item.zoneType}
                       onChange={(value) => handleUpChange(value, item.key, 'zoneType')}
                       >
                       <Option value="entry">Entry</Option>
                      <Option value="exit">Exit</Option>
                      </Select>
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.zoneType}</div>
                      </div>
                    )}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.description !== undefined ? editedFields[item.roomRackId].description : item.description}
                       onChange={(e) => handleUpChange(item.roomRackId, 'description', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.description}</div>
                      </div>
                    )}
                  </div>

                  <div class="flex md:items-center">


                    <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                      <div>
                      {editroomRackId === item.roomRackId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item.roomRackId,item.zone,item.rack,item.zoneType,item.description )}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.roomRackId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.roomRackId)}
                      />
                    )}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })} 

        </div>
      </div> */}

      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    creatingLocationCell:location.creatingLocationCell,
    showLoCell:location.showLoCell,
    departments: departments.departments,
    departmentUser: distributor.departmentUser,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUserByLocationDepartment,
            createLoCell,
            getDepartments
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationCellForm);
