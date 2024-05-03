import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component"
import { FormattedMessage } from "react-intl";
import OpportunitySelectStages from "../OpportunityTable/OpportunitySelectStages"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Link } from 'react-router-dom';
import { Tooltip, Select, Menu, Dropdown, Progress ,Popconfirm} from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { MultiAvatar, MultiAvatar2,  } from "../../../../Components/UI/Elements";
import {
  getOpportunityListByUserId,
  emptyOpportunity,
  getRecruiterList,
  handleOpportunityNotesDrawerModal,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  getOpportunityInitiativeSKillDetails,
  updateOwneroppById,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         LinkClosedOpportunity,
         getOpportunitySKill,
         StatusRecruit,
         lostStatusRecruit,
         LinkStageOpportunity,
         getOpportunityForecast,
         handleOpportunityRowEmailModal
} from "../../OpportunityAction";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddOpportunityDrawerModal from "../../Child/OpportunityTable/AddOpportunityDrawerModal"
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import AddOpportunityNotesDrawerModal from "./AddOpportunityNotesDrawerModal";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import OpportunityRowEmailModal from "./OpportunityRowEmailModal";
import { base_url } from "../../../../Config/Auth";
const Option =Select;

function OpportunityCardList(props) {
  const { item } = props;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
      props.getOpportunityListByUserId(props.userId,page);
      setPage(page + 1);
    }  
  }, []);
  useEffect(() => {
    return () => props.emptyOpportunity();
  }, []);

  const handleLoadMore = () => {
          setPage(page + 1);
          props.getOpportunityListByUserId(props.userId,page);   
};
  
  


  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [rowdata, setrowdata] = useState("");
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const exportPDFAnnexure = async () => {
    var doc = new jsPDF();
    const {
      userDetails:
      {address},
        imageId
    }=props
   
    let cityd=`${address.city}`
    let countryd=`${address.country}`
    let addressde=`${address.state}`
    let cityde=`${address.street}`
    var imageUrl = `${base_url}/image/${imageId || ""}`;
    var name1 = `East Repair Inc `
    var name2 =`1912 Harvest Lane New York ,NY 12210 ${cityd}`
    var name3 =`BILL TO`
    var name4 = `SHIP TO`
    var name5 = `QUOTE #`
    var name6 = `QUOTE DATE`
    var name7 = `P.O.#`
    var name8 = `Quote Total`
    var name9 = `QTY`
    var name10 = `DESCRIPTION`
    var name11 = `UNIT PRICE`
    var name12 = `AMOUNT`
    var name13= `TERM & CONDITIONS`
    var name14= `Payement id due within 15 days`
    var name15= `Please make checks payble to: East repair Inc. `
  
  
    doc.setFont("Montserrat");
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 0, 230, 13, 'F');
    doc.setFontSize(25);
    doc.setFontSize(14);
    doc.setDrawColor(0, 0, 0)
    doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
    doc.text(name1, 8, 25);
    doc.setFontSize(10);
    let yPosition = 32;
    address.forEach(item => {
      doc.text(` ${item.city}  ${item.country}  ${item.state}  ${item.street}`, 8, yPosition);
      yPosition += 4
  });
    // doc.text(name2, 8, 32);
    doc.setFontSize(12);
    doc.text(name3, 8, 50);
    doc.text(name4, 60, 50);
    doc.text(name5, 120, 50);
    doc.text(name6, 120, 58);
    doc.text(name7, 120, 66);
    doc.line(8, 80, 200, 80);
    doc.setFontSize(22);
    doc.text(name8, 8, 90);
    doc.line(8, 100, 200, 100);
    doc.setFontSize(10);
    doc.text(name9, 8, 110);
    doc.text(name10, 30, 110);
    doc.text(name11, 90, 110);
    doc.text(name12, 140, 110);
    doc.setFontSize(12);
    doc.text(name13, 8, 250);
    doc.setFontSize(9);
    doc.text(name14, 8, 260);
    doc.text(name15, 8, 270);
    //footer
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 276, 230, 15, 'F');
  
    doc.save("Quotation.pdf")
  
  }



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
    opportunityByUserId,
    handleUpdateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    updateOpportunityModal,
    deleteOpportunityData,
    history,
    fetchingOpportunity,
    handleOpportunityRowEmailModal,
    addOpportunityRowEmailModal
  } = props;
  
  // if (fetchingOpportunity) {
  //   return <BundleLoader />;
  // }
console.log(props.userDetails.imageId)
  return (
    <>
    

<InfiniteScroll
                dataLength={opportunityByUserId.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingOpportunity?<div style={{ textAlign: 'center' }}>Loading...</div> :null}
                height={"85vh"}
            >

<div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center justify-center">
{ !fetchingOpportunity && opportunityByUserId.length === 0 ?<NodataFoundPage />:opportunityByUserId.map((item,index) =>  {
                 
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
            <div class="flex justify-between w-wk items-center">
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
  onConfirm={() => handleWon(item.opportunityId)}
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
  onConfirm={() => handleConfirm(item.opportunityId)}
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
<div class="flex items-center">
<div class="w-6">
<MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "1.25rem" }}
                onClick={() => {
                  props.handleOpportunityRowEmailModal(true);
                  handleSetCurrentOpportunityId(item);
                }}
              />
  </div>

<div class="w-6">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon/>
                           </span>
          </div>
<div class="flex items-center">
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

              onClick={() => {
              
                handleOpportunityNotesDrawerModal(true);
                handleSetCurrentOpportunityId(item);
              }}
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
            className=" !text-xl cursor-pointer text-[grey] mb-1"
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <BorderColorIcon  className=" !text-xl cursor-pointer"/>
              </span>
           )}
          </Tooltip>
       
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteOpportunityData(item.opportunityId)}
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
       
      </div>
                 );})}
    </div>

      </InfiniteScroll>
      
      <UpdateOpportunityModal
        updateOpportunityModal={updateOpportunityModal}
        opportunityData={currentOpportunityId}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<OpportunityRowEmailModal
  opportunityData={currentOpportunityId}
        addOpportunityRowEmailModal={addOpportunityRowEmailModal}
        handleOpportunityRowEmailModal={handleOpportunityRowEmailModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

       <AddOpportunityNotesDrawerModal
        addDrawerOpportunityNotesModal={addDrawerOpportunityNotesModal}
        opportunityData={currentOpportunityId}
        handleOpportunityNotesDrawerModal={handleOpportunityNotesDrawerModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 opportunityData={currentOpportunityId}
opportunityForecast={props.opportunityForecast}
opportunityInitiativesSkillsDetails={props.opportunityInitiativesSkillsDetails}
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 
 fetchingOpportunitySkills={props.fetchingOpportunitySkills}
 item={currentItem}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
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
  deleteOpportunityData:opportunity.deleteOpportunityData,
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
    fetchingOpportunitySkills:opportunity.fetchingOpportunitySkills,
    addOpportunityRowEmailModal:opportunity.addOpportunityRowEmailModal,
    userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
      getOpportunityInitiativeSKillDetails,
      getRecruiterList,
      getOpportunitySKill,
      getOpportunityForecast,
      handleUpdateOpportunityModal,
      handleOpportunityNotesDrawerModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         LinkClosedOpportunity,
         StatusRecruit,
         lostStatusRecruit,
         emptyOpportunity,
         LinkStageOpportunity,
         handleOpportunityRowEmailModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCardList);
