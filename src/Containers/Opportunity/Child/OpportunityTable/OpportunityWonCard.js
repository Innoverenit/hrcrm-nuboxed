import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip} from "antd";
import { CurrencySymbol } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
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
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import AddOpportunityNotesDrawerModal from "./AddOpportunityNotesDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";

function OpportunityWonCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getWonOpportunity(props.userId,page);
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
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        'Name', // 0
'Prospect', // 1
'Sponsor', // 2
'Start Date', // 3
'Value', // 4
'Stages', // 5
'Sales Rep', // 6
'Owner' // 7

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const handleLoadMore = () => {
    setPage(page + 1);
      props. getWonOpportunity(props.userId,page);    
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchingWonOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    addDrawerOpportunityNotesModal,
    handleOpportunityNotesDrawerModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     wonOpportunity,
     
      } = props;
      if (loading) {
        return <div><BundleLoader/></div>;
      }
      return (    
  <>
  <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
  <div className="flex max-sm:hidden  w-[99%] max-xl:w-[87%] p-1 bg-transparent font-bold sticky  z-10">
        <div className=" w-[14.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.8rem] "> {translatedMenuItems[0]}</div>
        <div className=" w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[1]}</div>
        <div className=" w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "> {translatedMenuItems[2]}</div>
        <div className="w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[3]}</div>
        <div className="w-[9.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[4]}</div>
        <div className="w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[5]}</div> 
        <div className="w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[6]}</div>
        <div className="w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[0.2rem]"> {translatedMenuItems[7]}</div>
        <div className="w-[4.1rem] "></div>
        <div className="w-12"></div>
      </div>
      <InfiniteScroll
         dataLength={wonOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonOpportunity ?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{ scrollbarWidth:"thin"}}
      >
{ !fetchingWonOpportunity && wonOpportunity.length === 0 ?<NodataFoundPage />:wonOpportunity.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                     <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex  w-[16rem] max-lg:w-[10rem] max-sm:flex-row  max-sm:w-auto ">
                                <div>

            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full items-center  flex-row ">
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap max-sm:text-sm h-8 text-xs p-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex   w-[10.1rem] max-xl:w-[6.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   
                                    
                                    {item.customer}
                    
                                    </div>
                                </div>
                                </div>
                                
                               
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-[8.01rem] max-xl:w-[4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  
                                  {item.contactName === null ? "None" :
            <MultiAvatar2
              primaryTitle={item.contactName}
              imageId={item.imageId}
               imageURL={item.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          }
          
                                  </div>
                              </div>
                                <div className=" flex  w-[9.1rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-xs justify-center  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {dayjs(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex   w-[10.1rem] max-xl:w-[5.1rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs  font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}

                                    </div>
                                </div>
                                
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    {/* <div class=" text-sm  font-poppins text-center">
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
                  className=" !text-xl cursor-pointer text-[red]"
                 
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>

                                    </div> */}
                              
                                <div className=" flex  w-32 max-xl:w-[5.12rem] max-lg:w-[3.12rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-xs  font-poppins max-sm:text-sm">
                                    
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
             
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-20 max-xl:w-[2rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs  font-poppins max-sm:hidden">Owner</div> */}

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
           className=" !text-icon cursor-pointer"
               
              />
            </span>
     </Tooltip> 
                    </div>
                    <div>
                    <ReinstateToggleForLost 
            opportunityId={item.opportunityId} 
            
            
            />
                    </div>
                 
                  
                   
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
              className=" !text-icon cursor-pointer text-[grey]"
                onClick={() => {
                  props.setEditOpportunity(item);
                  handleUpdateOpportunityModal(true);
                  handleSetCurrentOpportunityId(item);
                }}
              >
                            <BorderColorIcon
                             className=" !text-icon cursor-pointer text-[tomato]"
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
                            className=" !text-icon cursor-pointer text-[red]"
                          />
                          )}
                          </StyledPopconfirm>
                      </div>
             
                   
                 
                  
                               
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
             className=" !text-icon cursor-pointer text-[#df9697]"
             />
           )}
         </span>
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
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <NoteAltIcon className=" !text-icon cursor-pointer text-[green]" />
              </span>
        
          </Tooltip></div>
                        
       
                   </div>   
                            </div>
                        </div>


                    )
                })}
      
      </InfiniteScroll>
      </div>

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
         <AddOpportunityNotesDrawerModal
        addDrawerOpportunityNotesModal={addDrawerOpportunityNotesModal}
        opportunityData={currentOpportunityId}
        handleOpportunityNotesDrawerModal={handleOpportunityNotesDrawerModal}
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
  fetchingWonOpportunity:opportunity.fetchingWonOpportunity,
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
    wonOpportunity:opportunity.wonOpportunity,
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
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
         handleOpportunityNotesDrawerModal,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityWonCard);
