import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getEducationDetails,
  handleUpdateEducationModal,
  setEditEducation,
} from "../../../../../../Profile/ProfileAction";
import DownloadIcon from "@mui/icons-material/Download";
import { base_url } from "../../../../../../../Config/Auth";
import { deleteEducationTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
const UpdateEducationModal = lazy(() => import("../../../../EmployeeGroup/EmployeeDetails/EmployeeTab/Education/UpdateEducationModal"));

class EducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getEducationDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getEducationDetails(employeeId);
    }
  }

  render() {
    console.log(this.props.employeeId);
    const {
      eduDetails,
      fetchingEducationDetails,
      fetchingEducationDetailsError,
      handleUpdateEducationModal,
      updateEducationModal,
      singleEmployee,
      user,
      setEditEducation,
      employeeId,
      deleteEducationTable,
    } = this.props;
    console.log(employeeId);

  

    if (fetchingEducationDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
       <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.5rem]">
        <FormattedMessage
                  id="app.type"
                  defaultMessage="Type"
                /></div>
 
        <div className="md:w-[10.1rem]">  <FormattedMessage id="app.courseName" defaultMessage="Course Name" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.yearOfPassing"
          defaultMessage="Year of Passing"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.college" defaultMessage="School /College" /></div>

                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.MarksSecured" defaultMessage="Marks Secured" /></div>
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {eduDetails=="" ? "No data" :eduDetails.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
      {item.educationType}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins">
                                  {item.courseName}
                                  </div>
                              </div>

                              <div className=" flex font-medium flex-col md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm text-cardBody font-poppins">
                                {item.yearOfPassing}
                                </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-sm text-cardBody font-poppins">
                 
                     <div className="font-normal text-sm text-cardBody font-poppins">
                       <span>{item.university}</span>
                     </div>
                 
                                   </div>
                               </div>

                               <div className=" flex font-medium flex-col md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm text-cardBody font-poppins">
                                <span>
              {item.marksSecured} {item.marksType}
            </span>
                                </div>
                            </div>
                              </div>
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
            {item.documentId ? (
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                {user.userAccessInd ? (
                <DownloadIcon 
                  type="download"
                  // onClick={() => startDownload()}
                  style={{ cursor: "pointer",fontSize: "1rem", }}
                />
                ):null}
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <BorderColorIcon 
            style={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={() => {
              setEditEducation(item);
              handleUpdateEducationModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteEducationTable(item.id)}
          >
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
            />
          </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
      
        {/* <StyledTable
     
          columns={columns}
          dataSource={eduDetails}
          Loading={fetchingEducationDetails || fetchingEducationDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        /> */}

        <UpdateEducationModal
          updateEducationModal={updateEducationModal}
          handleUpdateEducationModal={handleUpdateEducationModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile,auth, employee }) => ({
  eduDetails: profile.eduDetails,
  user:auth.userDetails,
  updateEducationModal: profile.updateEducationModal,
  fetchingEducationDetails: profile.fetchingEducationDetails,
  fetchingEducationDetailsError: profile.fetchingEducationDetailsError,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducationDetails,
      handleUpdateEducationModal,
      setEditEducation,
      deleteEducationTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
