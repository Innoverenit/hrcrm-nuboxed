import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component"
import { FormattedMessage } from "react-intl";
import {getQuotationTableData} from "../../../Dashboard/DashboardAction"
import OpportunitySelectStages from "../../../Opportunity/Child/OpportunityTable/OpportunitySelectStages"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Link } from 'react-router-dom';
import { Tooltip, Select, Menu, Dropdown, Progress ,Popconfirm} from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { MultiAvatar, MultiAvatar2,  } from "../../../../Components/UI/Elements";


import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";
const Option =Select;

function QuotationTabData(props) {
  const { item } = props;

  
  


  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [currentItem, setCurrentItem] = useState("");





  useEffect(()=>{
    props.getQuotationTableData(props.selectedCountry)
   }, []);

   useEffect(() => {
    // Check if data is available
    if (props.quotationTableData.length > 0) {
      // Update activeTab when data is available
      
    }
  }, [props.quotationTableData]);



  const {
    user,
    opportunityByUserId,
    handleUpdateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    updateOpportunityModal,
    deleteOpportunityData,
    history,
    fetchingOpportunity
  } = props;
  
  if (props.fetchingQuotationTableData) {
    return <BundleLoader />;
  }

  return (
    <>
    

<div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">
{ !props.fetchingQuotationTableData && props.quotationTableData.length === 0 ?<NodataFoundPage />:props.quotationTableData.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                   item.stageList.forEach((element) => {
                     if (element.oppStage === item.oppStage) {
                       findProbability = element.probability;}
                    });
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[7.5rem] 
                  text-[#444444] m-3 p-1 w-[15vw] max-sm:w-wk flex flex-col  ">
        <div class="flex items-center flex-no-wrap h-[2.81em]">
          <div class=" flex basis-[15%] mr-[0.2rem]" >
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          &nbsp;
          <div class="flex flex-col basis-[100%] overflow-hidden">
          
            <div class="font-semibold text-[#337df4] cursor-pointer text-sm " >
            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
          {/* <Link
toUrl={`opportunity/${item.opportunityId}`}
title={`${item.opportunityName}`}>
{item.opportunityName}
</Link> */}
          </div> 
          </div>
        </div>
        <div className="flex justify-around max-sm:justify-between">
          <div>
          {item.customer && (
              <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
                {item.customer || ""}
              </div>
            )}
          </div>
          <div>
          <div class="font-medium text-xs ">
          {item.contactName && (
              <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
                {item.contactName || ""}
              </div>
            )}
           
            
          </div>
          </div>
          </div>
          <div className="flex ">
        
          <div>
          <div class="font-medium text-xs ">
          </div>
          </div>
          </div>
          <div className="flex justify-around mt-1 max-sm:justify-between">      
<div>
<span>
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
    <OpportunitySelectStages
      rec={item}
      oppStage={item.oppStage}
      // recruitOwner={item.recruitOwner}
      // candidateName={item.candidateName}
      // approveInd={item.approveInd}
      // rejectInd={item.rejectInd}
    //   stageClick={(opportunityStagesId) => {
    //     props.LinkStageOpportunity(
    //       {
    //         opportunityId: item.opportunityId,
           
    //         opportunityStagesId:opportunityStagesId
           
    //       },
         
    //     );
    //   }}
    />{" "}
  </Menu.Item>
</Menu>
</div>
}
trigger={["click"]}
>
<Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
</Tooltip>
</Dropdown>
</span>
</div>
<div>
{<CurrencySymbol currencyType={item.currency} />}
            &nbsp;{  item.proposalAmount || ""}
  </div>
<span>
<MultiAvatar2
primaryTitle={item.assignedTo}
imgWidth={"1.8em"}
imgHeight={"1.8em"}
/>
</span>
{/* <span>
  <Button>Drop</Button>
</span> */}
        </div>
    
        <div class="w-full " >
            <div class="flex justify-between w-wk mt-1">
              <div>
              {item.approveInd&&item.opportunityOwner ? (
<>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Own"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      style={{fontSize:"1rem" 
     }}
    />
  </Tooltip>
</>
) : item.rejectInd&&item.opportunityOwner ? (
<>
  <Tooltip title={"Lost"}>
    {" "}
    <StopTwoTone
      type="stop"
      theme="twoTone"
      twoToneColor="red"         
      style={{ fontSize:"1rem" , marginLeft: "0.875em" }}
    />
  </Tooltip>
</>
) : (
<>
<Popconfirm
  title="Change status to Won?"
  //onConfirm={() => handleWon(item.opportunityId)}
  okText="Yes"
  cancelText="No"
>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Won"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      style={{ fontSize:"1rem" 
     
     }}
   
    />
  </Tooltip>
  </Popconfirm>
  &nbsp; &nbsp;
  {user.recruitProInd === true && (
  <Popconfirm
  title="Change status to Lost?"
  //onConfirm={() => handleConfirm(item.opportunityId)}
  okText="Yes"
  cancelText="No"
>
 <Tooltip
        title={
          <FormattedMessage id="app.drop" defaultMessage="Lost" />
        }
      >
 
  <StopTwoTone
          type="stop"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{
            fontSize: "1rem"
          }}
        />
        </Tooltip>
    </Popconfirm>
     )}
</>
)}
</div>
<div>
<Tooltip
          placement="right"
          title={
            <FormattedMessage
              id="app.notes"
              defaultMessage="Notes"
            />
          }
        >
         
              
            <span

            //   onClick={() => {
              
            //     handleOpportunityNotesDrawerModal(true);
            //     handleSetCurrentOpportunityId(item);
            //   }}
            >
                 <NoteAltIcon className=" !text-xl cursor-pointer text-[green]" />
              </span>
        
          </Tooltip>
<Tooltip
          placement="right"
          title={
            <FormattedMessage
              id="app.edit"
              defaultMessage="Edit"
            />
          }
        >
            {user.opportunityUpdateInd ===true && user.crmInd === true &&  (
              
            <span
            className=" !text-xl cursor-pointer text-[grey]"
            //   onClick={() => {
            //     props.setEditOpportunity(item);
            //     handleUpdateOpportunityModal(true);
            //     handleSetCurrentOpportunityId(item);
            //   }}
            >
                 <BorderColorIcon  className=" !text-xl cursor-pointer"/>
              </span>
           )}
          </Tooltip>
       
          <StyledPopconfirm
            title="Do you want to delete?"
            //onConfirm={() => deleteOpportunityData(item.opportunityId)}
          >
           
             {user.opportunityDeleteInd ===true && user.crmInd === true &&  (
            <DeleteOutlined
            // loading={props.deleteOpportunityData}
            type="delete" className=" !text-xl cursor-pointer text-[red]" />
             )}
          </StyledPopconfirm>

              </div>
            
              </div>
           
        </div>
       
      </div>
                 );})}
    </div>

    
      
 
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity ,dashboard}) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  quotationTableData:dashboard.quotationTableData,
  fetchingQuotationTableData:dashboard.fetchingQuotationTableData,
//   deleteOpportunityData:opportunity.deleteOpportunityData,
  addDrawerOpportunityNotesModal:opportunity.addDrawerOpportunityNotesModal,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  opportunityId :opportunity.opportunityId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  opportunityInitiativesSkillsDetails:opportunity.opportunityInitiativesSkillsDetails,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    opportunityForecast:opportunity.opportunityForecast,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    fetchingOpportunitySkills:opportunity.fetchingOpportunitySkills
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getOpportunityListByUserId,
    //   getOpportunityInitiativeSKillDetails,
    //   getRecruiterList,
    getQuotationTableData
    //   getOpportunitySKill,
    //   getOpportunityForecast,
    //   handleUpdateOpportunityModal,
    //   handleOpportunityNotesDrawerModal,
    //   handleOpportunityDrawerModal,
    //   setEditOpportunity,
    //   deleteOpportunityData,
    //   updateOwneroppById,
    //   getAllRecruitmentByOppId,
    //      getAllRecruitmentPositionByOppId,
    //       getAllRecruitmentAvgTimeByOppId,
    //      getAllRecruitmentPositionFilledByOppId,
    //      getAllRecruitmentDetailsByOppId,
    //      LinkClosedOpportunity,
    //      StatusRecruit,
    //      lostStatusRecruit,
    //      emptyOpportunity,
    //      LinkStageOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(QuotationTabData);
