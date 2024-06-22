import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
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
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { Tooltip } from "antd";
const UpdateTrainingModal = lazy(() =>
  import("./UpdateTrainingModal")
);


class TrainingTable extends Component {
  componentDidMount() {
    const { getTrainingDetails, employeeId } = this.props;
    getTrainingDetails(employeeId);
  }
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
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>

<div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[13.5rem]">
        <FormattedMessage
                  id="app.courseName"
                  defaultMessage="Course Name"
                /></div>
 
        <div className="md:w-[10.1rem]">  <FormattedMessage id="app.startDate" defaultMessage="Start Date" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.organization"
          defaultMessage="Organization/Institution"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.grade" defaultMessage="Grade" /></div>

                      
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {training =="" ? "No data":training.map((item) => { 
        
        
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
                                                
      {item.courseName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins">
                                  <span className="font-poppins">{dayjs(item.startDate).format("YYYY/MM/DD")}</span>
                                  </div>
                              </div>

                              <div className=" flex font-medium flex-col md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm text-cardBody font-poppins">
                                {item.organization}
                                </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-sm text-cardBody font-poppins">
                 
                     <div className="font-normal text-sm text-cardBody font-poppins">
                       <span>{item.grade}</span>
                     </div>
                 
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
                  {user.userAccessInd === true ? (
                <DownloadIcon
                  type="download"
                  // onClick={() => startDownload()}
                  style={{ cursor: "pointer",fontSize:"1rem" }}
                />
                  ):null}
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <BorderColorIcon
            style={{ cursor: "pointer",fontSize: "1rem" }}
            onClick={() => {
              setEditTraining(item);
              handleUpdateTrainingModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
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
