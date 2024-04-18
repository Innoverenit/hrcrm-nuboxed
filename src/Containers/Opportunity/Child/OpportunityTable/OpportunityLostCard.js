import React, { useEffect, useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip,  Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
  handleOpportunityNotesDrawerModal,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import AddOpportunityNotesDrawerModal from "./AddOpportunityNotesDrawerModal";

function OpportunityLostCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getlostOpportunity(props.userId,page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLoadMore = () => {
    setPage(page + 1);
      props. getlostOpportunity(props.userId,page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchinglostOpportunity,
    fetchinglostOpportunityError,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     lostOpportunity,
     
      } = props;



      return (    
  <>
 <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
 <div className=" flex max-sm:hidden justify-between w-[100%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[17.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">Name</div>
        <div className=" w-[11.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.1rem]">Prospect</div>
        <div className=" w-[12.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem]">Sponsor</div>
        <div className="w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.8rem]">Start Date</div>
        <div className="w-[11.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.3rem]">Value</div>
        <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem]">Stages</div> 
        <div className="w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem]">Sales Rep</div>
        <div className="w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.2rem]">Owner</div>
        <div className="md:w-[4.8rem]"></div>
        <div className="w-12"></div>
      </div>

      <InfiniteScroll
        dataLength={lostOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchinglostOpportunity?<div class="flex justify-center">Loading...</div> :null}
        height={"75vh"}
        style={{overflowX:"hidden"}}
      >
 <CardWrapper>      
              {lostOpportunity.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div className="max-sm:w-wk">
                  <div
                    className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-2 max-sm:h-[9rem] max-sm:flex-col max-sm:w-wk"
                   
                  >
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium w-[14.5rem] max-xl:w-[9.5rem] max-lg:w-[6.5rem] max-sm:flex-row  ">
                              <div>
<SubTitle>
          <MultiAvatar
            primaryTitle={item.opportunityName}
            imageId={item.imageId}
            // imageURL={imageURL}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
        </SubTitle>
</div>
                                 <div class="w-[4%]">

                                 </div>
                                 
                                      <Tooltip>
                                      <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                          {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                          Name
                                          </div> */}
                                          <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                              
                                          <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>&nbsp;&nbsp;
      {/* {date === currentdate ? (
        <span
          style={{
            color: "tomato",
            fontWeight: "bold",
          }}
        >
          New
        </span>
      ) : null} */}
     
                                          </div>
</div>
                                      </Tooltip>
                            
                              </div>

                              <div className=" flex font-medium flex-col  w-[10.4rem] max-xl:w-[5.7rem]   max-sm:flex-row  max-sm:justify-between ">
                         
                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                  
                                  {item.customer}
                  
                                  </div>
                              </div>
                              </div>
                             
                              
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                                

                                {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm ">
                               
                                {item.contactName === null ? "None" :
          <MultiAvatar2
            primaryTitle={item.contactName}
            imageId={item.imageId}
             imageURL={item.imageURL}
            imgWidth={"1.8em"}
            imgHeight={"1.8em"}
          />
        }
        
                                </div>
                            </div>
                              <div className=" flex font-medium items-center  w-[10.01rem] max-xl:w-[5.91rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                  <div class=" text-sm justify-center text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {moment(item.startDate).format("ll")}
                                  </div>
                              </div>
                           
                              <div className=" flex font-medium items-center  w-[7rem] max-xl:w-[5.81rem] max-lg:w-[2.81rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                  <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex font-medium items-center  w-36 max-xl:w-[3.9rem] max-lg:w-[3.2rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                  <div class=" text-sm text-cardBody font-poppins text-center max-sm:text-sm">
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

                                  </div>
                              </div>
                              <div className=" flex font-medium items-center w-[6rem] max-xl:w-[4rem] max-lg:w-[3rem] max-sm:flex-row  max-sm:justify-between ">
                                  {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex font-medium items-center w-[4rem] max-sm:flex-row max-lg:w-[3rem]  mb-1 max-sm:justify-between ">
                     
                     {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

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
                 </div>
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 <div className=" flex font-medium flex-col w-[5rem] max-xl:w-[5rem] max-sm:justify-between max-lg:w-[4rem] max-sm:flex-row ">
                  <div class=" text-sm text-cardBody font-medium font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

Reinstate
   </div>
                  <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          />
                  </div>
                
                 <div class="flex flex-col w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                 <div>
                 <span
       
       className=" cursor-pointer"
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
          </div>
       
                 <div class="flex flex-col w-[1rem] max-sm:flex-row max-sm:w-[10%]">
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
        <LockIcon className=" !text-base cursor-pointer"
             
            />
          </span>
   </Tooltip> 
                  </div>
                  <div><Tooltip
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
                // handleSetCurrentOpportunityId(item);
              }}
            >
                 <NoteAltIcon className=" !text-base cursor-pointer text-[green]" />
              </span>
        
          </Tooltip></div>
               
                </div>
                <div class="flex flex-col w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                 
                    <div>
                       <Tooltip
                      placement="right"
                      title={
                        <FormattedMessage
                          id="app.edit"
                          defaultMessage="Edit"
                        />
                      }
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
                          className=" !text-base cursor-pointer text-[tomato]"
                            
                          />
                        </span>
                      )}
                    </Tooltip>
                    </div>
                  
                  
                    <div>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() =>
                        deleteLostOpportunity(item.opportunityId)
                      }
                    >
                        {user.opportunityDeleteInd ===true && (
                      
                        <DeleteOutlined
                          type="delete"
                          className=" !text-base cursor-pointer text-[red]"
                        />
                        )}
                        </StyledPopconfirm>
                    </div>
           
                  <div ></div>
                </div>   
                </div>         
                    
                          </div>
                      </div>

                 )  
            })}
              </CardWrapper>
  

      </InfiniteScroll>
      </div>
      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />
            <AddOpportunityNotesDrawerModal
        addDrawerOpportunityNotesModal={addDrawerOpportunityNotesModal}
        opportunityData={currentOpportunityId}
        handleOpportunityNotesDrawerModal={handleOpportunityNotesDrawerModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 opportunityName={currentOpportunityId}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={this.props.candidateByUserId}
      />
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchinglostOpportunity:opportunity.fetchinglostOpportunity,
  fetchinglostOpportunityError:opportunity.fetchinglostOpportunityError,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    lostOpportunity:opportunity.lostOpportunity,
    addDrawerOpportunityNotesModal:opportunity.addDrawerOpportunityNotesModal,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
      handleUpdateOpportunityModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      handleOpportunityNotesDrawerModal,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getlostOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityLostCard);

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;
display: flex;
    justify-content: flex-end;
white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 17rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 20vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
    
  }
`