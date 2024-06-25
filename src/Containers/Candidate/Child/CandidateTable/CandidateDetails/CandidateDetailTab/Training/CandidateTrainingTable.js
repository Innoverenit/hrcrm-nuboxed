import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import {  Tooltip } from "antd";
import {
  getCandidateTrainingDetails,
  setCandidateEditingTraining,
  handleUpdateCandidateTrainingModal,
  deleteCandidateTrainingTable,
} from "../../../../../CandidateAction";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
const UpdateCandidateTrainingModal = lazy(()=>import("./UpdateCandidateTrainingModal"));

class CandidateTrainingTable extends Component {
  componentDidMount() {
    const { getCandidateTrainingDetails, candidateId } = this.props;
    getCandidateTrainingDetails(this.props.candidateId);
  }
  render() {
    // console.log(this.props.training);
    const {
      training,
      fetchingCandidateTrainingDetails,
      fetchingCandidateTrainingDetailsError,
      handleUpdateCandidateTrainingModal,
      updateCandidateTrainingModal,
      setCandidateEditingTraining,
      deleteCandidateTrainingTable,
    } = this.props;

  

    if (fetchingCandidateTrainingDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">Course Name</div>
       <div className=" md:w-[8.1rem] ">Start Date</div>
       <div className=" md:w-[8.5rem] ">End Date</div>
       <div className=" md:w-[8.2rem] ">Organization/Institution</div>
       <div className="md:w-[8.5rem]">Grade</div>

      </div>

      
      {training.map((item) => { 

                    return (
                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex font-medium flex-row md:w-[12.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Name
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                              {item.courseName}
                            </div>
                         
       
                   
                      
                        </div>
                      
                          <div className=" flex font-medium flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Refurbish
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            {dayjs(item.startDate).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[15.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            {dayjs(item.endDate).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[11.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                        
                  
                  {item.organization}
               
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                         {item.grade}
                            </div>
                          </div>
                    
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                            <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                <DownloadIcon
                  type="download"
                  style={{ cursor: "pointer",fontSize:"0.8rem" }}
                />
              </a>
                            </div>
            
                            <div></div>
                          </div>
                     
                      
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  style={{ cursor: "pointer", fontSize: "1rem" }}
                                  onClick={() => {
                                    setCandidateEditingTraining(item);
                                    handleUpdateCandidateTrainingModal(true);
                                  }}
                                />
                              </Tooltip>
                            </div>
                       
                            <div></div>
                          </div>
                          </div>
                      </div>
                    </div>


                    )
                })}
      </div>
      </div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          columns={columns}
          dataSource={training}
          Loading={
            fetchingCandidateTrainingDetails ||
            fetchingCandidateTrainingDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        /> */}
        <UpdateCandidateTrainingModal
          updateCandidateTrainingModal={updateCandidateTrainingModal}
          handleUpdateCandidateTrainingModal={
            handleUpdateCandidateTrainingModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  training: candidate.candidateTrainingDetails,
  fetchingCandidateTrainingDetails: candidate.fetchingCandidateTrainingDetails,
  fetchingCandidateTrainingDetailsError:
    candidate.fetchingCandidateTrainingDetailsError,
  candidateId: candidate.candidate.candidateId,
  updateCandidateTrainingModal: candidate.updateCandidateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateTrainingDetails,
      handleUpdateCandidateTrainingModal,
      deleteCandidateTrainingTable,
      setCandidateEditingTraining,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateTrainingTable);
