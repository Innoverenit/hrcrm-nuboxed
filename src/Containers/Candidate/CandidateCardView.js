import React, { useEffect, useState,  lazy } from "react";
import { MultiAvatar, MultiAvatar2   } from '../../Components/UI/Elements'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleIcon from '@mui/icons-material/Circle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {  Tooltip } from 'antd'
import {
  getCandidateById,
  getCandidateDocument,
  getCandidateTreeMap,
    handleCandidateDrawerModal,
    getTopicsByCandidateId,
    getBlackListCandidate,
    handlePlayerModal,
    setEditCandidate,
    Candidatesorttype,
    handleUpdateCandidateModal,
    handleupdateCandidateResumeModal,
    getCandidateListByUserId,
    handleCandidatesTasksDrawerModal,
    getCandidateTasksInfo,
    emptyCandidate,
    handleemaildrawermodal
    
  } from "../Candidate/CandidateAction";
  import { Link } from 'react-router-dom';
 import{getCountries} from "./../Auth/AuthAction"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select } from "antd";
import { StyledPopconfirm  } from '../../Components/UI/Antd';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { BundleLoader } from "../../Components/Placeholder";
import CandidateRowEmailModal from "./Child/CandidateTable/CandidateRowEmailModal";

const AddCandidatesTasksDrawerModal = lazy(() =>import("./AddCandidatesTasksDrawerModal"));
const AddPlayerModal = lazy(() =>import("./Child/CandidateTable/AddPlayerModal"));
const SkillsLoadMore = lazy(() =>import("../../Containers/Candidate/Child/CandidateTable/SkillsLoadMore"));
const UpdateCandidateResumeModal = lazy(() =>import("./Child/CandidateTable/UpdateCandidateResumeModal"));
const UpdateCandidateModal = lazy(() =>import("./Child/UpdateCandidate/UpdateCandidateModal"));
const AddCandidateDrawerModal = lazy(() =>import("../Candidate/AddCandidateDrawerModal"));

const { Option } = Select;
function CandidateCardView (props) {
  const [page, setPage] = useState(0);
 
useEffect(() => {
  props.getCandidateListByUserId(props.userId,page);
  setPage(page + 1);
}, []);
useEffect(() => {
  return () => props.emptyCandidate();
}, []);
function handleChange(data) {
  props.Candidatesorttype(props.userId,data);
}
const [currentCandidateId, setCurrentCandidateId] = useState("");
function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
  } 
  if (props.fetchingCandidates) {
    return <BundleLoader/>  
;
  }
  const{address,
    reportTypes,
    reportViewType,
    reportType,
    Candidatesort,
    Candidatesorttype,
  }=props;
 const {user,handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,
  setEditCandidate,
  candidateByUserId,
  fetchingCandidates,
  fetchingCandidatesError,
  updateCandidateResumeModal,
  updateCandidateModal,
  handleemaildrawermodal,
  addemaildrawermodal
}=props;
    return (   
            <>
         
              <div class=" h-h86 overflow-auto overflow-x-auto">
              <div class="flex  flex-wrap justify-evenly w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">      
              {props.candidateByUserId.map((item) => {
                console.log("found",item.skillList);
                const data =
                item.skillList === null
                  ? []
                  : item.skillList.filter((skill) => {
                      return skill !== null && skill !== "";
                    });
                    const dataLoc = ` Address : ${item.address &&
                      item.address.length &&
                      item.address[0].address1} 
                     Street : ${item.address &&
                       item.address.length &&
                       item.address[0].street}   
                    State : ${item.address && item.address.length && item.address[0].state}
                   Country : ${(item.address &&
                     item.address.length &&
                     item.address[0].country) ||
                     ""} 
                     PostalCode : ${item.address &&
                       item.address.length &&
                       item.address[0].postalCode} `;
      
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff]  shadow-[#aaa] h-[7.5rem] 
                  text-[#444444] my-3 p-1 ml-3 w-[15vw] flex flex-col  max-sm:w-wk max-sm:ml-0 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                     <div class="flex  w-[100%] justify-between items-center" >
                      <div class="flex  w-[100%] justify-start items-center"> 
                      <Tooltip 
                   title={item.country}
                   >               
                   </Tooltip>  
                      <div >
                          <MultiAvatar2

                           primaryTitle={item.fullName}
                            // imageId={item.imageId ? item.imageId : ''}
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                  
                        <div>
                      {/* <div class="h-8 overflow-hidden whitespace-nowrap text-lg font-poppins font-bold overflow-ellipsis text-center"> */}
                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/candidate/${item.candidateId}`} title={item.fullName}>
      {item.fullName}
    </Link>                     
                        {/* </div>  */}
                        </div>
                        </div>
                        {/* {item.Video !== null?( */}
                        <div class=" flex flex-row justify-end w-full items-center ">  
                           <div >
                           {item.videoClipsId!==null&&( 
                        <Tooltip title="Video">
                <PlayCircleIcon    className=" cursor-pointer !text-icon text-gray-600"
                onClick={() => {
                  props.handlePlayerModal(true);             
                }}
                 />            
            </Tooltip>
                           )}
            </div>
                        {/* ):(null
                          )}
                       */}
             <div className=" flex justify-end cursor-pointer w-full"
              onClick={() => {
                     props.setEditCandidate(item);
                   handleupdateCandidateResumeModal(true);
                     handleSetCurrentCandidateId(item.candidateId);
                   }}
              >
                <BorderColorIcon className="text-red-600 !text-icon"/>
              </div>
            
              </div>
                  
                        </div>                    
                        <div class=" flex flex-row  ">                        
                        <div class=" text-xs font-bold font-poppins text-black"> <SkillsLoadMore 
                        skillList={data} 
                        viewType={props.viewType}
                        /></div>
                        
                        <Tooltip  title={item.skillList}>
                        <MoreHorizIcon className="text-[#24d8a7] !text-icon"/> 
                        </Tooltip>            
                        </div>                             
                        <div class=" flex flex-row justify-around w-full flex-wrap  mb-1 items-center absolute bottom-0">
                        <div className=" items-center">
              <Tooltip title={item.category}>
              <CircleIcon
             style={{ borderRadius: "45%", backgroundColor:
                  item.category === "White" ?"bisque":item.category === "Blue" ?  "#00afff":item.category==="Both"&&"grey",fontSize:"0.8rem" }}/>
              </Tooltip>
              </div>     
                     {/* <span>
                        <Tooltip  title={item.mobileNumber}>
                        <VolumeUpIcon className="text-[#24d8a7] !text-icon" />
                        </Tooltip> 
                        </span> */}
                        <span>
                        <Tooltip  title={item.emailId}>
                   <DraftsIcon className=" !text-icon text-[#24d8a7]"
                  
                   onClick={() => {
                    
                  handleemaildrawermodal(true);
                  // addemaildrawermodal(item.emailId);
                      }}    />
          </Tooltip> 
          </span>
          <span>
                        <Tooltip  title={item.emailId}>
                   <WhatsAppIcon className=" !text-icon text-[#24d8a7]"
                  
                   onClick={() => {
                    
                  handleemaildrawermodal(true);
                  // addemaildrawermodal(item.emailId);
                      }}    />
          </Tooltip> 
          </span>
          <Tooltip
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}
          >
            <span className=" cursor-pointer" >
              <LocationOnIcon className=" !text-icon text-gray-600" />
            </span>
          </Tooltip>         
                        <span 
                      className="hover:bg-black"
                        onClick={() => {
                        
                          props.getCandidateById(item.candidateId );
                          props.getCandidateDocument(item.candidateId );
                          props.getCandidateTreeMap(item.candidateId );
                          props.getTopicsByCandidateId(item.candidateId)
                          props.getCountries();
                          props.handleCandidateDrawerModal(true);
                        }}
                   
                        >{user.pulseAccessInd ===true && ( 
                          <MonitorHeartIcon className=" cursor-pointer !text-icon text-[#993333]"
                        />
                           )}                       
                        </span>
                        <span 
                       className="hover:bg-black"
                        onClick={() => {
                        
                      props.getCandidateTasksInfo(item.candidateId);
                          props.handleCandidatesTasksDrawerModal(true);
                        }}                  
                        >                      
                          <FactCheckIcon className=" cursor-pointer !text-icon"     />
                        
                        
                        </span>
                      <span>
                        <StyledPopconfirm
            title="Do you want to blacklist?"
            onConfirm={() => props.getBlackListCandidate(item.candidateId)}
          >
            <ArrowCircleUpIcon
              type="up-circle"
              theme="filled"
              className=" cursor-pointer !text-icon text-gray-600"  />
          </StyledPopconfirm>
          </span>
          <Tooltip title={item.ownerName}>
                 <span>
                 <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                 />
                </span>
               </Tooltip>
                        </div>                      
                    </div>
                 )  
            })}
              </div>
              </div>
              
              <AddCandidateDrawerModal
              candidate={props.candidate}
              candidateTreeMap={props.candidateTreeMap}
              documentsByCandidateId={props.documentsByCandidateId}
              addDrawerCandidateModal={props.addDrawerCandidateModal}
              handleCandidateDrawerModal={props.handleCandidateDrawerModal}
              countries={props.countries}
              topicsByCandidateId={props.topicsByCandidateId}
           
      />
           
           <AddCandidatesTasksDrawerModal
           handleCandidatesTasksDrawerModal={props.handleCandidatesTasksDrawerModal}
             
              addDrawerCandidatesTasksModal={props.addDrawerCandidatesTasksModal}
              candidateTasksInfoDetails={props.candidateTasksInfoDetails}
              
        
      />
      <CandidateRowEmailModal
       handleemaildrawermodal={props.handleemaildrawermodal}
       addemaildrawermodal={props.addemaildrawermodal}
      />
 <AddPlayerModal
        addPlayerModal={props.addPlayerModal}
        handlePlayerModal={props.handlePlayerModal}
      />
       
       <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
       <UpdateCandidateResumeModal
        handleResponseData={props.handleResponseData}
        responseData={props.responseData}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        updateCandidateResumeModal={updateCandidateResumeModal}
        handleupdateCandidateResumeModal={handleupdateCandidateResumeModal}
      />
            </>
    )
              
}

const mapStateToProps = ({ candidate, auth,dashboard}) => ({
    userId: auth.userDetails.userId,
    user: auth.userDetails,
    candidate: candidate.candidate,
    candidateTreeMap:candidate.candidateTreeMap,
    user: auth.userDetails,
    topicsByCandidateId:candidate.topicsByCandidateId,
    countries:auth.countries,
    updateCandidateModal: candidate.updateCandidateModal,
    updateCandidateResumeModal: candidate.updateCandidateResumeModal,
    documentsByCandidateId: candidate.documentsByCandidateId,
    candidateByUserId: candidate.candidateByUserId,
    addPlayerModal:candidate.addPlayerModal,
    Candidatesort:candidate.Candidatesort,
    candidateId: candidate.candidateByUserId.candidateId,
    addCandidateChoiceModal: candidate.addCandidateChoiceModal,
    addDrawerCandidateModal:candidate.addDrawerCandidateModal,
    orgId: auth.userDetails.organizationId,
    fetchingCandidates: candidate.fetchingCandidates,
  fetchingCandidatesError: candidate.fetchingCandidatesError,
  fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
  fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
  dashboardFunnel:dashboard.dashboardFunnel,
  candidateTasksInfoDetails:candidate.candidateTasksInfoDetails,
  addDrawerCandidatesTasksModal:candidate.addDrawerCandidatesTasksModal,
  addemaildrawermodal:candidate.addemaildrawermodal
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
        getCandidateById,
        emptyCandidate,
        getBlackListCandidate,
        getCandidateTreeMap,
        getTopicsByCandidateId,
        handleUpdateCandidateModal,
        handleCandidatesTasksDrawerModal,
        getCandidateDocument,
        getCountries,
        handleCandidateDrawerModal,
        handlePlayerModal,
        setEditCandidate,
        handleupdateCandidateResumeModal,
        Candidatesorttype,
        getCandidateListByUserId,
        getCandidateTasksInfo,
        handleemaildrawermodal
        //getDashboardFunnelRecord
    //   LinkProductInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCardView)