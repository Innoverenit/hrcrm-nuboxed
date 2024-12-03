import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../../../../Config/Auth";
import {
  getCandidateEducationDetails,
  setEditCandidateEducation,
} from "../../../../../CandidateAction";
import {  Tooltip } from "antd";
import { handleUpdateCandidateEducationModal } from "../../../../../CandidateAction";
import {
  deleteCandidateEducationTable,
} from "../../../../../CandidateAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
const UpdateCandidateEducationModal = lazy(()=>import("../Education/UpdateCandidateEducationModal"));
class CandidateEducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getCandidateEducationDetails, candidateId } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getCandidateEducationDetails(candidateId);
    }
  }

  render() {
    console.log(this.props.candidateId);
    const {
      eduCandidateDetails,
      fetchingCandidateEducationDetails,
      fetchingCandidateEducationDetailsError,
      handleUpdateCandidateEducationModal,
      updateCandidateEducationModal,
      singleCandidate,
      setEditCandidateEducation,
      candidateId,
      deleteCandidateEducationTable,
    } = this.props;
    console.log(candidateId);

 

    if (fetchingCandidateEducationDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">Type</div>
       <div className=" md:w-[8.1rem]">Course</div>
       <div className=" md:w-[13.1rem] ">Course Type</div>
       <div className=" md:w-[8.5rem] ">Year of Passing</div>
       <div className=" md:w-[8.2rem] ">University/Institute</div>
       <div className="md:w-[8.5rem]">Specialization</div>
       <div className="md:w-[8.5rem]">Marks Secured</div>

      </div>

      
      {eduCandidateDetails.map((item) => { 

                    return (
                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex font-medium flex-row md:w-[20.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Name
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                              {item.educationType}
                            </div>
                         
       
                          <div className=" flex font-medium flex-col md:w-[2.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Country
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
       {item.courseName}
                            </div>
                          </div>
                      
                        </div>
                      
                          <div className=" flex font-medium flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Refurbish
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                          {item.courseType}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[9.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                         {item.yearOfPassing}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[11.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
               {item.university}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                         {item.specialization}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            
            {`${item.marksSecured} ${item.marksType}`}
           </span>
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
                  style={{ cursor: "pointer",fontSize:"1rem" }}
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
                                    setEditCandidateEducation(item);
                                    handleUpdateCandidateEducationModal(true);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteCandidateEducationTable(item.id)}
          >
            
      <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"1rem", color: "red" }} />

          </StyledPopconfirm>
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

        {/* <StyledTable
          columns={columns}
          dataSource={eduCandidateDetails}
          Loading={
            fetchingCandidateEducationDetails ||
            fetchingCandidateEducationDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        /> */}

        <UpdateCandidateEducationModal
          updateCandidateEducationModal={updateCandidateEducationModal}
          handleUpdateCandidateEducationModal={
            handleUpdateCandidateEducationModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate, employee }) => ({
  eduCandidateDetails: candidate.eduCandidateDetails,
  updateCandidateEducationModal: candidate.updateCandidateEducationModal,
  fetchingCandidateEducationDetails:
    candidate.fetchingCandidateEducationDetails,
  fetchingCandidateEducationDetailsError:
    candidate.fetchingCandidateEducationDetailsError,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEducationDetails,
      handleUpdateCandidateEducationModal,
      setEditCandidateEducation,
      deleteCandidateEducationTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEducationTable);
