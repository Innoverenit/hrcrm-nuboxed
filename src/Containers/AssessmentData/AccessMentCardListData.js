import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Select,Input} from "antd";
import {createAccessMentQues,getAccessmentQues} from "../Accessment/AccessmentAction"
import { StyledPopconfirm } from "../../Components/UI/Antd";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";

// import {getDepartments} from "../../../../Containers/Settings/Department/DepartmentAction"
// import {getUserListLocation} from "../../Child/Location/LocationAction"
// import AddUserCellModal from "./AddUserCellModal"
//import { Select } from "../../../../Components/UI/Elements";




const { Option } = Select;


const AccessMentCardListData = (props) => {
//   console.log(props.storedLoc.locationDetailsId)
//   const [department,setDepartment]=useState("")
//   const[currentItems,setCurrentItems]=useState("")
  const[cell,setCell]=useState("")
//   const[user,setUser]=useState("")
 
    useEffect(()=>{
        props.getAccessmentQues(props.departmentId,props.roleTypeId)
       
    },[props.departmentId,props.roleTypeId]);

 



    // const handleSetCurrentItems=(item)=>{
    //   setCurrentItems(item)
    // }



   



    const handleCellChange=(value)=> {
    
      setCell(value)
      
    }



    const handleSaveCell=()=> {
      let data={
        
        departmentId:props.departmentId,
      
        orgId:props.orgId,
        question:cell,
        roleTypeId:props.roleTypeId,
       
        userId:props.userId,
      }
    
      
      props.createAccessMentQues(data);
      setCell("");
    //   setDepartment("");
    //   setUser("");
     
    }

    const isDataAvailable = Array.isArray(props.accesQues);

    return (
      <>
      <div class="flex justify-between" >
      <div class="ml-2">
{/* <label class="block" >Cell Code</label> */}
<Input
      placeholder="Enter questions"
      style={{ width: 200 }}
      onChange={(e) => handleCellChange(e.target.value)}
      value={cell}
    />
    </div>
   



   
    <div class="mt-[1.125rem]">
                                         
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSaveCell}
                                    //loading={props.creatingLocationCell}
                                    // style={{
                                    //     marginTop: "20px",
                                    //     marginLeft: "286px",
                                    // }}
                                >
                                    Submit
                                </Button>
                                </div>
    
    </div>



    {isDataAvailable ? (
        props.accesQues.length === 0 ? (
          <NodataFoundPage />
        ) : (
          props.accesQues.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]">
                  <div className="w-32 max-md:w-[6.5rem] max-sm:flex-row max-sm:justify-between">
                    <div className="text-xs font-poppins">
                      <div className="font-normal text-sm font-poppins">
                        <div style={{ width: "14em" }}>{item.question}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )
      ) : (
        <div>{
            props.accesQues.message ? <NodataFoundPage />:
        "An error occurred."}</div>
      )} 

       
     

    
      </>
    );
   }

const mapStateToProps = ({ auth,location,assessment,departments,distributor, }) => ({
    userId: auth.userDetails.userId,
orgId:auth.userDetails.organizationId,
accesQues:assessment.accesQues,
    // locationId:auth.userDetails.locationId,
    // allLoCell:location.allLoCell,
    // cellCode:location.cellCode,
    // userCell:location.userCell,
    // addUserCellModal:location.addUserCellModal,
    // departments: departments.departments,
    // userListLocation:location.userListLocation

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createAccessMentQues,
            getAccessmentQues
        //     getAlLoCell,
        //    getDepartments,
        //    getUserListLocation,
        //    createUserCell,
        //    getUserCell,
        //    getCellCode,
        //    deleteUserCell,
        //    handleUserCellModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessMentCardListData);
