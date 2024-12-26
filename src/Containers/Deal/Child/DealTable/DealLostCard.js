import React, { useEffect, useState,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import {getLostDeals,handleUpdateDealModal,handleDealsNotesDrawerModal} from "../../DealAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import EmptyPage from "../../../Main/EmptyPage";
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));
const UpdateDealModal =lazy(()=>import("../UpdateDeal/UpdateDealModal"));


function DealLostCard(props) {
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
          "110",//0  Name
          "511",//1 Investor
          "216",//2 Sponsor
          "176",//3 Start Date
          "1159",//4 Values
          "219",//5 Stages
          "76",//6 Assigned
          "77",//7 Owner
          "9",//8 Action
         "232", // 'Click to Open'
         "316", // Notes
        "170",  // "Edit"
         "1259", // Do you want to delete?

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
    props. getLostDeals(props.userId,page);
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
      props. getLostDeals(props.userId,page);    
  }
  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

    const {
        user,
        fetchingLostDeals,
        handleUpdateDealModal,
        openupdateDealModal,
        deleteOpportunityData,
        lostDeals,
     
      } = props;

      if (isMobile){

      
        return (    
          <>            
        <div class="rounded  p-1 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
              
              <InfiniteScroll
                 dataLength={lostDeals.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingLostDeals ?<div><BundleLoader/></div>:null}
                height={"83vh"}
                style={{scrollbarWidth:"thin"}}
              >
                { !fetchingLostDeals && lostDeals.length === 0 ?<EmptyPage />:lostDeals.map((item,index) =>  {
                         
                         var findProbability = item.probability;
                         item.stageList.forEach((element) => {
                           if (element.oppStage === item.oppStage) {
                             findProbability = element.probability;
                           }
                         });
                         return (
                            <div>
                             <div
                  className="flex flex-col rounded justify-between bg-white mt-[0.5rem] h-[9rem]  p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">               
                              <div class="flex justify-between  border-l-2 border-green-500 bg-[#eef2f9]">
                                       <div>
                    <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                        </div>                                                                                   
                                                <Tooltip>
                                                <div class=" flex max-sm:w-full font-bold font-poppins text-xs flex-row md:flex-col">
                                                    {/* Name */}
                                                  
                                                    <div class=" text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                                                    {/* <Link class="overflow-ellipsis whitespace-nowrap  text-xs p-1 text-[#042E8A] "  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}> */}
              {item.opportunityName}
            {/* </Link>                                  */}
                              &nbsp;&nbsp;
               
                                                    </div>
                                            </div>
                                                </Tooltip>
                                       {/* Sector */}
                                            <div class=" text-xs font-bold font-poppins">   
                                            <Link to ="/investor">
                                {item.investor}
                                </Link>
                                            </div>                                                                              
                                        {/* Country */}
                                            <div class=" text-xs  font-poppins">                                          
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
                                        <div class="flex justify-between items-center  h-8 ml-gap bg-[#eef2f9]">
                                               {/* Deals */}
                                     <div class=" text-xs justify-center  font-poppins items-center  h-8 ml-gap bg-[#eef2f9]">
                                            {dayjs(item.startDate).format("DD/MM/YYYY")}
                                            </div>
                                  {/* Pipeline Value */}   
                                            <div class=" text-xs  font-poppins text-center items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                            <CurrencySymbol currencyType={item.currency} />
                                     &nbsp;
                                     {item.proposalAmount}
                                          </div>
                                       
                           {/*Pipeline Value */}    
                                            <div class=" text-xs  font-poppins text-center items-center justify-center h-8 ml-gap bg-[#eef2f9]">
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
                      <Tooltip title={item.oppStage}>
                        {" "}
                        <Progress
                          type="circle"
                          style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }}
                          percent={findProbability}
                          width={30}
                          strokeColor={"#005075"}
                        />
                      </Tooltip>
                    </Dropdown>      
                                     </div>                                                                       
                                          {/* Assigned */}
                                           <div class=" text-xs  font-poppins">
                                            <span>
                                            <MultiAvatar2
                      primaryTitle={item.assignedTo}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                    </span>
                           </div>
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
                           <div class="flex justify-between">
                           <div >
                            <Tooltip title= {translatedMenuItems[9]}>
                            {/* // 'Click to Open' */}
                              <span
                    onClick={() => {
                   props.LinkClosedOpportunity(
                     item.opportunityId,
                     {
                       closeInd:false,
                     }                        
                   );         
                 }}                     
                 >
                  <LockIcon className="!text-icon cursor-pointer" />
                    </span>
             </Tooltip> 
                            </div>
                            <div>
                            <Tooltip
                                placement="right"
                                title= {translatedMenuItems[10]}
                                
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
                                title= {translatedMenuItems[11]}
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
                                title= {translatedMenuItems[12]}
                                onConfirm={() =>
                                  deleteOpportunityData(item.opportunityId)
                                }
                              >
                                {user.imInd === true && user.dealDeleteInd === true && (
                                
                                 
                                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                              
                                  )}
                                  </StyledPopconfirm>
                              </div>                                                                                                           
                           <div>
                           <span class=" cursor-pointer"
                 
                
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
                     <MonitorHeartIcon
                       style={{ fontSize: "0.8rem", color: "#df9697" }}
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
      if (loading) {
        return <div><BundleLoader/></div>;
      }
      return (    
  <>   
<div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
      <div className=" flex justify-between font-bold font-poppins text-xs w-[100%]">
        <div className=" md:w-[13.12rem]">
         {translatedMenuItems[0]} 
          {/* name"  */}              
                </div>
        <div className=" md:w-[6.21rem]">
        {translatedMenuItems[1]}
          {/* investor" */}              
                </div>
        <div className=" md:w-[9.21rem] ">
        {translatedMenuItems[2]} 
        {/* "sponsor"               */}
                </div>
        <div className="md:w-[7.11rem]">
        {translatedMenuItems[3]}
         {/* startdate" */}          
                </div>
        <div className="md:w-[11.16rem]">
        {translatedMenuItems[4]}
        {/* "proposalamt" */}        
                </div>
        <div className="md:w-[5.14rem]">
        {translatedMenuItems[5]} 
        {/* "stages" */}             
                </div> 
        <div className="md:w-[7.1rem]">
        {translatedMenuItems[6]}
         {/* "salesRep" */}       
                </div>
        <div className="md:w-[3.22rem]">
        {translatedMenuItems[7]}
         {/* owner" */}              
                </div>
        <div className="md:w-[5.71rem]"></div>
        {/* <div className="w-12">
        {translatedMenuItems[8]}
        {/* action" */}          
                {/* </div>  */}
                </div>
      </div>
      <InfiniteScroll
         dataLength={lostDeals.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingLostDeals ?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
    
      >
          { !fetchingLostDeals && lostDeals.length === 0 ?<EmptyPage/>:lostDeals.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                      // style={{
                      //   borderBottom: "3px dotted #515050",
                      // }}
                    >
                      <div class="flex ">
                      <div className=" flex  md:w-[13.1rem] max-sm:flex-row w-full  items-center">
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
                                        {/* Name   */}
                                                                     
                                            <div class=" text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link> 
                                                
                                            </div>
</div>
                                        </Tooltip>                             
                                </div>
                                <div className=" flex   md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                {/* Sector  */}
                                  
                                    <div class=" text-xs  font-poppins">   
                                    <Link to ="/investor">
                        {item.investor}
                        </Link>
                                    </div>
                                </div>                               
                                <div className=" flex  md:w-[6.4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                {/* Country */}                                
                                    <div class=" text-xs  font-poppins">                               
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
                                </div>
                                <div class="flex">
                                <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   {/* Deals */}

                                    <div class=" text-xs justify-center  font-poppins">
                                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                                    </div>
                                </div>
                             
                                <div className=" flex  md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  {/* Pipeline Value */}

                                    <div class=" text-xs  font-poppins text-center">
                                    <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}

                                    </div>
                                </div>
                                <div className=" flex md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  {/* >Pipeline Value */}

                                    <div class=" text-xs  font-poppins text-center">
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
                  style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }}
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>
                                    </div>
                                </div>
                                <div className=" flex  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  {/* Assigned */}

                                    <div class=" text-xs  font-poppins">                                  
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>
                                                 </div>
                                </div>
                                <div className=" flex  md:w-[5.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">
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
                  
                   <div class="flex  w-[0%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title={translatedMenuItems[9]}><span
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
                style={{
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              />
            </span>
     </Tooltip> 
                    </div>
                    <div>
                    <Tooltip
                        placement="right"
                        title={translatedMenuItems[10]}
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
                  </div>
                  <div class="flex  w-[0%] max-sm:flex-row max-sm:w-[10%]">
                   
                      <div>
                         <Tooltip
                        placement="right"
                        title={translatedMenuItems[11]}
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
                        title={translatedMenuItems[12]}
                        onConfirm={() =>
                          deleteOpportunityData(item.opportunityId)
                        }
                      >
                        {user.imInd === true && user.dealDeleteInd === true && (
                        
                        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                          )}
                          </StyledPopconfirm>
                      </div>
             
                    <div></div>
                  </div>   
                                <div class="flex w-[0%] max-sm:flex-row max-sm:w-[10%]">
                   <div>
                   <span className=" cursor-pointer"
         
         
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
             <MonitorHeartIcon className=" cursor-pointer"/>
             
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

    fetchingLostDeals:deal.fetchingLostDeals,
    lostDeals:deal.lostDeals,
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
         getLostDeals,
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
)(DealLostCard);
