import React, { useEffect, useState,  lazy } from "react";
import { MultiAvatar, MultiAvatar2,  StyledLabel } from '../../Components/UI/Elements'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleIcon from '@mui/icons-material/Circle';
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
    emptyCandidate
    
  } from "../Candidate/CandidateAction";
  import { Link } from 'react-router-dom';
 import{getCountries} from "./../Auth/AuthAction"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select } from "antd";
import styled from 'styled-components'
import { StyledPopconfirm  } from '../../Components/UI/Antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { BundleLoader } from "../../Components/Placeholder";
import { FlexContainer } from '../../Components/UI/Layout'
const AddCandidatesTasksDrawerModal = lazy(() =>
  import("./AddCandidatesTasksDrawerModal")
);
const AddPlayerModal = lazy(() =>
  import("./Child/CandidateTable/AddPlayerModal")
);
const SkillsLoadMore = lazy(() =>
  import("../../Containers/Candidate/Child/CandidateTable/SkillsLoadMore")
);
const UpdateCandidateResumeModal = lazy(() =>
  import("./Child/CandidateTable/UpdateCandidateResumeModal")
);
const UpdateCandidateModal = lazy(() =>
  import("./Child/UpdateCandidate/UpdateCandidateModal")
);
const AddCandidateDrawerModal = lazy(() =>
  import("../Candidate/AddCandidateDrawerModal")
);

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

}=props;
    return (   
            <>
         
              <div class=" h-h72 overflow-auto overflow-x-auto">
              <div class="flex">      
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
                  <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                     <div class="w-7 h-7" >
                   <Tooltip 
                   title={item.country}
                   >
                 
                   </Tooltip>
                   <FlexContainer justifyContent ="space-around">               
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
                      <div class="h-8 overflow-hidden whitespace-nowrap text-lg font-poppins font-bold overflow-ellipsis text-center">
                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`candidate/${item.candidateId}`} title={item.fullName}>
      {item.fullName}
    </Link>                     
                        </div> 
                        </div>
                        {/* {item.Video !== null?( */}
                        <FlexContainer justifyContent ="flex-end">
                           <div >
                           {item.videoClipsId!==null&&( 
                        <Tooltip title="Video">
             
                {/* <FontAwesomeIcon icon={solid("wallet")} /> */}
                <PlayCircleIcon
                
                style={{ color: "grey",fontSize:"0.8rem",cursor: "pointer"}}
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
             <div style={{ cursor: "pointer",padding:"2px"}}
              // style={{ cursor: "pointer" }}
              onClick={() => {
                     props.setEditCandidate(item);
                   handleupdateCandidateResumeModal(true);
                     handleSetCurrentCandidateId(item.candidateId);
                   }}
              >
                <BorderColorIcon
              style={{ color: "grey",fontSize:"1.2rem",padding:"2px" }}/>
              </div>
            
              </FlexContainer>
          </FlexContainer>                  
                        </div>                    
                        <FlexContainer alignItems="baseline">                       
                        <StyledLabel> <SkillsLoadMore 
                        skillList={data} 
                        viewType={props.viewType}
                        /></StyledLabel>
                        
                        <Tooltip  title={item.skillList}>
                        <BuildCircleIcon   style={{fontSize:"1.1rem",color:"#24d8a7",padding:"2px"}}  /> 
                        </Tooltip>            
                        </FlexContainer>                             
                        <div class=" flex flex-row justify-around w-full items-end">
                        <div style={{alignItems:"center"}}>
              <Tooltip title={item.category}>
              <CircleIcon
             style={{ borderRadius: "45%", backgroundColor:
                  item.category === "White" ?"bisque":item.category === "Blue" ?  "#00afff":item.category==="Both"&&"grey",fontSize:"0.8rem" }}/>
              </Tooltip>
              </div>     
                     <span>
                        <Tooltip  title={item.mobileNumber}>
                        <VolumeUpIcon  style={{fontSize:"0.8rem",color:"#24d8a7"}}  />
                        </Tooltip> 
                        </span>
                        <span>
                        <Tooltip  title={item.emailId}>
                   <DraftsIcon 
                   style={{fontSize:"0.8rem",color:"#24d8a7"}}
                  // icon={regular("envelope")}  
                  />
          </Tooltip> 
          </span>
          <Tooltip
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}
          >
            <span
              style={{
                cursor: "pointer",                
              }}
            >
              <LocationOnIcon  style={{fontSize:"0.8rem",color:"grey"}} 
              //  icon={solid("location-dot")}
                />
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
                          <MonitorHeartIcon 
                          // icon={solid('heart-pulse')} 
                          style={{color:"#993333",fontSize:"0.8rem",cursor: "pointer"}} />
                           )}                       
                        </span>
                        <span 
                       className="hover:bg-black"
                        onClick={() => {
                        
                      props.getCandidateTasksInfo(item.candidateId);
                          props.handleCandidatesTasksDrawerModal(true);
                        }}                  
                        >                      
                          <FactCheckIcon
               style={{ fontSize: "large" }}
              />
                        
                        
                        </span>
                      <span>
                        <StyledPopconfirm
            title="Do you want to blacklist?"
            onConfirm={() => props.getBlackListCandidate(item.candidateId)}
          >
            <UpCircleOutlined
              type="up-circle"
              theme="filled"
              style={{ cursor: "pointer",fontSize:"0.8rem",color:"grey" }}
            />
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
  addDrawerCandidatesTasksModal:candidate.addDrawerCandidatesTasksModal

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
        getCandidateTasksInfo
        //getDashboardFunnelRecord
    //   LinkProductInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCardView)