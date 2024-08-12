import React, { useEffect, useState,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
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
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../../Opportunity/OpportunityAction";
import {getWonDeals,handleUpdateDealModal,handleDealsNotesDrawerModal} from "../../DealAction";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));
const UpdateDealModal =lazy(()=>import("../UpdateDeal/UpdateDealModal"));


function DealWonCard(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
         " Name",//0
          "Investor",//1
          "Sponsor",//2
          "Start Date",//3
          "Value",//4
          "Stages",//5
          "Sales Rep",//6
          "Owner",//7    
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

  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{   
    } 
    props. getWonDeals(props.userId,page);
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
      props. getWonDeals(props.userId,page);    
  }
  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

    const {
        user,
        fetchingWonDeals,
        handleUpdateDealModal,
        openupdateDealModal,
        deleteOpportunityData,
        wonDeals,
     
      } = props;

      if (loading) {
        return <div><BundleLoader/></div>;
      }
      return (    
  <>    
<div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
        <div className=" w-[13.82rem] max-xl:w-[11.12rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[0]}
       {/* "name" */}
                </div>
        <div className=" w-[8.21rem] max-xl:w-[7.21rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[1]}
         {/* investor"              */}
                </div>
        <div className=" w-[7.21rem] max-xl:w-[6.21rem] max-xl:text-xs] max-lg:text-[0.45rem] ">
        {translatedMenuItems[2]}
        {/* "sponsor"          */}
                </div>
        <div className="w-[6.11rem] max-xl:w-[7.11rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[3]}
       {/* startdate" */}       
                </div>
        <div className="w-[8.16rem] max-xl:w-[9.16rem] max-xl:text-xs] max-lg:text-[0.45rem]">
          <FormattedMessage
                  id="app.proposalamt"
                  defaultMessage="proposalamt"
                />
                </div>
        <div className="w-[8.14rem] max-xl:w-[6.14rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[5]}
         {/* "stages" */}             
                </div> 
        <div className="w-[8.1rem] max-xl:w-[7.1rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[6]}
        {/* salesRep" */}      
                </div>
        <div className="w-[5.22rem] max-xl:w-[5.21rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {translatedMenuItems[7]} 
        {/* owner" */}
                </div>
        <div className="w-[2.71rem] max-xl:text-xs] max-lg:text-[0.45rem]"></div>
        <div className="w-[3.01rem] max-xl:text-xs] max-lg:text-[0.45rem]">
        {/* action" */}             
                </div>
      </div>
      <InfiniteScroll
         dataLength={wonDeals.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonDeals ?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
      >
         {wonDeals.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[14.1rem] max-xl:w-[8.1rem] max-lg:w-[6.1rem] max-sm:flex-row max-sm:w-auto  items-center">
                                <div>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
</div>
                                   <div>
                                   </div>                              
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">                                   
                                           {/* Name */}                                   
                                         <div class=" text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                                        <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] max-xl:text-xs] max-lg:text-[0.45rem] max-sm:text-sm cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>                          
                      &nbsp;&nbsp;       
                                            </div>
</div>
                                        </Tooltip>                         
                                </div>
                                <div className=" flex   w-[8.1rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                       {/* sector */}
                                   
                                    <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <Link to ="/investor">
                        {item.investor}
                        </Link>
                                    </div>
                                </div>
                                </div>       
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex   w-[7.4rem] max-xl:w-[4.4rem] max-lg:w-[3.4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                              {/* Country */}
                                  <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">                            
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
                                <div className=" flex  w-[7.2rem] max-xl:w-[5.2rem] max-lg:w-[4.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Deals */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">
                                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                                    </div>
                                </div>                           
                                <div className=" flex  w-[8.2rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Value */}
                                    <div class=" text-xs  font-poppins text-center max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">              
            &nbsp;
            {item.proposalAmount}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-[9.1rem] max-xl:w-[8.11rem] max-lg:w-[6.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                               {/* Value */}

                                    <div class=" text-xs  font-poppins text-center max-xl:text-xs] max-lg:text-[0.45rem] max-sm:text-xs">
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
                <Progress class="cursor-pointer text-red text-lg"
                  type="circle"              
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>
                                    </div>
                                </div>
                                <div className=" flex  w-[8.1rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Assigned */}

                                    <div class=" text-xs  font-poppins max-xl:text-xs] max-lg:text-[0.45rem] max-sm:text-xs">                                   
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>     
                                    </div>
                                </div>
                                <div className=" flex  w-[6.5rem] max-xl:w-[7.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto mb-1 max-sm:justify-between ">
                                {/* Owner */}
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
          <LockIcon className="!text-icon"
                style={{
                  cursor: "pointer",
                }}
              />
            </span>
     </Tooltip> 
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
                          onClick={() => {
                            props.handleDealsNotesDrawerModal(true);
                            handleSetCurrentItem(item);
                          }}
                        >
                          <NoteAltIcon
                            className="!text-icon cursor-pointer text-[green]"
                          />
                        </span>
                      </Tooltip>
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
                        {user.imInd === true && user.dealUpdateInd === true && (
                          <span class="cursor-pointer text-[blue]"
                            onClick={() => {
                              handleUpdateDealModal(true);
                              handleSetCurrentItem(item);
                            }}
                          >
                            <BorderColorIcon
                             className="!text-icon cursor-pointer text-[tomato]"
                            />
                          </span>
                        )}
                      </Tooltip>
                      </div>                                  
                      <div>
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteOpportunityData(item.opportunityId)
                        }
                      >
                        {user.imInd === true && user.dealDeleteInd === true && (
                        
                          <DeleteOutlined
                            type="delete"
                            className="!text-icon text-[red] cursor-pointer"
                          />
                          )}
                          </StyledPopconfirm>
                      </div>                                                                
                   <div>
                   <span       
         style={{ cursor: "pointer" }}
         onClick={() => {
            //  props.getAllRecruitmentByOppId(item.opportunityId);
            //  props.getAllRecruitmentPositionByOppId(item.opportunityId);
            //  props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
            //  props.getAllRecruitmentPositionFilledByOppId(
            //    item.opportunityId
            //  );
            //  props.getAllRecruitmentDetailsByOppId(item.opportunityId);
            //  props.handleOpportunityDrawerModal(true);
            //  props.getOpportunitySKill(item.oppInnitiative);
            //  handleSetCurrentOpportunityId(item.opportunityName);
           }}
         >
           {user.pulseAccessInd === true && (
             <MonitorHeartIcon className="!text-icon"
               style={{ color: "#df9697" }}
             />
           )}
         </span>
                 </div>
                      </div>    
                        </div>
                        </div>
                   )
                })}
      </InfiniteScroll>

      </div>
      <UpdateDealModal
        currentItem={currentItem}
        openupdateDealModal={openupdateDealModal}
        handleUpdateDealModal={handleUpdateDealModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      <AddDealsNotesDrawerModal
        currentItem={currentItem}
        addDrawerDealsNotesModal={props.addDrawerDealsNotesModal}
        handleDealsNotesDrawerModal={props.handleDealsNotesDrawerModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
    </>
  );
}
const mapStateToProps = ({ auth, deal, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
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

    fetchingWonDeals:deal.fetchingWonDeals,
    wonDeals:deal.wonDeals,
    openupdateDealModal: deal.openupdateDealModal,
    addDrawerDealsNotesModal: deal.addDrawerDealsNotesModal,
  
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
         getWonDeals,
         LinklostdOpportunity,
         deleteLostOpportunity,
         handleUpdateDealModal,
         handleDealsNotesDrawerModal
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(DealWonCard);
