import React, { Component ,lazy} from "react";
import { connect } from "react-redux";

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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const EmptyPage = lazy(() => import("../../../../../../Main/EmptyPage"));
const UpdateEducationModal = lazy(() => import("../../../../EmployeeGroup/EmployeeDetails/EmployeeTab/Education/UpdateEducationModal"));

class EducationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    // debugger;
    this.fetchMenuTranslations();
    const { getEducationDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getEducationDetails(employeeId);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "71",//0"Type"
        "1692",//1Course Name
        "1175",//2Year of Passing
        "1176",//3School /College"
        "1177",
        "1178"//" Marks Secured
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

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
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
       <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold  font-poppins !text-lm sticky items-end z-10">
          <div className=" max-md:w-[6.5rem] w-[6.5rem] text-[#00A2E8] text-sm"><MergeTypeIcon className=" !text-icon"/> {this.state.translatedMenuItems[0]} </div>
                <div className="max-md:w-[10.1rem] w-[10.1rem]"><CalendarMonthIcon className=" !text-icon text-[#699CA2]"/>   {this.state.translatedMenuItems[1]}</div>
                 <div className="max-md:w-[10.1rem] w-[10.1rem]"> <MenuBookIcon className=" !text-icon text-[#1E213D]"/>  {this.state.translatedMenuItems[2]}</div>
                       <div className=" max-md:w-[8.1rem] w-[8.1rem]"> <SchoolIcon className=" !text-icon mr-1 text-[#006600]"/>{this.state.translatedMenuItems[3]}/ {this.state.translatedMenuItems[4]}</div>
                       <div className=" max-md:w-[8.1rem] w-[8.1rem]"> <GradingIcon className=" !text-icon text-[#D64045]"/>{this.state.translatedMenuItems[5]}</div>   
                        <div className="max-md:w-[10.2rem] w-[10.2rem]"></div>
                  </div>
       
      {eduDetails=="" ? <EmptyPage/> :eduDetails.map((item) => {        
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-1  items-center py-ygap hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                                >                            
                                <div className=" flex h-8 border-l-2 border-green-500 bg-[#eef2f9]  text-xs md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                  <div className="flex max-sm:w-full items-center"> 

                                    <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full  flex-row   h-8 ml-gap bg-[#eef2f9] items-center justify-center  w-[8rem]">
                                          
                                            <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.educationType}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                                <div className=" flex text-xs md:w-[12.3rem]  h-8 ml-gap bg-[#eef2f9] items-center justify-center   max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs font-poppins">
                                  {item.courseName}
                                  </div>
                              </div>

                              <div className=" flex text-xs md:w-[10.3rem]  h-8 ml-gap bg-[#eef2f9] items-center justify-center   max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs font-poppins">
                                {item.yearOfPassing}
                                </div>
                            </div>
                            <div className=" flex text-xs md:w-[8.2rem]  h-8 ml-gap bg-[#eef2f9] items-center justify-center  max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-xs font-poppins">
                 
                 
                                   </div>
                               </div>

                               <div className=" flex text-xs md:w-[16.3rem]  h-8 ml-gap bg-[#eef2f9] items-center justify-center  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs font-poppins">
                                <span>
              {item.marksSecured} {item.marksType}
            </span>
                                </div>
                            </div>
                              </div>
                              <div className=" flex items-end  h-8 ml-gap bg-[#eef2f9]  justify-center  ">
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
            {item.documentId ? (
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                {user.userAccessInd ? (
                <DownloadIcon 
                  type="download" className=" cursor-pointer !text-icon"
                  // onClick={() => startDownload()}
                
                />
                ):null}
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="text-xs font-poppins text-center">
                                    <BorderColorIcon  className=" cursor-pointer !text-icon"
            onClick={() => {
              setEditEducation(item);
              handleUpdateEducationModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="text-xs font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteEducationTable(item.id)}
          >
            <DeleteIcon
              type="delete" className=" cursor-pointer !text-icon text-red-600"/>
          </StyledPopconfirm>

                                    </div>
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
