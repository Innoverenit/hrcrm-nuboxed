import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { CurrencySymbol, } from "../../../Components/Common";
import OpportunitySelectStages from "../../Opportunity/Child/OpportunityTable/OpportunitySelectStages"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { MultiAvatar, MultiAvatar2,  } from "../../../Components/UI/Elements";
import {
    getIncludedOpportunityList,
    emptyIncludedOpportunity,
    getOpportunityIncludedCount
} from "../AuthAction";
import { Tooltip, Select, Menu, Dropdown, Progress ,Popconfirm} from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const Option =Select;

function OppIncludedCardList(props) {
  const { item } = props;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
    //   props.getRecruiterList(props.recruiterId);     
    }else{
      props.getIncludedOpportunityList(props.userId,page);
      props.getOpportunityIncludedCount(props.userId)
      setPage(page + 1);
    }  
  }, []);
  useEffect(() => {
    return () => props.emptyIncludedOpportunity();
  }, []);

  const handleLoadMore = () => {
          setPage(page + 1);
          props.getIncludedOpportunityList(props.userId,page);   
};
  
  


  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [currentItem, setCurrentItem] = useState("");





  function handleSetCurrentOpportunityId(item) {
    setCurrentOpportunityId(item);
    // console.log("opp",item);
  }


  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

 
  const handleConfirm = (opportunityId) => {
    // Call the function to change the status to "Lost" here
    props.lostStatusRecruit(opportunityId, {
      lostInd: true
    });
  };
 

  const handleWon = (opportunityId) => {
    // Call the function to change the status to "Lost" here
    props.StatusRecruit(opportunityId, {
      wonInd:true
    });
  };




  const {
    user,
    opportunityIncluded,
    handleUpdateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    updateOpportunityModal,
    deleteOpportunityData,
    history,
    fetchingIncludedOpportunity
  } = props;
  
  if (fetchingIncludedOpportunity) {
    return <BundleLoader />;
  }

  return (
    <>
    
    <div className="page-container">
    <InfiniteScroll
                dataLength={opportunityIncluded.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingIncludedOpportunity?<div style={{ textAlign: 'center' }}>Loading...</div> :null}
                height={"75vh"}
            >

<div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">
{ !fetchingIncludedOpportunity && opportunityIncluded.length === 0 ?<NodataFoundPage />:opportunityIncluded.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                   item.stageList.forEach((element) => {
                     if (element.oppStage === item.oppStage) {
                       findProbability = element.probability;}
                    });
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[7rem] 
                  text-[#444444] m-3 p-1 w-[15vw] flex flex-col  ">
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
        <div className="flex justify-around">
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
          <div className="flex justify-around mt-1">      
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
      stageClick={(opportunityStagesId) => {
        props.LinkStageOpportunity(
          {
            opportunityId: item.opportunityId,
            //oppStage: item.oppStage,
            opportunityStagesId:opportunityStagesId
            // recruitmentProcessId: item.recruitmentProcessId,
            // recruitmentId: item.recruitmentId,
            // profileId: item.profileId,
          },
         
        );
      }}
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
    title="Own"
   
  >
    <CheckCircleOutlineIcon
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
    <DoDisturbIcon
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
  onConfirm={() => handleWon(item.opportunityId)}
  okText="Yes"
  cancelText="No"
>
  <Tooltip 
    title="Won"
   
  >
    <CheckCircleOutlineIcon
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
  onConfirm={() => handleConfirm(item.opportunityId)}
  okText="Yes"
  cancelText="No"
>
 <Tooltip
        title="Lost" 
       
      >
 
  <DoDisturbIcon
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
          title="Notes"
            
        >
         
              
            <span

              onClick={() => {
              
                handleOpportunityNotesDrawerModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <NoteAltIcon className=" !text-base cursor-pointer text-[green]" />
              </span>
        
          </Tooltip>
<Tooltip
          placement="right"
          title="Edit"
           
        >
            {user.opportunityUpdateInd ===true && user.crmInd === true &&  (
              
            <span
            className=" !text-base cursor-pointer text-[grey]"
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <BorderColorIcon  className=" !text-base cursor-pointer"/>
              </span>
           )}
          </Tooltip>
       
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteOpportunityData(item.opportunityId)}
          >
           
             {user.opportunityDeleteInd ===true && user.crmInd === true &&  (
            <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
             )}
          </StyledPopconfirm>

              </div>
            
              </div>
           
        </div>
       
      </div>
                 );})}
    </div>

      </InfiniteScroll>
      </div>
  

    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  fetchingIncludedOpportunity:auth.fetchingIncludedOpportunity,
  opportunityIncluded: auth.opportunityIncluded,
  oppIncludedCount:auth.oppIncludedCount,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getIncludedOpportunityList,
        emptyIncludedOpportunity,
        getOpportunityIncludedCount
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OppIncludedCardList);
