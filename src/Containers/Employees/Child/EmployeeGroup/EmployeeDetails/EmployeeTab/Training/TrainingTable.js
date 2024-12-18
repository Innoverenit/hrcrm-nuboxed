import React, { Component,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  getTrainingDetails,
  setEditTraining,
  handleUpdateTrainingModal,
} from "../../../../../../Profile/ProfileAction";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { deleteTrainingTable } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import { Tooltip } from "antd";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const EmptyPage = lazy(() => import("../../../../../../Main/EmptyPage"));
const UpdateTrainingModal = lazy(() =>
  import("./UpdateTrainingModal")
);


class TrainingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    const { getTrainingDetails, employeeId } = this.props;
    getTrainingDetails(employeeId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
      
        "1692",//Course Name
        "176",//2Start Date
        "15",//3Organization/
        "1178"//" "Grade
        // Institution
      
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  render() {
    console.log(this.props.training);
    const {
      training,
      fetchingTrainingDetails,
      fetchingTrainingDetailsError,
      handleUpdateTrainingModal,
      updateTrainingModal,
      setEditTraining,
      user,
      deleteTrainingTable,
    } = this.props;

  

    if (fetchingTrainingDetailsError) {
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>

<div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky font-poppins text-lm  z-10">
          <div className=" text-[#00A2E8] text-sm max-md:w-[13.5rem] w-[13.5rem]"><CalendarMonthIcon className=" !text-icon"/> {this.state.translatedMenuItems[0]}</div>
 
        <div className="max-md:w-[10.1rem] w-[10.1rem]">  <MenuBookIcon className=" !text-icon text-[#006600]"/> {this.state.translatedMenuItems[1]}</div>
                 <div className="max-md:w-[10.1rem] w-[10.1rem]"><SchoolIcon className=" !text-icon text-[#4B2206]"/> {this.state.translatedMenuItems[2]}</div>
                       <div className=" max-md:w-[8.1rem] w-[8.1rem]"><GradingIcon className=" !text-icon text-[#D64045]"/> {this.state.translatedMenuItems[3]}</div>

                      
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {training =="" ? <EmptyPage/>:training.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded justify-between  mt-[0.5rem]  items-center p-1"
                                >
                                     
                                     <div className=" flex h-8 border-l-2 border-green-500 bg-[#eef2f9] md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md: w-[8rem]">
                                          
                                            <div class="text-xs  text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.courseName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs   font-poppins">
                                  <span className="font-poppins">{dayjs(item.startDate).format("YYYY/MM/DD")}</span>
                                  </div>
                              </div>

                              <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center  md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs   font-poppins">
                                {item.organization}
                                </div>
                            </div>
                            <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-xs   font-poppins">
                 
                     <div className=" text-xs   font-poppins">
                       <span>{item.grade}</span>
                     </div>
                 
                                   </div>
                               </div>

                          
                              </div>
                              <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-end">
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
                              {item.documentId ? (
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                  {user.userAccessInd === true ? (
                <DownloadIcon
                  type="download" className=" !text-icon cursor-pointer"
                  // onClick={() => startDownload()}
                 
                />
                  ):null}
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs   font-poppins text-center">
                                    <BorderColorIcon
                                        className=" !text-icon"
                                          onClick={() => {
                                            setEditTraining(item);
                                            handleUpdateTrainingModal(true);
                                          }}
                                   />

                                    </div>
                                </div>
                                <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs   font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteTrainingTable(item.id)}
          >
            <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"1rem", color: "red" }} />
          </StyledPopconfirm>

                                    </div>
                                </div>

                              </div>
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          columns={columns}
          dataSource={training}
          Loading={fetchingTrainingDetails || fetchingTrainingDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}
        <UpdateTrainingModal
          updateTrainingModal={updateTrainingModal}
          handleUpdateTrainingModal={handleUpdateTrainingModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile,auth, employee }) => ({
  training: profile.trainingDetails,
  user:auth.userDetails,
  fetchingTrainingDetails: profile.fetchingTrainingDetails,
  fetchingTrainingDetailsError: profile.fetchingTrainingDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateTrainingModal: profile.updateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTrainingDetails,
      handleUpdateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTable);
