import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteCloseOpportunity,
  updateOwneroppById,
  handleOpportunityDrawerModal,
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
  getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
  getAllRecruitmentDetailsByOppId,
  getOpportunitySKill,
  getCloseOpportunity,
  LinkClosedOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import EmptyPage from "../../../Main/EmptyPage";
import { BundleLoader } from "../../../../Components/Placeholder";

function OpportunityCloseCard(props) {
  const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    useEffect(() => {
      if (props.role === "USER" && user.department === "Recruiter") {
        props.getRecruiterList(props.recruiterId);
      } else {
      }
      props.getCloseOpportunity(props.userId, page);
      setPage(page + 1);
    }, []);
  
    const handleLoadMore = () => {
      setPage(page + 1);
        props.getCloseOpportunity(props.userId, page);
    };
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId, opportunityName) {
        setCurrentOpportunityId(opportunityId, opportunityName);
        
      }
    const {
        user,
        closeOpportunity,
        handleUpdateOpportunityModal,
        updateOpportunityModal,
        fetchingCloseOpportunity
      } = props;
      return (    
  <>

      <InfiniteScroll
        dataLength={closeOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCloseOpportunity?<div><BundleLoader/></div> :null}
        height={"86vh"}
      >
<div class="flex  justify-center flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">    
{ !fetchingCloseOpportunity && closeOpportunity.length === 0 ?<EmptyPage/>:closeOpportunity.map((item,index) =>  {
                 
                 var findProbability = 0;
                 return (

                  <div class="rounded-md border-2 bg-[#ffffff]  shadow-[#aaa] h-[16rem] 
                  text-[#444444] w-[20vw] flex flex-col max-sm:w-wk scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">

                      <div class="flex items-center justify-between ">
                      <div>Name</div>
                      <div class="h-8 overflow-hidden whitespace-nowrap text-lg font-poppins font-bold overflow-ellipsis text-center">
                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
                        </div> 
          </div>                  
                 
                        <div class="flex  justify-between">
                            <h3>Customer</h3>
                            <div>{item.customer}</div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                    <div>Sponsor</div> 
                    </div>
                    <div>
                  
            {item.contactName === null ? "None" :
              <MultiAvatar2
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8rrem"}
                imgHeight={"1.8em"}
              />
            }
            
            </div>
                    </div>
                    <div class="flex justify-between">
                    <div>Start Date</div> 
            <div>{dayjs(item.startDate).format("ll")}</div>
                    </div>
                    <div class="flex justify-between">
                    <div>Value</div> 
            <div><span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}
          </span></div>
                    </div>
                    <div class="flex justify-between">
                    <div>Stages</div> 
            <div><span>
            <Dropdown
              overlay={
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      
                    </Menu.Item>
                  </Menu>
                </div>
              }
              trigger={["click"]}
            >
              <Tooltip title={item.stageName}>
                {" "}
                <Progress
                  type="circle"
                  className=" !text-base cursor-pointer text-[red]"
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>
          </span></div>
                    </div>  
                    <div class="flex  justify-between" >
    <div>
    Sales Rep
    </div>
    <span>
            <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
</div>
<div class="flex  justify-between" >
    <div>
    Owner
    </div>
    <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar2
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
           </Tooltip>
</div>
<div class="flex  justify-between" >
                           <div>
                           <Tooltip title='Click to Open'><span
            onClick={() => {
           props.LinkClosedOpportunity(
             item.opportunityId,
             {
               closeInd:false,
             }
                  
           );         
         }}         
       
         >
          <LockIcon
               className=" !text-base cursor-pointer"
              />
            </span>
     </Tooltip> 
     &nbsp;
     <span
         
         className=" cursor-pointer "
              onClick={() => {
                props.getAllRecruitmentByOppId(item.opportunityId);
                props.getAllRecruitmentPositionByOppId(item.opportunityId);
                props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
                props.getAllRecruitmentPositionFilledByOppId(
                  item.opportunityId
                );
                props.getAllRecruitmentDetailsByOppId(item.opportunityId);
                props.handleOpportunityDrawerModal(true);
                props.getOpportunitySKill(item.oppInnitiative);
                handleSetCurrentOpportunityId(item.opportunityName);
              }}
            >
              {user.pulseAccessInd === true && (
                <MonitorHeartIcon
                className=" !text-base cursor-pointer text-[#df9697]"
                 
                />
              )}
            </span>
                           </div>
                           <div>
                           <Tooltip
          title="Edit"
           
        >
            {user.opportunityUpdateInd ===true && (
              
            <span
            className=" !text-base cursor-pointer text-[grey]"
             
                onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <BorderColorIcon
                 className=" !text-base cursor-pointer "
                   style={{fontSize:"0.8rem" }}/>
              </span>
           )}
          </Tooltip>
          &nbsp;
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteCloseOpportunity(item.opportunityId)}
          >
      
             {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
          </StyledPopconfirm>
                           </div>
              </div>           
                      
                       
                        
                    </div>
                 )  
            })}
              </div>
  

      </InfiniteScroll>
      <UpdateOpportunityModal
      opportunityId={currentOpportunityId}
      opportunityName={currentOpportunityId}
      opportunityData={currentOpportunityId}
      updateOpportunityModal={updateOpportunityModal}
      handleUpdateOpportunityModal={handleUpdateOpportunityModal}
      handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
    />

    <AddOpportunityDrawerModal
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
      handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      opportunityName={currentOpportunityId}
      opportunitySkills={props.opportunitySkills}
      allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
      allRecruitmentByOppId={props.allRecruitmentByOppId}
      allRecruitmentPositionFilledByOppId={
        props.allRecruitmentPositionFilledByOppId
      }
      allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
      allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
      handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
      addDrawerOpportunityModal={props.addDrawerOpportunityModal}
    />
  </>
);
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
userId: auth.userDetails.userId,
user: auth.userDetails,
role: auth.userDetails.role,
opportunitySkills: opportunity.opportunitySkills,
recruiterName: opportunity.recruiterName,
recruiterList: opportunity.recruiterList,
fetchingRecruiterList: opportunity.fetchingRecruiterList,
fetchingRecruiterListError: opportunity.fetchingRecruiterListError,
fetchingOpportunity: opportunity.fetchingOpportunity,
fetchingOpportunityError: opportunity.fetchingOpportunityError,
fetchingAllOpportunities: opportunity.fetchingAllOpportunities,
closeOpportunity: opportunity.closeOpportunity,
updateOpportunityModal: opportunity.updateOpportunityModal,
recruiterId: auth.userDetails.userId,
fetchingCloseOpportunity: opportunity.fetchingCloseOpportunity,
fetchingCloseOpportunityError: opportunity.fetchingCloseOpportunityError,
closeOpportunity: opportunity.closeOpportunity,
opportunityByUserId: opportunity.opportunityByUserId,
opportunityId: opportunity.opportunityId,
addDrawerOpportunityModal: opportunity.addDrawerOpportunityModal,
allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
allRecruitmentPositionFilledByOppId:
  opportunity.allRecruitmentPositionFilledByOppId,
allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
allRecruitmentDetailsByOppId: opportunity.allRecruitmentDetailsByOppId,
});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getRecruiterList,
    getOpportunitySKill,
    handleUpdateOpportunityModal,
    handleOpportunityDrawerModal,
    setEditOpportunity,
    deleteCloseOpportunity,
    updateOwneroppById,
    getAllRecruitmentByOppId,
    getAllRecruitmentPositionByOppId,
    getAllRecruitmentAvgTimeByOppId,
    getAllRecruitmentPositionFilledByOppId,
    getAllRecruitmentDetailsByOppId,
    getCloseOpportunity,
    LinkClosedOpportunity,
  },
  dispatch
);
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityCloseCard);

