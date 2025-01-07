
import React, { useEffect,useState,Suspense, lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Formik, Form, Field,} from "formik";
import { Select} from "../../../../Components/UI/Elements";
import {createLoCell, getLoCell,deleteLocationCell,handleLocationMachineModal} from "./LocationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getUserByLocationDepartment } from "../../../Main/Account/AccountAction";

const  AddLocationMachineModal  = lazy(() => import("./AddLocationMachineModal"));
const { Option } = Select;



const LocationCellForm = (props) => {
  const [currentItems, setCurrentItems] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "1631",  //Cell Code,//0
         "744", //  cell",//1
         "326", // Department,//2
         "1590", // "Select a department",//3
         "1507",//  User 4
          "1633",//  "Select a user"5
          "154",//  Submit6
          "1628",//  Machine7
          "1259",//  Do you want to delete?8
          "147",// "Description"9
          "1634", // Add Multiple10
          "1635",// Add Single11
         
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

    useEffect(()=>{
      
        props.getLoCell(props.storedLoc.locationDetailsId,props.orgId);
    },[]);

    const handleDelete = (item) => {
     
       props.deleteLocationCell(item.cellChamberLinkId);
    };


    function handleSetCurrentItems(item) {
      setCurrentItems(item);

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
                                        <div className=" text-xs font-bold font-poppins"> {translatedMenuItems[0]}</div>
                                            <Field
                                                name="cell"
                                                isColumn
                                                // label="Cell Code"
                                                component={InputComponent}
                                                inlineLabel
                                               
                                            />
                                        </div>
                                        <div class=" w-[18%]" >
                                        <div className=" text-xs font-bold font-poppins"> {translatedMenuItems[1]}</div>
                                            <Field
                                        
                                                name="cellUnit"
                                                isColumn
                                                // label="#Cell"
                                                component={InputComponent}
                                                inlineLabel
                                                
                                            />
                                        </div>
                                        <div class=" w-[18%]" >
                                          <div className=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                                            <Field
                                         
                                                name="description"
                                                isColumn
                                                // label="Description"
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
                                   {translatedMenuItems[10]}   {/* Add Multiple */}
                                </Button>
                                </div>
                                <div class="mt-[1.125rem]">
                                         
                                         <Button
                                     type="primary"
                                     htmlType="submit"
                                     //onClick={handleSaveCell}
                                     //loading={props.creatingLocationCell}
                                     // style={{
                                     //     marginTop: "20px",
                                     //     marginLeft: "286px",
                                     // }}
                                 >
                                 {translatedMenuItems[11]}    {/* Add Single */}
                                 </Button>
                                 </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik>


                <div className=' flex mt-1 sticky h-[31rem] z-auto'>
        <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          
            {/* <div className=" md:w-[6rem]">Cell Code</div> */}
            <div className=" md:w-[4.2rem] "># {translatedMenuItems[1]}</div> 
            <div className=" md:w-[5.1rem]"> {translatedMenuItems[9]}</div>
            <div className="w-12"></div>
                         </div>
                         <div className="z-auto"
                         class=" overflow-x-hidden overflow-y-auto sticky">
           {props.showLoCell.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">

                  {/* <div className=" flex   md:w-[10.1rem] max-sm:w-full  ">
                    <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                    {item.cell}
                    </div>
                  </div> */}

                  <div className=" flex    md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs  font-poppins">
                    
                      <div className="font-normal text-xs  font-poppins">
                        <div>   {item.cellChamber} </div>
                      </div>
                    
                    </div>

                  </div>
                  {/* <div className=" flex   md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                    
                      <div className="font-normal text-xs  font-poppins">
                        <div> {item.zoneType}</div>
                      </div>
                  
                    </div>
                  </div> */}
                  <div className=" flex   md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                 
                      <div className="font-normal text-xs  font-poppins">
                        <div> {item.description}</div>
                      </div>
                  
                  </div>

                 



                  <div class="flex md:items-center">


                        <div class="flex  w-20 max-sm:flex-row max-sm:w-[10%]">
                          <div>
                          
                        <Button
                        onClick={() => {
                          props.handleLocationMachineModal(true);
                          handleSetCurrentItems(item);
                        }}
                        > {translatedMenuItems[7]}</Button>
                          </div>

                        </div>
                     </div>
                     <div class="flex  justify-end md:items-center ">


              <div class="flex justify-end  w-20 max-sm:flex-row max-sm:w-[10%]">
                
                
                <StyledPopconfirm
                      title= {translatedMenuItems[8]}
                      onConfirm={() => handleDelete(item)}

                    >
                      
                      <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                  
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
      <Suspense fallback={<BundleLoader />}>
      <AddLocationMachineModal
      currentItems={currentItems}
      locationId={props.storedLoc.locationDetailsId}
      addLocationMachineModal={props.addLocationMachineModal}
      handleLocationMachineModal={props.handleLocationMachineModal}
      translatedMenuItems={translatedMenuItems}
      translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      
      />
      </Suspense>
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
